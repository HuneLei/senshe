<!-- 添加客户计划 -->
<template>
  <scroller class="creat_plan" ref="creatplan">
    <group gutter='0'>
      <cell title="规划类型:">
        <div slot="title" class="title_slot">
          <span>规划类型：</span>
          <div :class="`select_index ${selectIndex == 1? 'select_view' : ''}`" :style="`border: ${selectIndex == 2? '1' : '0'}px solid #ECECEC`" @click="indexClick(1)">年度指标</div>
          <div :class="`select_index ${selectIndex == 2? 'select_view' : ''}`" :style="`border: ${selectIndex == 1? '1' : '0'}px solid #ECECEC`" @click="indexClick(2)">月度指标</div>
        </div>
      </cell>
      <popup-picker v-show="yearShow" title="年度规划：" :data="planlist" v-model="yearPlan" @on-change="val => selectChange(val, 1)" show-name></popup-picker>
      <popup-picker v-show="!yearShow" title="月度规划：" :data="monthlist" v-model="monthPlan" @on-change="val => selectChange(val, 1)" show-name></popup-picker>
      <popup-picker title="选择品种：" :data="productlist" v-model="productVar" @on-change="val => selectChange(val, 3)" show-name @on-show="showProduct()"></popup-picker>
      <popup-picker title="选择客户类型：" :data="clientType" v-model="clientVar" @on-change="val => selectChange(val, 2)" show-name></popup-picker>
    </group>
    <!-- 提交操作 -->
    <div class="confirm_button">
      <x-button :show-loading="loginLoading" text="确定" @click.native="confirmClick"></x-button>
    </div>
  </scroller>
</template>

<script>
import jobControl from '../../../api/jobControl';
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  activated() {
    this.yearShow = true;
  },
  watch: {
    $route(to, form) {
      if (to.path === '/JobControl/CreatPlan' && form.path === '/JobControl/ControlPlan') {
        this.selectIndex = 1;
        this.yearPlan = [];
        this.monthPlan = [];
        this.productVar = [];
        this.clientVar = [];
      }
    }
  },
  mounted() {
    // 导航栏高度
    const that = this;
    this.$nextTick(() => {
      that.$refs.creatplan.$el.style.height = `${that.$countHeight(['.vux-header'])}px`
    })
    const myDate = new Date(); // 获取系统当前时间
    const nowYear = myDate.getFullYear() + 1; // 当前年份
    const nowMonth = myDate.getMonth(); // 当前月份
    this.indexYearList = [];
    this.indexMonthList = [];
    // 获取最近三年列表
    const yearList = [];
    const yearmonthList = [];
    for (let i = 0; i < 3; i += 1) {
      const yearObj = {
        name: `${nowYear - i}年度规划`,
        value: `${nowYear - i}`
      };
      const year = {
        name: `${nowYear - i}年`,
        value: `${nowYear - i}`
      };
      yearList.push(yearObj);
      yearmonthList.push(year)
    }
    this.planlist.push(yearList);
    // 获取最近三年月度计划列表
    const monthlist = [];
    for (let i = 1; i < 13; i += 1) {
      const yearObj = {
        name: `${i}月`,
        value: `${i}`
      };
      monthlist.push(yearObj);
    }
    this.monthlist.push(yearmonthList, monthlist);
    // 品种列表
    this.getListAll((data) => {
      for (let i = 0; i < data.length; i += 1) {
        data[i].value = data[i].id
      }
      this.productlist.push(data)
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      // 新增参数
      from: {},
      yearShow: true,
      // 年度规划和品种选择
      planlist: [],
      monthlist: [],
      productlist: [],
      clientType: [[{
        name: '一级商',
        value: '100',
      }, {
        name: '二级商',
        value: '200',
      }, {
        name: '终端门店',
        value: '300',
      }]],
      // 当前选中的指标
      selectIndex: 1,
      loginLoading: false, // 确定按钮的loading
      yearPlan: [], // 年度规划
      monthPlan: [], // 月度规划
      productVar: [], // 选择品种
      clientVar: [], // 客户类型
    };
  },
  methods: {
    // 选择品种框的时候刷新
    showProduct() {
      // 品种列表
      this.getListAll((data) => {
        this.productlist = [];
        for (let i = 0; i < data.length; i += 1) {
          data[i].value = data[i].id
        }
        this.productlist.push(data)
      })
    },
    // 添加客户计划
    addCreatPlan() {
      this.$vux.loading.show({
        text: '添加中...'
      })
      this.from = {
        currentPage: 1,
        year: this.yearPlan[0],
        productId: this.productVar[0],
        clientType: this.clientVar[0],
      }
      if (this.selectIndex === 2) {
        this.from.year = this.monthPlan[0];
        this.from.month = this.monthPlan[1];
      }
      jobControl.add(this.from).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 0) {
          this.$store.commit('updatePlanDate', res.data)
          let clientType = 0;
          let productId = 0;
          if (res.data.result.listData.length) {
            clientType = res.data.result.listData[0].clientType;
            productId = res.data.result.listData[0].productId;
          }
          this.$vux.loading.hide()
          this.$router.push(`/JobControl/ControlPlanItem?clientType=${clientType}&productId=${productId}&year=${this.from.year}&month=${this.from.month || 0}`);
        }
      })
    },
    // 点击切换指标时候
    indexClick(index) {
      this.yearShow = index === 1;
      this.selectIndex = index;
    },
    // 点击确定按钮的时候
    confirmClick() {
      console.log(this.yearPlan, this.monthPlan, this.productVar, this.clientVar)
      if (this.yearPlan.length === 0 && this.selectIndex === 1) {
        this.$vux.toast.text('请选择年度规划', 'middle');
        return;
      }
      if (this.monthPlan.length === 0 && this.selectIndex === 2) {
        this.$vux.toast.text('请选择月度规划', 'middle');
        return;
      }
      if (this.productVar.length === 0) {
        this.$vux.toast.text('请选择品种', 'middle');
        return;
      }
      if (this.clientVar.length === 0) {
        this.$vux.toast.text('请选择客户类型', 'middle');
        return;
      }
      this.addCreatPlan();
      console.log('点击了确定按钮');
    },
    // 选择触发
    selectChange(val, index) {
      console.log('on change', val, index)
    },
    // 获取商品下拉
    getListAll(callBack) {
      dateCenter.productlistall().then((res) => {
        const data = res.data;
        callBack(data)
      })
    },
  },
};
</script>

<style scoped>
.vux-label .title_slot {
  display: flex;
  align-items: center;
}
.select_view {
  color: #ffffff !important;
  background-color: #07bc99 !important;
}

/* 单选样式 */
.select_index {
  width: 80px;
  text-align: center;
  padding: 2.5px 5px;
  margin-left: 40px;
  border-radius: 50px;
  color: #868686;
  border: 1px solid #ececec;
  background-color: #f8f8f8;
}

/* 确定按钮 */
.confirm_button {
  padding-top: 15px;
  background-color: #ffffff;
}

.confirm_button .weui-btn {
  width: 350px;
  line-height: 38px;
  font-size: 15px;
}
</style>
