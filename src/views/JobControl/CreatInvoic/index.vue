<!-- 进销存录入 -->
<template>
  <div>
    <scroller ref="creatInvoic">
      <group gutter='0'>
        <datetime v-model="dataValue" @on-change="changeValue" title="日期：" clear-text="清除" @on-clear="clearValue" @on-confirm="onConfirm"></datetime>
        <!-- <popup-picker v-if="isClient" title="客户：" :data="clientType" v-model="clientVar" @on-change="val => selectChange(val, 2)" show-name @on-show="showClient()"></popup-picker> -->
        <cell v-if="isClient" title="客户：" is-link @click.native="selectClient()" :value="clientData.name"></cell>
        <cell v-if="!isClient" title="客户：" value="暂无客户"></cell>
        <x-input class="creat_invoic" title='进货：' v-model.number="stockValue" :text-align='stockRight'
        keyboard="number" type="tel" @on-blur="() => { stockRight = 'right' }" @on-focus="() => { stockRight = 'left' }"></x-input>
        <x-input class="creat_invoic" title='销售：' v-model.number="marketValue" :text-align='marketRight'
        keyboard="number" type="tel" @on-blur="() => { marketRight = 'right' }" @on-focus="() => { marketRight = 'left' }"></x-input>
        <x-input class="creat_invoic" title='库存：' v-model.number="repertoryValue" :text-align='repertoryRight'
        keyboard="number" type="tel" @on-blur="() => { repertoryRight = 'right' }" @on-focus="() => { repertoryRight = 'left' }">
        </x-input>
        <cell v-model="listValue" text-align='right'>
          <div slot="title" class="update_img">
            <span class="update_img_span">陈列：</span>
            <div class="img_show">
              <div class="img_show_no" style="border: 1px solid #eaeaea; border-radius: 10px;" @click="galleryImgsSelected()">
                <span class="iconfont icon-tupian1"></span>
                <span class="img_show_font">上传照片</span>
              </div>
              <div class="img_show_no" style="border: 1px solid #eaeaea; border-radius: 10px;" @click="photoImgsSelected()">
                <span class="iconfont icon-zhaopian1"></span>
                <span class="img_show_font">拍照上传</span>
              </div>
              <div class="img_show_view" v-for="(item, index) in imgList" :key="index">
                <img v-if="item.src" class="previewer-demo-img" :src="item.src" alt="" style="box-shadow: 1px 0px 1px #ccc; border-radius: 10px;" @click="showImg(index)">
                <span v-if="item.src" class="img_span_show iconfont icon-jianshao" @click="deleteImage(index)"></span>
              </div>
              <div v-if="showPreviewer">
                <div v-transfer-dom>
                  <previewer :list="imgList" ref="previewer" @on-close='onClose'></previewer>
                </div>
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
    <transition enter-active-class="animated slideInRights flying" leave-active-class="animated slideOutRights flying">
      <!-- router链接 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import jobControl from '../../../api/jobControl';
import config from '../../../config';

