<!-- 顶部导航组件 -->
<template>
  <div>
    <x-header @on-click-back="clickBack" :left-options="{backText: '', preventGoBack: isBack}" :title="header_name">
      <span slot="right" v-for="(item, index) in slotRight" :key="index" :class="`icon ${item.icon}`" @click="rightClick(item.name)"></span>
    </x-header>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 右边图标样式组
    slotRight: {
      type: Array,
      default: () => [{ icon: '', name: '' }]
    },
    // 导航标题
    header_name: {
      type: String,
      default: '',
    },
    // 是否禁止点击返回按钮
    isBack: {
      type: Boolean,
      default: true,
    }
  },
  created() { },
  mounted() { },
  data() {
    return {};
  },
  methods: {
    // 点击返回按钮时候触发
    clickBack() {
      console.log('我在点击返回')
    },
    // 点击右侧按钮时候触发
    rightClick(e) {
      console.log('我点击了右侧按钮', e)
      this.$emit('right-click', e);
    }
  }
};
</script>

<style scoped>
</style>

