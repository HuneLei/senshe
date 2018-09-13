<!-- 客户规划三级 -->
<template>
  <scroller ref="controlPlanItem">
    <div class="control_plan_two">
      <group gutter='0'>
        <cell title="客户名称" class="common_name">
          <div class="client_type">
            <div slot="value" class="client_stock">进货规划</div>
            <div slot="value" class="client_stock">销售规划</div>
          </div>
        </cell>
        <cell v-for="(item, index) in planList" :key="index" :title="item.clientName" class="plan_name">
          <div class="plan_type">
            <x-input v-show="modifier"  slot="value" v-model='item.salePlan' type='number'
            :class="modifier ? 'client_stock' : 'client_stock_may'"
            :show-clear='false' text-align='right' :disabled='!modifier'></x-input>
            <div v-show="!modifier" slot="value" class='client_stock_may'>{{item.salePlan}}</div>
            <x-input v-show="modifier" slot="value" v-model='item.stockPlan' type='number'
            :class="modifier ? 'client_stock' : 'client_stock_may'" :show-clear='false' text-align='right' :disabled='!modifier'></x-input>
            <div v-show="!modifier" slot="value" class='client_stock_may'>{{item.stockPlan}}</div>
          </div>
        </cell>
      </group>
    </div>
  </scroller>
</template>

<script>

export default {
  created() { },
  activated() {
    if (this.modifier) {
      this.page = 1;
      this.planList = this.planDate.result.listData;
    } else {
      this.planList = [];
      console.log(1111111111)
    }
  },
  mounted() {
    const that = this;
    this.page = 0;
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.controlPlanItem.$el.style.marginTop = `${marginTop}px`
      that.$refs.controlPlanItem.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
  },
  computed: {
    modifier() {
      return this.$store.getters.getModifier
    },
    // 新增的客户规划
    planDate() {
      return this.$store.getters.getPlanDate
    }
  },
  components: {},
  data() {
    return {
      page: 0,
      // 规划列表
      planList: []
    };
  },
  methods: {},
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
  text-align: right;
}
.client_stock_may {
  width: 100px;
  text-align: right;
  word-break: break-all;
  padding-right: 5px !important;
}

.client_stock {
  width: 100px;
  text-align: right;
  padding-right: 0px !important;
}
</style>

<style>
.control_plan_two .weui-cell {
  /* padding-right: 10px; */
}

.plan_type .weui-cell:before {
  border-top: 0;
}

.client_stock .weui-input {
  padding: 0 5px !important;
}
</style>
