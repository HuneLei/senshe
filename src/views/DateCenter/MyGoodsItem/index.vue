<!-- 商品详情 -->
<template>
  <scroller ref="myGoodsCard" class="my_goods_card">
    <div class="goods_item">
      <img :src="list[0].src" @click="showImg()">
    </div>
    <group gutter='0' label-width="6em" label-margin-right="2em">
      <cell title="通用名：" :value="form.commonName" value-align="left"></cell>
      <cell title="规格：" :value="form.module" value-align="left"></cell>
      <cell title="生产厂家：" :value="form.factory" value-align="left"></cell>
      <cell title="单位：" :value="form.unit" value-align="left"></cell>
      <cell title="箱规格：" :value="form.boxModule" value-align="left"></cell>
      <cell title="零售价：" :value="form.retailPrice" value-align="left"></cell>
    </group>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer"></previewer>
    </div>
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
        const ImgObj = new Image();
        ImgObj.src = data.result.photo;
        if (data.result.photo && (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0))) {
          this.$set(this.list[0], 'msrc', data.result.photo);
          this.$set(this.list[0], 'src', data.result.photo);
        } else {
          this.$set(this.list[0], 'msrc', 'static/img/yaoping5.jpg');
          this.$set(this.list[0], 'src', 'static/img/yaoping5.jpg');
        }
        this.form = data.result;
      }
    });
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      // const marginTop = document.querySelector('.vux-header').clientHeight;
      // that.$refs.myGoodsCard.$el.style.marginTop = `${marginTop}px`
      that.$refs.myGoodsCard.$el.style.height = `${that.$countHeight(['.vux-header'])}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      form: {}, // 商品详情
      list: [{
        msrc: '',
        src: '',
        w: 800,
        h: 400
      }],
    };
  },
  methods: {
    // 展示图片
    showImg(index) {
      this.$refs.previewer.show(0)
    },
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
.goods_item img {
  width: 50%;
  display: block;
  padding: 0 30px;
}
</style>
<style>
.my_goods_card .vux-cell-bd {
  text-align: right;
}
</style>
