<!-- 进销存查询 -->
<template>
  <scroller :style="`margin-top: ${winTop}px;`">
    <group gutter='0'>
      <cell v-for="(item, index) in indexList" :key="index" :title="item.name" is-link @click.native="CellClick(item.id)"></cell>
    </group>
  </scroller>
</template>

<script>

export default {
  created() { },
  mounted() {
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      indexList: [{
        name: '江莱清润糖',
        id: 1
      }, {
        name: '强力枇杷膏',
        id: 2
      }, {
        name: '妇女痛经颗粒',
        id: 3
      }, {
        name: '福牌阿胶(250g)',
        id: 4
      }, {
        name: '爱捷康（感冒药）(20粒)',
        id: 5
      }, {
        name: '红霉素眼膏(0.5%*2g)',
        id: 6
      }, {
        name: '伏格列波糖(15粒*2板)',
        id: 7
      }, {
        name: '白云山糖(2.5g*15片)',
        id: 8
      }], // 当前进销存列表
    };
  },
  methods: {
    // 点击进销存查看详情
    CellClick(id) {
      console.log('id', id);
      this.$router.push(`/JobControl/QueryInvoicItem?id=${id}`);
    }
  },
};
</script>

<style scoped>
</style>
