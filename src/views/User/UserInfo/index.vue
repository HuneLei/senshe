<!-- 我的信息 -->
<template>
  <div class="message_group">
    <!-- 用户基本信息 -->
    <group gutter='0'>
      <cell v-for="(value, index) in userForm" :key="index" :title="value.name" :value="value.value"></cell>
    </group>
    <!-- 留言等信息 -->
    <group gutter='0.26rem'>
      <cell :title="value.name" is-link v-for="(value, index) in messageFrom" :key="index" @click.native="goRouter(value.path)">
        <div class="badge-value">
          <badge v-show="value.text" :text="value.text"></badge>
        </div>
      </cell>
    </group>
    <!-- 底部白底 -->
    <div class="white_div"></div>
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
      // 留言等信息
      messageFrom: {
        myMessage: {
          name: '我的留言',
          path: 'myMessage',
          text: '99'
        },
        myInformation: {
          name: '我的信息',
          path: 'myInformation',
          text: ''
        },
        editPassword: {
          name: '修改密码',
          path: 'editPassword',
          text: ''
        }
      },
      // 用户基本信息
      userForm: {
        loginName: {
          name: '登录名',
          value: '扒鸡来了'
        },
        realName: {
          name: '真实姓名',
          value: '扒鸡又来了'
        },
        phone: {
          name: '手机号',
          value: '18124525656'
        },
        company: {
          name: '所属分公司',
          value: '扒鸡来了大公司'
        },
        postType: {
          name: '岗位类型',
          value: '推广'
        },
        postName: {
          name: '岗位名称',
          value: '推广代表'
        },
      }
    };
  },
  methods: {
    // 点击router去向
    goRouter(name) {
      const pathname = name;
      console.log(`我要去的是${pathname}`);
    }
  },
};
</script>

<style scoped>
/* 底部白色div */
.white_div {
  height: 10px;
  background-color: #f8f8f8;
}
</style>

<style>
/* badge居中显示 */
.message_group .badge-value {
  display: flex;
}

/* 去掉cell组件的前后边框 */
.message_group .weui-cells:after {
  border-bottom: 0 solid #D9D9D9 !important;
}

.message_group .weui-cells:before {
  border-top: 0 solid #D9D9D9 !important;
}
</style>
