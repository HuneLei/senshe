<!-- 客户详情 -->
<template>
  <scroller ref="ClintItem" class="clint_item">
    <group gutter='0'>
      <cell title="名称：">
        <div slot="title">
          <span class="cell_title">名称：</span>
          <span class="cell_span">{{form.clientName}}</span>
        </div>
        <span slot="icon" class="iconfont icon-gongsimingcheng- icon_slot"></span>
      </cell>
      <cell v-show="index == 100 || index == 200">
        <div slot="title">
          <span class="cell_title">联系电话：</span>
          <a :href="`tel://${form.phone}`">
            <span class="cell_span cell_phone">{{form.phone}}</span>
          </a>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxidianhua icon_slot"></span>
      </cell>
      <cell v-show="index == 300">
        <div slot="title">
          <span class="cell_title">门店电话：</span>
          <a :href="`tel://${form.phone}`">
            <span class="cell_span cell_phone">{{form.phone}}</span>
          </a>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxidianhua icon_slot"></span>
      </cell>
      <cell align-items="flex-start">
        <div slot="title">
          <span class="cell_title">详细地址：</span>
          <span class="cell_span contentBox">{{form.address}}</span>
        </div>
        <span slot="icon" class="icon iconfont icon-dizhi icon_slot"></span>
      </cell>
      <cell align-items="flex-start" v-show="index == 200">
        <div slot="title">
          <span class="cell_title">采购部联系人：</span>
          <span class="cell_span">{{form.purchaseDept}}</span>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxiren icon_slot"></span>
      </cell>
      <cell align-items="flex-start" v-show="index == 200">
        <div slot="title">
          <span class="cell_title">采购部电话：</span>
          <a :href="`tel://${form.purchaseDeptPhone}`">
            <span class="cell_span cell_phone">{{form.purchaseDeptPhone}}</span>
          </a>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxidianhua icon_slot"></span>
      </cell>
      <cell align-items="flex-start" v-show="index == 200">
        <div slot="title">
          <span class="cell_title">运营部联系人：</span>
          <span class="cell_span">{{form.operationDept}}</span>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxiren icon_slot"></span>
      </cell>
      <cell align-items="flex-start" v-show="index == 200">
        <div slot="title">
          <span class="cell_title">运营部电话：</span>
          <a :href="`tel://${form.operationDeptPhone}`">
            <span class="cell_span cell_phone">{{form.operationDeptPhone}}</span>
          </a>
        </div>
        <span slot="icon" class="icon iconfont icon-lianxidianhua icon_slot"></span>
      </cell>
    </group>
  </scroller>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  activated() {
    this.index = this.$route.query.index
    this.form = {};
    this.clientId = this.$route.query.id;
    this.clientItem(this.$route.query.id);
  },
  mounted() {
    const that = this;
    // 屏幕高度设置
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight;
      // that.$refs.ClintItem.$el.style.marginTop = `${marginTop}px`
      that.$refs.ClintItem.$el.style.height = `${that.$countHeight(['.vux-header'])}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      index: 0, // 客户类型
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
  width: 110px;
  display: inline-block;
}

.cell_span {
  width: 210px;
  color: #757575;
  display: inline-flex;
  /*! autoprefixer: off */
  display: -webkit-inline-flex;
  /* autoprefixer: on */
}

.cell_phone {
  color: #07BC99;
}
</style>

<style>
.clint_item .weui-cell {
  align-items: baseline;
  /*! autoprefixer: off */
  -webkit-align-items: baseline;
  /* autoprefixer: on */
}
</style>

