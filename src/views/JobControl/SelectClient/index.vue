<!-- 选择客户 -->
<template>
  <div class="scroller_rela">
    <search ref="clientClassItem" :auto-fixed='false' placeholder="输入客户名进行搜索" v-model="searchValue"
    class="search_view" id="clientSearchView" @on-submit="onSubmit" @on-cancel="onCancel"></search>
    <scroller style="background-color: #ffffff;" ref="selectclientscroller">
      <div class="search-box">
        <div class="left" id="left">
          <div class="left-top" id="current">
            <p>当前</p>
            <div class="current">
              <span>{{clientData.name}}</span>
            </div>
          </div>
          <!-- 市 -->
          <div v-for="(items, index) in cityList" :key="index">
            <p class="title" :id="items.title">{{items.title}}</p>
            <p class="label" v-for="(item, i) in items.list" :key="i" @click="selectCity(item)">{{item.name}}</p>
          </div>
          <div style="height: 20px"></div>
        </div>
      </div>
      <div>
      </div>
    </scroller>
    <!-- 快捷跳转 -->
    <ul class="right" ref="selectclientul">
      <li @click="toArea('current')">当前</li>
      <li v-for="(item, i) in letter" :key="i" @click="toArea(item)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import jobControl from '../../../api/jobControl';

export default {
  activated() {
    this.clientList()
  },
  created() { },
  mounted() {
    this.init();
    // 导航栏高度
    const that = this;
    this.$nextTick(() => {
      const Top = document.querySelector('.vux-header').clientHeight;
      const SearchTop = document.querySelector('#clientSearchView').clientHeight;
      // const SearchTop = 0
      that.$refs.selectclientul.style.top = `${SearchTop}px`;
      that.$refs.selectclientscroller.$el.style.top = `${SearchTop}px`;
      that.$refs.selectclientscroller.$el.style.height = `${that.$countHeight(['.vux-header', '#clientSearchView'])}px`;
      that.$refs.selectclientul.style.height = `${that.$countHeight(['.vux-header', '#clientSearchView'])}px`
      // that.$refs.selectclientscroller.$el.style.height = `${that.$countHeight(['.vux-header'])}px`;
      // that.$refs.selectclientul.style.height = `${that.$countHeight(['.vux-header'])}px`
    })
  },
  computed: {
    clientData() {
      return this.$store.getters.getDataClient
    },
  },
  components: {},
  data() {
    return {
      searchValue: '', // 搜索的值
      letter: [],
      cityList: [],
      client: '', // 客户类型
    };
  },
  methods: {
    // 搜索的时候触发
    onSubmit() {
      this.cityList = [];
      this.getCustomList((data) => {
        const arr = [];
        const arrlist = [];
        for (let i = 0; i < this.letter.length; i += 1) {
          const a = {
            title: this.letter[i],
            list: [],
          };
          for (let j = 0; j < data.length; j += 1) {
            const upperPy = window.upperPy.makePy(data[j].name)[0].charAt(0)
            if (upperPy === this.letter[i]) {
              a.list.push(data[j]);
            }
          }
          if (a.list.length) {
            arrlist.push(a)
          }
          arr.push(a);
        }
        this.cityList = arrlist;
      })
    },
    // 点击取消的时候触发
    onCancel() {
      this.cityList = [];
      this.searchValue = '';
      this.getCustomList((data) => {
        const arr = [];
        const arrlist = [];
        for (let i = 0; i < this.letter.length; i += 1) {
          const a = {
            title: this.letter[i],
            list: [],
          };
          for (let j = 0; j < data.length; j += 1) {
            const upperPy = window.upperPy.makePy(data[j].name)[0].charAt(0)
            if (upperPy === this.letter[i]) {
              a.list.push(data[j]);
            }
          }
          if (a.list.length) {
            arrlist.push(a)
          }
          arr.push(a);
        }
        this.cityList = arrlist;
      })
    },
    // 初始配置
    init() {
      // 26个字母
      this.letter = [];
      for (let i = 65; i < 91; i += 1) {
        this.letter.push(String.fromCharCode(i));
      }
    },
    // 获取客户列表下拉
    getCustomList(callBack) {
      jobControl.customerlist(this.$route.query.client, this.searchValue).then((res) => {
        callBack(res.data);
      })
    },
    // 客户列表
    clientList() {
      this.cityList = [];
      this.getCustomList((data) => {
        const arr = [];
        const arrlist = [];
        for (let i = 0; i < this.letter.length; i += 1) {
          const a = {
            title: this.letter[i],
            list: [],
          };
          for (let j = 0; j < data.length; j += 1) {
            const upperPy = window.upperPy.makePy(data[j].name)[0].charAt(0)
            if (upperPy === this.letter[i]) {
              a.list.push(data[j]);
            }
          }
          if (a.list.length) {
            arrlist.push(a)
          }
          arr.push(a);
        }
        this.cityList = arrlist;
      })
    },
    // 客户选择
    selectCity(item) {
      this.$router.back();
      this.$store.commit('updateDatacliente', item)
    },
    // 滑到某个位置
    toArea(item) {
      if (document.getElementById(item)) {
        const offsetTop = document.getElementById(item).offsetTop
        this.$refs.selectclientscroller.scrollTo(0, offsetTop, true)
      }
      if (item !== 'search-input' && item !== 'current' && item !== 'history' && item !== 'hot') {
        this.$vux.toast.text(item, 'middle');
      }
    },
  },
};
</script>

<style scoped>
</style>

<style scoped>
.search_view {
  z-index: 100;
  font-size: 15px;
  position: absolute !important;
}
.title {
  padding: 5px 10px;
  color: #999999;
  background-color: #f8f8f8;
}

.label {
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #f5f7fa;
  font-size: 14px;
}

.left {
  width: 345px;
}

.left-top {
  background-color: white;
  padding: 12px;
}

.current {
  padding: 6px 0;
  color: #999999;
  font-size: 15px;
}

.right {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  background-color: white;
  text-align: center;
  font-size: 14px;
  color: #07bc99;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-flex-flow: wrap column;
  -webkit-justify-content: space-around;
  /* autoprefixer: on */
  display: flex;
  flex-flow: wrap column;
  justify-content: space-around;
}

/* .label:hover {
  background-color: #d7dddc;
} */
</style>
