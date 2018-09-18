<!-- 进销存录入 -->
<template>
  <scroller ref="creatInvoic">
    <group gutter='0'>
      <datetime v-model="dataValue" @on-change="changeValue" title="日期：" clear-text="清除" @on-clear="clearValue" @on-confirm="onConfirm"></datetime>
      <popup-picker v-if="isClient" title="客户：" :data="clientType" v-model="clientVar" @on-change="val => selectChange(val, 2)" show-name></popup-picker>
      <cell v-if="!isClient" title="客户：" value="暂无客户"></cell>
      <x-input title='进货：' v-model="stockValue" text-align='right' type='number'></x-input>
      <x-input title='销售：' v-model="marketValue" text-align='right' type='number'></x-input>
      <x-input title='库存：' v-model="repertoryValue" text-align='right' type='number'></x-input>
      <cell v-model="listValue" text-align='right'>
        <div slot="title" class="update_img">
          <span class="update_img_span">陈列：</span>
          <div class="img_show">
            <div class="img_show_no" style="box-shadow: 1px 0px 1px #ccc; border: 1px solid #eaeaea; border-radius: 10px;">
              <span class="iconfont icon-zhaopian1"></span>
              <span class="img_show_font" @click="galleryImgsSelected()">上传照片</span>
            </div>
            <div class="img_show_view" v-for="(item, index) in imgList" :key="index">
              <img class="previewer-demo-img" :src="item.src" alt="" style="box-shadow: 1px 0px 1px #ccc; border-radius: 10px;" @click="showImg(index)">
              <span class="img_span_show iconfont icon-jianshao"></span>
            </div>
            <div v-transfer-dom>
              <previewer :list="imgList" ref="previewer" @on-index-change="logIndexChange" :options="options"></previewer>
            </div>
          </div>
        </div>
      </cell>
    </group>
    <!-- 提交操作 -->
    <div class="confirm_button">
      <x-button :show-loading="loginLoading" text="确定" @click.native="confirmClick" :disabled='!isClient'></x-button>
    </div>
  </scroller>
</template>

<script>
import jobControl from '../../../api/jobControl';
import config from '../../../config';

