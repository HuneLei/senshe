<!-- 进销存录入 -->
<template>
  <div>
    <group gutter='0'>
      <datetime v-model="dataValue" @on-change="changeValue" title="日期:" clear-text="清除" @on-clear="clearValue" @on-confirm="onConfirm"></datetime>
      <x-input title='进货:' v-model="stockValue" text-align='right'></x-input>
      <x-input title='销售:' v-model="marketValue" text-align='right'></x-input>
      <x-input title='库存:' v-model="repertoryValue" text-align='right'></x-input>
      <x-input title='陈列:' v-model="listValue" text-align='right'></x-input>
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
      // 日期
      dataValue: '',
      stockValue: '', // 进货
      marketValue: '', // 销售
      repertoryValue: '', // 库存
      listValue: '', // 陈列
      loginLoading: false // 确定loading
    };
  },
  methods: {
    clearValue(value) {
      this.dataValue = ''
    },
    changeValue(value) {
      console.log('change', value)
    },
    onConfirm(val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.value1)
    },
    // 确定提交按钮
    confirmClick() {
      console.log('确定');
    }
  },
};
</script>

<style scoped>
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
