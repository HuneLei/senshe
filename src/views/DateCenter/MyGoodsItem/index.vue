<!-- 商品详情 -->
<template>
  <div ref="myGoodsCard">
    <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
    <div slot="content" class="card-padding">
      <p style="color:#999;font-size:12px;">通用名：螺旋藻片</p>
      <p style="font-size:14px;line-height:1.2;">规格：300片</p>
      <p style="font-size:14px;line-height:1.2;">规格：300片</p>
      <p style="font-size:14px;line-height:1.2;">规格：300片</p>
      <p style="font-size:14px;line-height:1.2;">规格：300片</p>
    </div>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight || 0 + window.immersed;
      that.$refs.myGoodsCard.style.marginTop = `${marginTop}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
