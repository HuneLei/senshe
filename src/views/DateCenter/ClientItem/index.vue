<!-- 客户详情 -->
<template>
  <scroller ref="ClintItem">
    <group gutter='0'>
      <cell title="名称：">
        <div slot="title">
          <span class="cell_title">名称：</span>
          <span class="cell_span">{{form.clientName}}</span>
        </div>
        <span slot="icon" class="iconfont icon-gongsimingcheng- icon_slot"></span>
      </cell>
      <cell>
        <div slot="title">
          <span class="cell_title">联系电话：</span>
          <span class="cell_span">{{form.phone}}</span>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxidianhua icon_slot"></span>
      </cell>
      <cell align-items="flex-start">
        <div slot="title">
          <span class="cell_title">详细地址：</span>
          <span class="cell_span">{{form.address}}</span>
        </div>
        <span slot="icon" class="icon iconfont icon-dizhi icon_slot"></span>
      </cell>
    </group>
  </scroller>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  mounted() {
    const that = this;
    // 屏幕高度设置
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.ClintItem.$el.style.marginTop = `${marginTop}px`
      that.$refs.ClintItem.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
    this.clientId = this.$route.query.id;
    this.clientItem(this.$route.query.id);
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 自动固定时距离顶部的距离
      clientId: '', // 客户id
      form: {}, // 客户详情
    };
  },
  methods: {
    // 查询客户详情
    clientItem(id) {
      dateCenter.customeritem(id).then((res) => {
        const data = res.data;
        console.log('data', data)
        if (data.code === 0) {
          this.form = data.result
        }
      });
    }
  },
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
