<!-- 客户规划三级 -->
<template>
  <scroller ref="controlPlanList" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
    <group gutter='0'>
      <cell title="通用名" class="common_name">
        <span class="client_type">客户类型</span>
      </cell>
      <cell class="cell_name" is-link v-for="(item, index) in cellList" :key="index" :title="item.name" @click.native="CellClick(item.id)">
        <span class="cell_type">{{item.value}}</span>
      </cell>
    </group>
  </scroller>
</template>

<script>

export default {
  created() { },
  mounted() {
    const that = this;
    that.page = 0;
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.controlPlanList.$el.style.marginTop = `${marginTop}px`
      that.$refs.controlPlanList.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      noDataText: '',
      cellList: [
        { id: '1', name: '强力枇杷膏', value: '商业' },
        { id: '2', name: '强力枇杷膏', value: '商业' },
        { id: '3', name: '强力枇杷膏', value: '商业' },
        { id: '4', name: '强力枇杷膏', value: '商业' },
        { id: '1', name: '强力枇杷膏', value: '商业' },
        { id: '2', name: '强力枇杷膏', value: '商业' },
        { id: '3', name: '强力枇杷膏', value: '商业' },
        { id: '4', name: '强力枇杷膏', value: '商业' },
        { id: '1', name: '强力枇杷膏', value: '商业' },
        { id: '2', name: '强力枇杷膏', value: '商业' },
        { id: '3', name: '强力枇杷膏', value: '商业' },
        { id: '4', name: '强力枇杷膏', value: '商业' },
        { id: '1', name: '强力枇杷膏', value: '商业' },
        { id: '2', name: '强力枇杷膏', value: '商业' },
        { id: '3', name: '强力枇杷膏', value: '商业' },
        { id: '4', name: '强力枇杷膏', value: '商业' },
        { id: '1', name: '强力枇杷膏', value: '商业' },
        { id: '2', name: '强力枇杷膏', value: '商业' },
        { id: '3', name: '强力枇杷膏', value: '商业' },
        { id: '4', name: '强力枇杷膏', value: '商业' },
        { id: '1', name: '强力枇杷膏', value: '商业' },
        { id: '2', name: '强力枇杷膏', value: '商业' },
        { id: '3', name: '强力枇杷膏', value: '商业' },
        { id: '4', name: '强力枇杷膏', value: '商业' },
        { id: '1', name: '强力枇杷膏', value: '商业' },
        { id: '2', name: '强力枇杷膏', value: '商业' },
        { id: '3', name: '强力枇杷膏', value: '商业' },
        { id: '4', name: '强力枇杷膏', value: '商业' },
      ]
    };
  },
  methods: {
    // 点击指标查看详情
    CellClick(id) {
      console.log('id', id);
      this.$router.push(`/JobControl/ControlPlanItem?id=${id}`);
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      console.log('done', done);
      done(true)
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      console.log('done', done);
      done(true)
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

