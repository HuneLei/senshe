<!-- 进销存录入 -->
<template>
  <div class="index_class scroller_rela" ref="creatInvoicItem">
    <search placeholder="输入客户名称进行搜索" v-model="searchValue" class="search_view" :auto-fixed='false' @on-submit="onSubmit" @on-cancel="onCancel" id="creatSearchView"></search>
    <x-table class="table_thead" :cell-bordered="false" ref="tableThead" id="tableThead">
      <thead>
        <tr style="background-color: #F8F8F8">
          <th class="table_thead_longth table_border">客户名称</th>
          <th>进货</th>
          <th>销售</th>
          <th>库存</th>
          <th class="table_img">陈列照片</th>
          <th class="table_icon" v-if="modifier"></th>
        </tr>
      </thead>
    </x-table>
    <scroller style="background-color: #ffffff;" ref="creatScroller" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText'>
      <div class="incoic_table">
        <x-table :cell-bordered="false">
          <tbody :class="`table_tbody ${ !modifier || 'table_tbody_active'}`">
            <tr v-for="(item, index) in incoicList" :key="index" @click="updateClick(item)">
              <td class="table_border table_tbody_longth">{{item.writeDate | convertNewDate}}<br v-show="item.writeDate" /> {{item.clientName}}</td>
              <td>{{item.stock}}</td>
              <td>{{item.sale}}</td>
              <td>{{item.inventory}}</td>
              <td class="table_img">
                <div :class="`img_icon ${item.filePath || 'img_icon_no'}`" @click.stop="showImg(item.filePath)">
                  <span :class="`img_icon iconfont icon-zhaopian ${item.filePath || 'img_icon_no'}`"></span>
                </div>
              </td>
              <td class="table_icon" v-if="modifier">
                <x-icon type="ios-arrow-right"></x-icon>
              </td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </scroller>
    <div v-transfer-dom>
      <previewer :list="imgList" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
import jobControl from '../../../api/jobControl';
import config from '../../../config'

export default {
  created() { },
  activated() { },
  deactivated() { },
  watch: {
    $route(to, form) {
      this.page = 1;
      if ((to.path !== '/JobControl/CreatInvoicItem' && form.path !== '/JobControl/CreatInvoic') && (to.path !== '/JobControl/CreatInvoic' && form.path !== '/JobControl/CreatInvoicItem')) {
        this.searchValue = '';
      }
      if ((to.path === '/JobControl/CreatInvoicItem' && form.path === '/JobControl/InvoicList') || to.path === '/JobControl/CreatInvoicItem' && form.path === '/JobControl/CreatInvoic') {
        this.$refs.creatScroller.triggerPullToRefresh()
      }
    },
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      const theadTop = document.querySelector('#creatSearchView').clientHeight;
      const Top = theadTop + document.querySelector('#tableThead').clientHeight;
      that.$refs.tableThead.$el.style.top = `${theadTop}px`;
      that.$refs.creatScroller.$el.style.top = `${Top}px`;
      that.$refs.creatScroller.$el.style.height = `${that.$countHeight(['.vux-header', '#creatSearchView', '#tableThead'])}px`;
    })
  },
  computed: {
    modifier() {
      return this.$store.getters.getModifier;
    },
    clientList() {
      return this.$store.getters.getClientList;
    }
  },
  components: {},
  data() {
    return {
      page: 0,
      noDataText: '',
      searchValue: '', // 搜索的值
      incoicList: [],
      imgList: [],
    };
  },
  methods: {
    showImg(path) {
      if (!path) return
      const that = this;
      that.imgList = [];
      const imgList = path.split(',');
      imgList.forEach((item) => {
        if (item) {
          const imgObj = {
            msrc: `${config.imgHost}${item}.thumb.jpg`,
            src: `${config.imgHost}${item}.thumb.jpg`,
            w: 1200,
            h: 900
          }
          that.imgList.push(imgObj)
        }
      })
      setTimeout(() => {
        that.$refs.previewer.show(0)
      }, 0)
    },
    // 去编辑页面
    updateClick(item) {
      if (this.modifier) {
        this.$store.commit('updateInvoicData', item)
        this.$router.push('/JobControl/CreatInvoic');
      }
    },
    getMsglist(callBack) {
      jobControl.inventoryList(this.page, this.searchValue, this.clientList.clientType, this.clientList.productId).then((res) => {
        callBack(res.data);
      })
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getMsglist((data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            self.incoicList = self.incoicList.concat(data.result.listData);
            done(true)
            return
          }
          self.incoicList = self.incoicList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.getMsglist((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.incoicList = data.result.listData;
        }
        done()
      })
    },
    // 搜索的时候触发
    onSubmit() {
      const that = this;
      this.page = 1;
      this.getMsglist((data) => {
        if (data.code === 0) {
          that.incoicList = data.result.listData;
        }
      })
    },
    // 点击取消的时候触发
    onCancel() {
      this.searchValue = '';
      this.$refs.creatScroller.triggerPullToRefresh()
    }
  },
};
</script>

