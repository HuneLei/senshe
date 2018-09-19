<!-- 商品详情 -->
<template>
  <scroller ref="myGoodsCard" class="my_goods_card">
    <group gutter='0' label-width="6em" label-margin-right="2em">
      <div class="goods_card_img">
        <img src="http://2017051845.oss-cn-hangzhou.aliyuncs.com/2a9b6f4f-5359-41bb-b2fa-859f7aa7ce64..jpg" style="width:100%;display:block;">
      </div>
      <cell title="通用名：" :value="form.commonName" value-align="left"></cell>
      <cell title="规格：" :value="form.module" value-align="left"></cell>
      <cell title="生产厂家：" :value="form.factory" value-align="left"></cell>
      <cell title="单位：" :value="form.unit" value-align="left"></cell>
      <cell title="箱规格：" :value="form.boxModule" value-align="left"></cell>
      <cell title="零售价：" :value="form.retailPrice" value-align="left"></cell>
    </group>
  </scroller>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  activated() {
    this.getProductItem((data) => {
      if (data.code === 0) {
        data.result.unit = data.result.sensheProduct.unit;
        data.result.boxModule = data.result.sensheProduct.boxModule;
        data.result.retailPrice = `${data.result.sensheProduct.retailPrice}元`;
        this.form = data.result;
      }
    });
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      // const marginTop = document.querySelector('.vux-header').clientHeight;
      // that.$refs.myGoodsCard.$el.style.marginTop = `${marginTop}px`
      that.$refs.myGoodsCard.$el.style.height = `${that.$countHeight(['.vux-header', '.weui-tabbar'])}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      form: {}, // 商品详情
    };
  },
  methods: {
    // 获取产品详情
    getProductItem(callBack) {
      dateCenter.productitem(this.$route.query.id).then((res) => {
        callBack(res.data)
      })
    },
  },
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
