<!-- 进度查询列表 -->
<template>
  <div>
    <group gutter='0'>
      <cell title="通用名" class="common_name">
        <span class="client_type">客户类型</span>
      </cell>
      <cell class="cell_name" is-link v-for="(item, index) in cellList" :key="index" :title="item.name" @click.native="CellClick(item.id)">
        <span class="cell_type">{{item.value}}</span>
      </cell>
    </group>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() { },
  computed: {},
  components: {},
  data() {
    return {
      cellList: [
        { id: '1', name: '江莱清润糖', value: '商业' },
        { id: '2', name: '爱捷康（感冒药）(20粒)', value: '商业' },
        { id: '3', name: '红霉素眼膏(0.5%*2g)', value: '商业' },
        { id: '4', name: '清喉利咽颗粒(10g*10袋)', value: '商业' },
        { id: '1', name: '江莱清润糖', value: '商业' },
        { id: '2', name: '爱捷康（感冒药）(20粒)', value: '商业' },
        { id: '3', name: '红霉素眼膏(0.5%*2g)', value: '连锁' },
        { id: '4', name: '清喉利咽颗粒(10g*10袋)', value: '商业' },
        { id: '1', name: '江莱清润糖', value: '商业' },
        { id: '2', name: '爱捷康（感冒药）(20粒)', value: '门店' },
        { id: '3', name: '红霉素眼膏(0.5%*2g)', value: '商业' },
        { id: '4', name: '复方枣仁胶囊(0.4g*6粒)', value: '商业' },
        { id: '1', name: '江莱清润糖', value: '商业' },
        { id: '2', name: '爱捷康（感冒药）(20粒)', value: '商业' },
        { id: '3', name: '红霉素眼膏(0.5%*2g)', value: '商业' },
        { id: '4', name: '清喉利咽颗粒(10g*10袋)', value: '商业' },
        { id: '1', name: '江莱清润糖', value: '商业' },
        { id: '2', name: '爱捷康（感冒药）(20粒)', value: '商业' },
        { id: '3', name: '红霉素眼膏(0.5%*2g)', value: '连锁' },
        { id: '4', name: '清喉利咽颗粒(10g*10袋)', value: '商业' },
        { id: '1', name: '江莱清润糖', value: '商业' },
        { id: '2', name: '爱捷康（感冒药）(20粒)', value: '门店' },
        { id: '3', name: '红霉素眼膏(0.5%*2g)', value: '商业' },
        { id: '4', name: '复方枣仁胶囊(0.4g*6粒)', value: '商业' },
      ]
    };
  },
  methods: {
    // 点击指标查看详情
    CellClick(id) {
      console.log('id', id);
      this.$router.push(`/JobControl/FollowUpItem?id=${id}`);
    }
  },
};
</script>

<style scoped>
.common_name {
  color: #222222;
}
.client_type {
  color: #222222;
}
.cell_name {
  color: #666666;
}
.cell_type {
  color: #666666;
}
</style>
