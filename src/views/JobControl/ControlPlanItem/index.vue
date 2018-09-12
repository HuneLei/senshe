<!-- 客户规划三级 -->
<template>
  <scroller ref="controlPlanItem" :on-refresh="refresh" :on-infinite="infinite" noDataText='' refreshText='下拉刷新'>
    <div class="control_plan_two">
      <group gutter='0'>
        <cell title="客户名称" class="common_name">
          <div class="client_type">
            <div slot="value" class="client_stock">进货规划</div>
            <div slot="value" class="client_market">销售规划</div>
          </div>
        </cell>
        <cell v-for="(item, index) in planList" :key="index" :title="item.name" class="plan_name">
          <div class="plan_type">
            <x-input slot="value" v-model='item.stock' type='number' class="client_stock" :show-clear='false'></x-input>
            <x-input slot="value" v-model='item.market' type='number' class="client_stock" :show-clear='false'></x-input>
          </div>
        </cell>
      </group>
    </div>
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
      that.$refs.controlPlanItem.$el.style.marginTop = `${marginTop}px`
      that.$refs.controlPlanItem.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
  },
  computed: {
    modifier() {
      return this.$store.getters.getModifier
    }
  },
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      // 规划列表
      planList: [
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
      ]
    };
  },
  methods: {
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
  font-weight: 600;
  color: #222222;
}
.plan_name {
  color: #959595;
}
.plan_type {
  width: 160px;
  display: flex;
  padding-left: 15px;
  color: #959595;
}
.client_type {
  width: 160px;
  display: flex;
  padding-left: 15px;
  color: #222222;
  font-weight: 600;
}
.client_market {
  width: 60px;
  text-align: left;
}
.client_stock {
  width: 100px;
  text-align: left;
  padding-right: 0px !important
}
</style>

<style>
.control_plan_two .weui-cell {
  /* padding-right: 10px; */
}

.plan_type .weui-cell:before {
  border-top: 0;
}
</style>
