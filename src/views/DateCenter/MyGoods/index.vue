<template>
  <div class="my_goods data_center scroller_rela" ref="goodsSearchview">
    <search :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view" @on-submit="onSubmit" @on-cancel="onCancel" id="goodsSearch"></search>
    <scroller style="background-color: #ffffff;" ref="myGoodsScroller" :on-infinite="infinite" :noDataText='noDataText' :on-refresh="refresh" refreshText='下拉刷新'>
      <div class="my_goods_list">
        <div class="my_goods_view" v-for="(item, index) in imgsArr" :key="index" @click="clickFn(item)">
          <div>
            <img :src="item.photo" alt="" class="my_goods_img" onerror="static/img/yaoping5.jpg">
            <div class="img-info">
              {{item.commonName}}
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  activated() { },
  mounted() {
    const that = this;
    // 屏幕高度设置
    this.$nextTick(() => {
      const Top = document.querySelector('#goodsSearch').clientHeight;
      that.$refs.myGoodsScroller.$el.style.top = `${Top}px`;
      that.$refs.goodsSearchview.style.height = `${that.$countHeight(['.vux-header', '#goodsSearch', '.vux-tab-container'])}px`;
    })
    this.$refs.myGoodsScroller.triggerPullToRefresh()
  },
  computed: {},
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      noDataText: '',
      loadMore: false,
      page: 1, // 当前页数
      cancelShow: true, // 取消按钮是否显示
      searchValue: '', // 搜索的内容
      loadingDotStyle: {
        backgroundColor: '#07BC99' // loading动画内小圆点的样式
      },
      imgsArr: [], // 存放所有已加载图片的数组（即当前页面会加载的所有图片）
    }
  },
  methods: {
    // 获取图片数据
    initImgsArr(callBack) {
      const arr = [];
      dateCenter.productlist(this.page, this.searchValue).then((res) => {
        callBack(res.data)
      })
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      console.log(2222222)
      this.page += 1;
      const self = this;
      this.initImgsArr((data) => {
        if (data.code === 0) {
          if (data.result.length < 15) {
            if (self.page === 1 && data.result.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1 && self.imgsArr.length !== 0) {
              self.noDataText = '没有更多数据了';
            } else if (self.page !== 1 && self.imgsArr.length === 0) {
              self.noDataText = '暂无数据';
            }
            for (let i = 0; i < data.result.length; i += 1) {
              const ImgObjs = new Image();
              ImgObjs.src = data.result[i].photo;
              if (data.result[i].photo && (ImgObjs.fileSize > 0 || (ImgObjs.width > 0 && ImgObjs.height > 0))) {
                self.$set(data.result[i], 'src', data.result[i].photo);
              } else {
                self.$set(data.result[i], 'src', 'static/img/yaoping5.jpg');
              }
            }
            if (data.result.length !== 0) {
              self.imgsArr = self.imgsArr.concat(data.result.listData);
            }
            done(true)
            return
          }
          self.imgsArr = self.imgsArr.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      console.log(111111)
      const self = this;
      self.page = 1;
      this.initImgsArr((data) => {
        if (data.code === 0) {
          if (data.result.length === 0) {
            self.noDataText = data.result.length === 0 ? '暂无数据' : ''
          }
          for (let i = 0; i < data.result.length; i += 1) {
            const ImgObj = new Image();
            ImgObj.src = data.result[i].photo;
            console.log('ImgObj.src', ImgObj.src)
            console.log('ImgObj.width', ImgObj.width)
            if (data.result[i].photo && (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0))) {
              console.log(3333)
              self.$set(data.result[i], 'src', data.result[i].photo);
            } else {
              self.$set(data.result[i], 'src', 'static/img/yaoping5.jpg');
            }
          }
          if (data.result.length !== 0) {
            self.imgsArr = data.result
          }
        }
        done()
      })
    },
    // 查看详情
    clickFn(value) {
      // 阻止a标签跳转
      event.preventDefault()
      this.$router.push(`/DateCenter/MyGoodsItem?id=${value.id}`)
    },
    // 搜索的时候触发
    onSubmit() {
      const that = this;
      this.page = 1;
      this.initImgsArr((data) => {
        if (data.code === 0) {
          if (data.result.length === 0) this.loadMore = true;
          for (let i = 0; i < data.result.length; i += 1) {
            const ImgObj = new Image();
            ImgObj.src = data.result[i].photo;
            if (data.result[i].photo && (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0))) {
              that.$set(data.result[i], 'src', data.result[i].photo);
            } else {
              that.$set(data.result[i], 'src', 'static/img/yaoping5.jpg');
            }
          }
          that.imgsArr = data.result;
        }
      })
    },
    // 点击取消的时候触发
    onCancel() {
      this.page = 1;
      this.searchValue = '';
      this.$refs.myGoodsScroller.triggerPullToRefresh()
    }
  },
};
</script>

<style scoped>
.my_goods_img {
  width: 100%;
  height: 190px;
  border-radius: 10px 10px 0px 0px !important;
}
.my_goods_list {
  display: flex;
  flex-wrap: wrap;
}
.my_goods_view {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 10px !important;
  background-color: #f8f8f8;
  height: 220px;
  width: 177px;
  margin: 5px;
}
.my_goods {
  width: 100%;
  height: 100%;
}
.Water_fall {
  background-color: #f8f8f8;
}
.img-info {
  line-height: 23px;
  text-align: center;
  font-size: 14px;
  height: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 0px 0px 10px 10px !important;
}
.some-info {
  padding: 6px;
}
</style>
<style>
.vux-loadmore.weui-loadmore_line:before,
.vux-loadmore.weui-loadmore_line:after {
  border-top: 0rem !important;
}
</style>