<style scoped>
.table_thead {
  font-size: 15px;
  position: absolute;
}
/* 表格样式 */
.table_border:after {
  border-right: 0.02667rem solid #c7c7c7 !important;
}
.table_icon {
  /*! autoprefixer: off */
  -webkit-flex: 0.6 !important;
  /* autoprefixer: on */
  flex: 0.6 !important;
}
.table_icon svg {
  height: 18px;
  width: 18px;
}
.table_img {
  /*! autoprefixer: off */
  -webkit-flex: 1.3 !important;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  display: -webkit-flex;
  /* autoprefixer: on */
  flex: 1.3 !important;
  align-items: center;
  justify-content: center;
  display: flex;
}

.table_tbody tr {
  display: flex;
  /*! autoprefixer: off */
  display: -webkit-flex;
  /* autoprefixer: on */
}

.table_tbody tr td {
  flex: 1;
  /*! autoprefixer: off */
  -webkit-flex: 1;
  /* autoprefixer: on */
}

.table_tbody_active tr:active {
  background-color: #f8f8f8;
}

.table_thead_longth {
  flex: 2.5 !important;
  /*! autoprefixer: off */
  -webkit-flex: 2.5 !important;
  /* autoprefixer: on */
  padding: 0 10px;
  text-align: left;
}

.table_tbody_longth {
  flex: 2.5 !important;
  justify-content: flex-start !important;
  /*! autoprefixer: off */
  -webkit-flex: 2.5 !important;
  -webkit-justify-content: flex-start !important;
  /* autoprefixer: on */
  text-align: left;
  padding: 6px 10px;
}

.incoic_table {
  overflow-y: auto;
  background-color: #ffffff;
}

.table_thead tr {
  display: flex;
  flex-wrap: wrap;
  /*! autoprefixer: off */
  display: -webkit-flex;
  flex-wrap: -webkit-wrap;
  /* autoprefixer: on */
}

.table_thead tr th {
  flex: 1;
  /*! autoprefixer: off */
  -webkit-flex: 1;
  /* autoprefixer: on */
  word-wrap: break-word;
  word-break: break-all;
}

.incoic_table table td {
  color: #666666;
  font-size: 14px;
  line-height: 22px;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  justify-content: center;
  align-items: center;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  /* autoprefixer: on */
}

/* 搜索 */
.search_view {
  font-size: 15px;
  position: absolute !important;
}
</style>
<style>
/* 去掉cell组件的前后边框 */
.index_class .weui-cells:before {
  border-top: 0 solid #d9d9d9;
}

.index_class .weui-search-bar:after {
  border-bottom: 0 solid #d7d6dc;
}
.vux-x-icon {
  fill: #999999;
}
.img_icon {
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  /* autoprefixer: on */
  display: flex;
  align-items: center;
  justify-content: center;
}

.img_icon span {
  font-size: 25px;
}

.img_icon:before {
  position: absolute;
  color: #07bc99;
}

.img_icon_no:before {
  color: #c4c4c4 !important;
}
</style>
