<!-- 商品详情 -->
<template>
  <scroller ref="myGoodsCard" class="my_goods_card">
    <group gutter='0' label-width="6em" label-margin-right="2em">
      <div class="goods_card_img">
        <img src="http://2017051845.oss-cn-hangzhou.aliyuncs.com/2a9b6f4f-5359-41bb-b2fa-859f7aa7ce64..jpg" style="width:100%;display:block;">
      </div>
      <cell title="通用名：" :value="form.name" value-align="left"></cell>
      <cell title="规格：" :value="form.guige" value-align="left"></cell>
      <cell title="生产厂家：" :value="form.com" value-align="left"></cell>
      <cell title="单位：" :value="form.danwei" value-align="left"></cell>
      <cell title="箱规格：" :value="form.xiang" value-align="left"></cell>
      <cell title="零售价：" :value="form.jiage" value-align="left"></cell>
    </group>
  </scroller>
</template>

<script>

export default {
  created() { },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.myGoodsCard.$el.style.marginTop = `${marginTop}px`
      that.$refs.myGoodsCard.$el.style.height = `${that.$countHeight(['.vux-header', '.weui-tabbar']) - window.immersed}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      form: {
        name: '螺旋藻片',
        guige: '300片',
        com: '辽宁中医学院药业有限公司',
        danwei: '盒',
        xiang: '36',
        jiage: '288.0元',
      }, // 商品详情
    };
  },
  methods: {},
};
</script>

<style scoped>
.goods_card_img {
  padding: 10px;
  width: 355px;
}
</style>
<style>
.my_goods_card .vux-cell-bd {
  text-align: right;
}
</style>
