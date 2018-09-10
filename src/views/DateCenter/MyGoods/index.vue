<template>
  <div class="my_goods">
    <keep-alive>
      <search :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view"></search>
    </keep-alive>
    <div ref="vueWaterfallEasy" class="Water_fall">
      <keep-alive>
        <vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" :mobileGap=20 :enablePullDownEvent='cancelShow' :loadingDotStyle='loadingDotStyle' @scrollReachBottom='fetchImgsData' @click="clickFn">
          <div class="img-info" slot-scope="props">
            <p class="some-info">{{props.value.name}}</p>
          </div>
        </vue-waterfall-easy>
      </keep-alive>
      <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  created() { },
  mounted() {
    // 图片组的高度
    const that = this;
    this.$nextTick(() => {
      that.$refs.vueWaterfallEasy.style.height = `${that.$countHeight(['.vux-tab-container', '.weui-tabbar', '.search_view']) - window.immersed}px`;
    });
    this.imgsArr = this.initImgsArr(0, 10);
    this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的新的图片的数据数据
  },
  computed: {},
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      cancelShow: true, // 取消按钮是否显示
      winTop: 0, // 自动固定时距离顶部的距离
      searchValue: '', // 搜索的内容
      loadingDotStyle: {
        backgroundColor: '#07BC99' // loading动画内小圆点的样式
      },
      imgsArr: [], // 存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: [], // 存放每次滚动时下一批要加载的图片的数组
    }
  },
  methods: {
    // 获取图片数据
    initImgsArr(n, m) {
      const arr = [];
      for (let i = n; i < m; i += 1) {
        if (i % 2 === 0) {
          arr.push({ id: i, src: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/2a9b6f4f-5359-41bb-b2fa-859f7aa7ce64..jpg', name: '通络止痛药酒' })
        } else if (i % 3 === 0) {
          arr.push({ id: i, src: 'https://2017051845.oss-cn-hangzhou.aliyuncs.com/8f4bbfd0-0517-41b5-8d98-419b6ae8fefe..jpg', name: '通络止痛药酒' })
        } else if (i % 2 === 0) {
          arr.push({ id: i, src: 'https://2017051845.oss-cn-hangzhou.aliyuncs.com/989f38e6-05de-4e6b-bdf1-2865800503d7..jpg', name: '通络止痛药酒' })
        }
      }
      return arr
    },
    // 下拉加载更多图片
    fetchImgsData() {
      this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)
      // this.$refs.waterfall.waterfallOver()
    },
    // 查看详情
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault()
      console.log(value.id)
      this.$router.push(`DateCenter/MyGoodsItem?id=${value.id}`)
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
  font-size: 16px;
}
.some-info {
  padding: 6px;
}
</style>