export default {
  created() { },
  activated() {
    this.clientType = [];
    this.stockRight = 'right';
    this.marketRight = 'right';
    this.repertoryRight = 'right';
    this.imgList = [{
      src: '',
      msrc: '',
      w: 1200,
      h: 900
    }];
    this.client = this.clientList.clientType;
    // 日期
    if (!Object.keys(this.invoicData).length) {
      const nowDate = new Date()
      this.dataValue = window.convert.convertNewDate(nowDate);
      this.stockValue = ''; // 进货
      this.marketValue = ''; // 销售
      this.repertoryValue = ''; // 库存
      this.listValue = ''; // 陈列
      // this.clientVar = [];
      this.$store.commit('updateDatacliente', {
        name: '',
        id: '',
      })
    } else {
      this.dataValue = window.convert.convertNewDate(this.invoicData.writeDate);
      this.stockValue = this.invoicData.stock; // 进货
      this.marketValue = this.invoicData.sale; // 销售
      this.repertoryValue = this.invoicData.inventory; // 库存
      this.listValue = ''; // 陈列
      this.$store.commit('updateDatacliente', {
        name: this.invoicData.clientName,
        id: this.invoicData.clientId,
      })
      if (this.invoicData.filePath) {
        const path = this.invoicData.filePath;
        const that = this;
        that.imgList = [];
        const imgList = path.split(',');
        imgList.forEach((item) => {
          if (item) {
            const imgObj = {
              msrc: `${config.imgHost}${item}`,
              src: `${config.imgHost}${item}`,
              w: 1200,
              h: 900,
              oldUrl: item,
            }
            that.imgList.push(imgObj)
          }
        })
      }
    }
  },
  mounted() {
    // 导航栏高度
    const that = this;
    this.$nextTick(() => {
      that.$refs.creatInvoic.$el.style.height = `${that.$countHeight(['.vux-header', '#creatSearchView'])}px`;
    })
  },
  computed: {
    clientData() {
      return this.$store.getters.getDataClient
    },
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
      stockRight: '',
      marketRight: '',
      repertoryRight: '',
      isClient: true,
      // clientVar: [],
      clientType: [],
      imgList: [{
        src: '',
        msrc: '',
        w: 1200,
        h: 900
      }],
      // 日期
      dataValue: '',
      stockValue: '', // 进货
      marketValue: '', // 销售
      repertoryValue: '', // 库存
      listValue: '', // 陈列
      loginLoading: false, // 确定loading
      client: '', // 客户类型
      showPreviewer: false,
      // task: {},
    };
  },
  methods: {
    onClose() {
      this.showPreviewer = false;
    },
    // 选择客户
    selectClient() {
      this.$router.push(`/JobControl/CreatInvoic/SelectClient?client=${this.client}`);
    },
    // 选择品种框的时候刷新
    showClient() {
      this.getCustomList((data) => {
        const clientList = [];
        this.clientType = [];
        if (data.length) {
          this.isClient = true;
          for (let i = 0; i < data.length; i += 1) {
            const client = {
              name: data[i].name,
              value: `${data[i].name}-${data[i].id}`
            }
            clientList.push(client)
          }
        }
        this.clientType.push(clientList)
      })
    },
    // 删除此照片
    deleteImage(index) {
      const that = this
      if (this.$plus) {
        const bts = ['取消', '确定'];
        this.$plus.nativeUI.confirm('确定去除此图片?', (e) => {
          if (e.index === 1) {
            if (that.imgList.length !== 1) {
              that.imgList.splice(index, 1);
            } else {
              that.imgList = [{
                src: '',
                msrc: '',
                w: 1200,
                h: 900
              }]
            }
          }
        }, '', bts)
      } else {
        this.$vux.confirm.show({
          content: '确定去除此图片？',
          onCancel() { },
          onConfirm() {
            if (that.imgList.length !== 1) {
              that.imgList.splice(index, 1);
            } else {
              that.imgList = [{
                src: '',
                msrc: '',
                w: 1200,
                h: 900
              }]
            }
          }
        })
      }
    },
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
    },
    onConfirm(val) {
    },
    // 确定提交按钮
    confirmClick() {
      const that = this
      if (this.dataValue === '') {
        this.$vux.toast.text('请选择日期', 'middle');
        return;
      }
      if (!this.clientData.name) {
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
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '获取签到位置失败',
              content: '请到手机系统的[设置]->[隐私]->[定位服务]中打开定位服务,并允许森舍使用定位服务'
            })
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
      // const split = this.clientVar[0].split('-')
      const from = {
        companyId: this.userInfo.companyId,
        companyName: this.userInfo.companyName,
        memberId: this.userInfo.id,
        memberName: this.userInfo.name,
        stock: Number(this.stockValue),
        sale: Number(this.marketValue),
        inventory: Number(this.repertoryValue),
        writeDate: this.dataValue,
        signAddress: addresses,
        clientId: this.clientData.id,
        clientName: this.clientData.name,
        clientType: this.clientList.clientType,
        productId: this.clientList.productId,
        commonName: this.clientList.commonName,
        filePath: '',
        id: this.invoicData.id,
      }
      this.$vux.loading.show({
        text: '修改中...'
      })
      if (this.$plus) {
        window.mobileNative.createUpload(this.imgList, (filePath) => {
          from.filePath = filePath;
          for (let i = 0; i < this.imgList.length; i += 1) {
            if (this.imgList[i].oldUrl) {
              from.filePath = `${from.filePath}${this.imgList[i].oldUrl},`
            }
          }
          jobControl.updateInventory(from, this.invoicData.id).then((res) => {
            this.$vux.loading.hide()
            if (res.data.code === 0) {
              this.$vux.toast.text('修改成功', 'middle');
              this.$router.back();
            }
          })
        });
      } else {
        jobControl.updateInventory(from, this.invoicData.id).then((res) => {
          this.$vux.loading.hide()
          if (res.data.code === 0) {
            this.$vux.toast.text('修改成功', 'middle');
            this.$router.back();
          }
        })
      }
    },
    // 添加进销存
    addInvoic(addresses) {
      // const split = this.clientVar[0].split('-')
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
        clientId: this.clientData.id,
        clientName: this.clientData.name,
        clientType: this.clientList.clientType,
        productId: this.clientList.productId,
        commonName: this.clientList.commonName,
        filePath: '',
      }
      this.$vux.loading.show({
        text: '录入中...'
      })
      if (this.$plus) {
        window.mobileNative.createUpload(this.imgList, (filePath) => {
          from.filePath = filePath;
          jobControl.createInventory(from).then((res) => {
            this.$vux.loading.hide()
            if (res.data.code === 0) {
              this.$vux.toast.text('录入成功', 'middle');
              this.$router.back();
            }
          })
        });
      } else {
        jobControl.createInventory(from).then((res) => {
          this.$vux.loading.hide()
          if (res.data.code === 0) {
            this.$vux.toast.text('录入成功', 'middle');
            this.$router.back();
          }
        })
      }
    },
    // 预览图片
    showImg(index) {
      this.showPreviewer = true;
      const that = this;
      this.$nextTick(() => {
        that.$refs.previewer.show(index)
      })
    },
    logIndexChange(arg) {
    },
    // 拍照上传
    photoImgsSelected() {
      const that = this;
      const imgList = [];
      window.mobileNative.getImage((e, error) => {
        // if (error && error.code === 8) {
        //   this.$vux.confirm.show({
        //     showCancelButton: false,
        //     title: '不能访问手机相机',
        //     content: '请到手机系统的[设置]->[隐私]->[相机]中允许森舍访问你的摄像头'
        //   })
        //   return;
        // }
        if (error && error.code === 2) {
          return;
        }
        const imgObject = {
          src: e,
          msrc: e,
          w: 1200,
          h: 900
        }
        imgList.push(imgObject)
        if (that.imgList.length === 1 && that.imgList[0].src === '') {
          that.imgList = [];
        }
        that.imgList = [...that.imgList, ...imgList];
      })
    },
    // 从相册中选择图片
    galleryImgsSelected() {
      const that = this;
      const imgList = [];
      window.mobileNative.galleryImgsSelected((e, error) => {
        if (error && error.code === 8) {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '不能访问手机相册',
            content: '请到手机系统的[设置]->[隐私]->[照片]中允许森舍访问你的手机相册'
          })
          return;
        }
        if (error && error.code === -2) {
          return;
        }
        for (let i = 0; i < e.files.length; i += 1) {
          const imgObject = {
            src: e.files[i],
            msrc: e.files[i],
            w: 1200,
            h: 900
          }
          imgList.push(imgObject)
        }
        if (that.imgList.length === 1 && that.imgList[0].src === '') {
          that.imgList = [];
        }
        that.imgList = [...that.imgList, ...imgList];
      })
    },
    // 选择触发
    selectChange(val, index) {
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
  /*! autoprefixer: off */
  display: -webkit-flex;
  /* autoprefixer: on */
}

.img_show div img {
  width: 62px;
  height: 62px;
  margin: 6px 0 5px 10px;
}
.img_show {
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-flex-wrap: wrap;
  -webkit-flex: 1;
  /* autoprefixer: on */
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.img_show_no {
  width: 62px;
  height: 62px;
  margin: 6px 0 5px 10px;
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

<style>
.creat_invoic input {
  color: #999 !important;
}
</style>