export default {
  created() { },
  activated() {
    this.clientType = [];
    this.client = this.clientList.clientType;
    // 日期
    if (!Object.keys(this.invoicData).length) {
      this.dataValue = '';
      this.stockValue = ''; // 进货
      this.marketValue = ''; // 销售
      this.repertoryValue = ''; // 库存
      this.listValue = ''; // 陈列
      this.clientVar = [];
    } else {
      this.dataValue = this.invoicData.writeDate;
      this.stockValue = this.invoicData.stock; // 进货
      this.marketValue = this.invoicData.sale; // 销售
      this.repertoryValue = this.invoicData.inventory; // 库存
      this.listValue = ''; // 陈列
    }
    console.log('invoicData', this.invoicData)
    this.getCustomList((data) => {
      const clientList = [];
      if (data.length) {
        this.isClient = true;
        for (let i = 0; i < data.length; i += 1) {
          const client = {
            name: data[i].name,
            value: `${data[i].name}-${data[i].id}`
          }
          clientList.push(client)
        }
      } else {
        this.isClient = false;
      }
      this.clientType.push(clientList)
      if (Object.keys(this.invoicData).length) {
        this.clientVar = [`${this.invoicData.clientName}-${this.invoicData.clientId}`];
      }
    })
  },
  mounted() {
    // 导航栏高度
    const that = this;
    this.$nextTick(() => {
      that.$refs.creatInvoic.$el.style.height = `${that.$countHeight(['.vux-header', '#creatSearchView'])}px`;
    })
  },
  computed: {
    userInfo() {
      return config.getUserToken();
    },
    clientList() {
      return this.$store.getters.getClientList;
    },
    modifier() {
      return this.$store.getters.getModifier;
    },
    invoicData() {
      return this.$store.getters.getInvoicData;
    }
  },
  components: {},
  data() {
    return {
      isClient: true,
      clientVar: [],
      clientType: [],
      imgList: [{
        src: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        msrc: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        w: 800,
        h: 400
      }, {
        src: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        msrc: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        w: 800,
        h: 400
      }],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          const thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
          // get window scroll Y
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          const rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },
      // 日期
      dataValue: '',
      stockValue: '', // 进货
      marketValue: '', // 销售
      repertoryValue: '', // 库存
      listValue: '', // 陈列
      loginLoading: false, // 确定loading
      client: '', // 客户类型
    };
  },
  methods: {
    // 获取客户列表下拉
    getCustomList(callBack) {
      jobControl.customerlist(this.client).then((res) => {
        callBack(res.data);
      })
    },
    clearValue(value) {
      this.dataValue = ''
    },
    changeValue(value) {
      console.log('change', value)
    },
    onConfirm(val) {
      console.log('on-confirm arg', val)
    },
    // 确定提交按钮
    confirmClick() {
      if (this.dataValue === '') {
        this.$vux.toast.text('请选择日期', 'middle');
        return;
      }
      if (this.clientVar.length === 0 && !this.clientVar[0]) {
        this.$vux.toast.text('请选择客户', 'middle');
        return;
      }
      if (this.stockValue === '') {
        this.$vux.toast.text('请输入进货数量', 'middle');
        return;
      }
      if (this.marketValue === '') {
        this.$vux.toast.text('请输入销售数量', 'middle');
        return;
      }
      if (this.repertoryValue === '') {
        this.$vux.toast.text('请输入库存数量', 'middle');
        return;
      }
      let addresses = '';
      if (this.$plus) {
        window.mobileNative.getGeocode((address, error) => {
          if (error) {
            this.$vux.toast.text('获取签到地址失败', 'middle');
            return;
          }
          addresses = address;
          if (!Object.keys(this.invoicData).length) {
            this.addInvoic(addresses)
          } else {
            this.updataInvoic(addresses)
          }
        })
      } else {
        addresses = '深圳市'
        if (!Object.keys(this.invoicData).length) {
          this.addInvoic(addresses)
        } else {
          this.updataInvoic(addresses)
        }
      }
    },
    // 更新进销存
    updataInvoic(addresses) {
      const split = this.clientVar[0].split('-')
      const from = {
        companyId: this.userInfo.companyId,
        companyName: this.userInfo.companyName,
        memberId: this.userInfo.id,
        memberName: this.userInfo.name,
        stock: this.stockValue,
        sale: this.marketValue,
        inventory: this.repertoryValue,
        writeDate: this.dataValue,
        signAddress: addresses,
        clientId: split[1],
        clientName: split[0],
        clientType: this.clientList.clientType,
        productId: this.clientList.productId,
        commonName: this.clientList.commonName,
        id: this.invoicData.id,
      }
      this.$vux.loading.show({
        text: '修改中...'
      })
      jobControl.updateInventory(from, this.invoicData.id).then((res) => {
        this.$vux.loading.hide()
        if (res.data.code === 0) {
          this.$vux.toast.text('修改成功', 'middle');
          this.$router.back();
        }
      })
    },
    // 添加进销存
    addInvoic(addresses) {
      const split = this.clientVar[0].split('-')
      const from = {
        companyId: this.userInfo.companyId,
        companyName: this.userInfo.companyName,
        memberId: this.userInfo.id,
        memberName: this.userInfo.name,
        stock: this.stockValue,
        sale: this.marketValue,
        inventory: this.repertoryValue,
        writeDate: this.dataValue,
        signAddress: addresses,
        clientId: split[1],
        clientName: split[0],
        clientType: this.clientList.clientType,
        productId: this.clientList.productId,
        commonName: this.clientList.commonName
      }
      this.$vux.loading.show({
        text: '录入中...'
      })
      jobControl.createInventory(from).then((res) => {
        this.$vux.loading.hide()
        if (res.data.code === 0) {
          this.$vux.toast.text('录入成功', 'middle');
          this.$router.back();
        }
      })
    },
    // 预览图片
    showImg(index) {
      this.$refs.previewer.show(index)
    },
    logIndexChange(arg) {
      console.log(arg)
    },
    // 从相册中选择图片
    galleryImgsSelected() {
      window.mobileNative.galleryImgsSelected()
    },
    // 选择触发
    selectChange(val, index) {
      console.log('on change', val, index)
    },
  },
};
</script>

<style scoped>
/* 确定按钮 */
.confirm_button {
  padding-top: 15px;
  background-color: #ffffff;
}

.confirm_button .weui-btn {
  width: 350px;
  line-height: 38px;
  font-size: 15px;
}
/* 陈列图片上传 */
.update_img {
  display: flex;
}

.img_show div img {
  width: 62px;
  height: 62px;
  margin: 6px 0 5px 14px;
}
.img_show {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.img_show_no {
  width: 62px;
  height: 62px;
  margin: 6px 0 5px 14px;
  text-align: center;
  background-color: #f8f8f8;
}
.img_show_view {
  position: relative;
}
.img_show_no span {
  font-size: 25px;
  color: #cccccc;
  display: block;
  margin-top: 3px;
}
.img_show_no .img_show_font {
  font-size: 11px;
  display: block;
  margin-top: -8px;
}
.update_img_span {
  margin-right: 6px;
}
.img_span_show {
  position: absolute;
  top: -1px;
  right: -4px;
  color: red;
  font-size: 19px;
  background-color: #ffffff;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  line-height: 15px;
}
</style>
