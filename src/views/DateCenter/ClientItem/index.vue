<!-- 客户详情 -->
<template>
  <div :style="`margin-top: ${winTop}px;`">
    <group gutter='0'>
      <cell title="名称：">
        <div slot="title">
          <span class="cell_title">名称：</span>
          <span class="cell_span">上海科泽(上海)医药有限公司</span>
        </div>
        <span slot="icon" class="iconfont icon-gongsimingcheng- icon_slot"></span>
      </cell>
      <cell>
        <div slot="title">
          <span class="cell_title">联系电话：</span>
          <span class="cell_span">18525896585</span>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxidianhua icon_slot"></span>
      </cell>
      <cell align-items="flex-start">
        <div slot="title">
          <span class="cell_title">详细地址：</span>
          <span class="cell_span">上海虹口区浦东大厦汶水东路918弄3号楼108室</span>
        </div>
        <span slot="icon" class="icon iconfont icon-dizhi icon_slot"></span>
      </cell>
    </group>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    this.winTop = document.querySelector('.vux-header').clientHeight;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 自动固定时距离顶部的距离
    };
  },
  methods: {},
};
</script>

<style scoped>
.icon_slot {
  margin-right: 5px;
  font-size: 15.5px;
}
.cell_title {
  width: 80px;
  display: inline-block;
}

.cell_span {
  width: 240px;
  color: #757575;
  display: inline-flex;
}
</style>
