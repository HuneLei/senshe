<!-- 客户规划三级 -->
<template>
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
          <div slot="value" class="client_stock">{{item.stock}}</div>
          <div slot="value" class="client_market">{{item.market}}</div>
        </div>
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
      // 规划列表
      planList: [
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
        { name: '上海上虹大药房连锁有限公司', stock: '50000', market: '45000' },
      ]
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
  text-align: left;
}
.client_stock {
  width: 100px;
  text-align: left;
}
</style>

<style>
.control_plan_two .weui-cell {
  padding-right: 10px;
}
</style>
