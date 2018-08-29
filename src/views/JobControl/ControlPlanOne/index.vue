<!-- 客户规划三级 -->
<template>
  <div>
    <group gutter='0'>
      <cell title="通用名" class="common_name">
        <span slot="value" class="client_type">客户类型</span>
      </cell>
      <cell class="cell_name" is-link v-for="(item, index) in cellList" :key="index" :title="item.name">
        <span slot="value" class="cell_type">{{item.value}}</span>
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
        { name: '强力枇杷膏', value: '商业' },
        { name: '强力枇杷膏', value: '商业' },
        { name: '强力枇杷膏', value: '商业' },
        { name: '强力枇杷膏', value: '商业' },
      ]
    };
  },
  methods: {},
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

