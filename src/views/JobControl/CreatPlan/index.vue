<!-- 添加客户计划 -->
<template>
  <div class="creat_plan">
    <group gutter='0'>
      <cell title="规划类型:">
        <div slot="title" class="title_slot">
          <span>规划类型:</span>
          <div :class="`select_index ${selectIndex == 1? 'select_view' : ''}`" :style="`border: ${selectIndex == 2? '1' : '0'}px solid #ECECEC`" @click="indexClick(1)">年度指标</div>
          <div :class="`select_index ${selectIndex == 2? 'select_view' : ''}`" :style="`border: ${selectIndex == 1? '1' : '0'}px solid #ECECEC`" @click="indexClick(2)">月度指标</div>
        </div>
      </cell>
      <popup-picker title="年度规划:" :data="planlist" v-model="yearPlan" @on-change="val => selectChange(val, 1)"></popup-picker>
      <popup-picker title="选择品种:" :data="varlist1" v-model="selectVar1" @on-change="val => selectChange(val, 2)"></popup-picker>
      <popup-picker title="选择品种:" :data="varlist2" v-model="selectVar2" @on-change="val => selectChange(val, 3)"></popup-picker>
    </group>
    <!-- 提交操作 -->
    <div class="confirm_button">
      <x-button :show-loading="loginLoading" text="确定" @click.native="confirmClick"></x-button>
    </div>
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
      // 年度规划和品种选择
      planlist: [['2010年度规划', '2011年度规划', '2012年度规划', '2013年度规划', '2014年度规划', '2015年度规划', '2016年度规划']],
      varlist1: [['品种1', '品种2', '品种3', '品种4', '品种5', '品种6', '品种7']],
      varlist2: [['品种1', '品种2', '品种3', '品种4', '品种5', '品种6', '品种7']],
      // 当前选中的指标
      selectIndex: 1,
      loginLoading: false, // 确定按钮的loading
      planType: '', // 规划类型
      yearPlan: [], // 年度规划
      selectVar1: [], // 选择品种1
      selectVar2: [], // 选择品种2
    };
  },
  methods: {
    // 点击切换指标时候
    indexClick(index) {
      this.selectIndex = index
    },
    // 点击确定按钮的时候
    confirmClick() {
      console.log('点击了确定按钮');
    },
    // 选择触发
    selectChange(val, index) {
      console.log('on change', val, index)
    }
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
  padding: 2.5px 10px;
  margin-left: 25px;
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
