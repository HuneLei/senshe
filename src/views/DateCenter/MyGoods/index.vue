<template>
  <div class="my_goods">
    <keep-alive>
      <search :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view" @on-submit="onSubmit" @on-cancel="onCancel"></search>
    </keep-alive>
    <div ref="vueWaterfallEasy" class="Water_fall" v-show="imgsArr.length">
      <vue-waterfall-easy ref="waterfall" :mobileGap=20 :enablePullDownEvent='cancelShow' :loadingDotStyle='loadingDotStyle' @scrollReachBottom='fetchImgsData' @click="clickFn" :imgsArr="imgsArr">
        <div class="img-info" slot-scope="props">
          <p class="some-info">{{props.value.commonName}}</p>
        </div>
        <div slot="waterfall-over">没有更多数据了</div>
      </vue-waterfall-easy>
    </div>
    <load-more v-show="loadMore" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  mounted() {
    // 图片组的高度
    const that = this;
    this.$nextTick(() => {
      that.$refs.vueWaterfallEasy.style.height = `${that.$countHeight(['.vux-tab-container', '.weui-tabbar', '.search_view'])}px`;
    });
    this.initImgsArr((data) => {
      if (data.code === 0) {
        for (let i = 0; i < data.result.length; i += 1) {
          data.result[i].src = 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/2a9b6f4f-5359-41bb-b2fa-859f7aa7ce64..jpg'
        }
        if (data.result.length === 0) this.loadMore = true;
        that.imgsArr = data.result
      }
    });
  },
  computed: {},
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
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
    // 下拉加载更多图片
    fetchImgsData() {
      const that = this;
      that.page += 1;
      this.initImgsArr((data) => {
        if (data.code === 0) {
          if (data.result.length === 0) this.loadMore = true;
          for (let i = 0; i < data.result.length; i += 1) {
            data.result[i].src = 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/2a9b6f4f-5359-41bb-b2fa-859f7aa7ce64..jpg'
          }
          if (data.result.length !== 0) {
            that.imgsArr = that.imgsArr.concat(data.result)
          }
          if (data.result.length === 0) {
            that.$refs.waterfall.waterfallOver()
          }
        }
      })
    },
    // 查看详情
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault()
      this.$router.push(`DateCenter/MyGoodsItem?id=${value.id}`)
    },
    // 搜索的时候触发
    onSubmit() {
      const that = this;
      this.page = 1;
      this.initImgsArr((data) => {
        if (data.code === 0) {
          if (data.result.length === 0) this.loadMore = true;
          for (let i = 0; i < data.result.length; i += 1) {
            data.result[i].src = 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/2a9b6f4f-5359-41bb-b2fa-859f7aa7ce64..jpg'
          }
          that.imgsArr = data.result;
        }
      })
    },
    // 点击取消的时候触发
    onCancel() {
      const that = this; // this指向问题
      that.page = 1;
      that.searchValue = '';
      this.initImgsArr((data) => {
        if (data.code === 0) {
          for (let i = 0; i < data.result.length; i += 1) {
            data.result[i].src = 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/2a9b6f4f-5359-41bb-b2fa-859f7aa7ce64..jpg'
          }
          that.imgsArr = data.result;
        }
      })
    }
  },
};
</script>

<style scoped>
.my_goods {
  width: 100%;
  height: 100%;
}
.Water_fall {
  background-color: #f8f8f8;
}
.img-info {
  text-align: center;
  font-size: 15px;
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

