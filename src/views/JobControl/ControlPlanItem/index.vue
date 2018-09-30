<!-- 客户规划三级 -->
<template>
  <div ref="conplanItem" class="scroller_rela">
    <group gutter='0' class="absolute_group">
      <cell title="客户名称" class="common_name" id="conplanitem">
        <div class="client_type">
          <div slot="value" class="client_stock">进货规划</div>
          <div slot="value" class="client_stock">销售规划</div>
        </div>
      </cell>
    </group>
    <scroller ref="controlPlanItem" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新' :on-refresh="refresh">
      <div class="control_plan_two">
        <group gutter='0'>
          <cell v-for="(item, index) in planList" :key="index" :title="item.clientName" class="plan_name">
            <div class="plan_type">
              <x-input title=" " label-width='0' placeholder='' v-show="modifier" slot="value" v-model='item.salePlan'
              type="tel" keyboard="number" :class="modifier ? 'client_stock' : 'client_stock_may'" :show-clear='false' text-align='right' :disabled='!modifier'>
              </x-input>
              <div v-show="!modifier" slot="value" class='client_stock_may'>{{item.salePlan}}</div>
              <x-input title=" " label-width='0' placeholder='' v-show="modifier" slot="value" v-model='item.stockPlan'
              type="tel" keyboard="number" :class="modifier ? 'client_stock' : 'client_stock_may'" :show-clear='false' text-align='right' :disabled='!modifier'>
              </x-input>
              <div v-show="!modifier" slot="value" class='client_stock_may'>{{item.stockPlan}}</div>
            </div>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import jobControl from '../../../api/jobControl';

export default {
  created() { },
  activated() {
    this.planList = [];
    this.updateState = true;
    if (this.modifier) {
      // this.page = 1;
      this.$refs.controlPlanItem.triggerPullToRefresh()
      // this.planList = this.planDate.result.listData;
      if (this.planList.length === 0) {
        this.noDataText = '暂无数据';
      }
    } else {
      this.$refs.controlPlanItem.triggerPullToRefresh()
    }
  },
  deactivated() {
    this.updateState = false;
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      const marginTop = document.querySelector('#conplanitem').clientHeight;
      that.$refs.controlPlanItem.$el.style.marginTop = `${marginTop}px`
      that.$refs.controlPlanItem.$el.style.height = `${that.$countHeight(['.vux-header', '#conplanitem'])}px`
    })
  },
  computed: {
    modifier() {
      return this.$store.getters.getModifier
    },
    dataStata() {
      return this.$store.getters.getDataState;
    },
    // 新增的客户规划
    planDate() {
      return this.$store.getters.getPlanDate
    }
  },
  watch: {
    modifier(newVal, oldVal) {
      if (!newVal && this.planList.length !== 0 && this.updateState) {
        this.updatePlan()
      }
    },
    dataStata() {
      this.$vux.loading.show({
        text: '更新中...'
      })
      const form = {
        clientType: this.$route.query.clientType,
        productId: this.$route.query.productId,
        year: this.$route.query.year,
      }
      if (this.$route.query.month !== '0') {
        form.month = this.$route.query.month
      }
      jobControl.listupdate(form).then((res) => {
        this.$vux.loading.hide()
        if (res.data.code === 0) {
          this.$refs.controlPlanItem.triggerPullToRefresh()
          this.$vux.toast.text('更新成功', 'middle');
        }
      })
    }
  },
  components: {},
  data() {
    return {
      page: 0,
      noDataText: '',
      // 规划列表
      planList: []
    };
  },
  methods: {
    // 更新客户计划
    updatePlan() {
      this.$vux.loading.show({
        text: '保存中...'
      })
      const formList = [];
      for (let i = 0; i < this.planList.length; i += 1) {
        formList.push({
          id: this.planList[i].id,
          stockPlan: Number(this.planList[i].stockPlan),
          salePlan: Number(this.planList[i].salePlan),
        })
      }
      jobControl.updateplan(formList).then((res) => {
        this.$vux.loading.hide()
        if (res.data.code === 0) {
          this.$vux.toast.text('保存成功', 'middle');
        }
      })
    },
    // 客户计划详情查询
    getThreeItem(callBack) {
      const form = {
        currentPage: this.page,
        clientType: this.$route.query.clientType,
        productId: this.$route.query.productId,
        year: this.$route.query.year,
      }
      if (this.$route.query.month !== '0') {
        form.month = this.$route.query.month
      }
      jobControl.threeitem(form).then((res) => {
        callBack(res.data);
      })
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getThreeItem((data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            if (data.result.listData.length !== 0) {
              self.planList = self.planList.concat(data.result.listData);
            }
            done(true)
            return
          }
          self.planList = self.planList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.getThreeItem((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.planList = data.result.listData;
        }
        done()
      })
    }
  },
};
</script>

<style scoped>
.common_name {
  font-weight: 600;
  color: #222222;
}
.plan_name {
  color: #959595;
}
.plan_type {
  width: 160px;
  display: flex;
  /*! autoprefixer: off */
  display: -webkit-flex;
  /* autoprefixer: on */
  padding-left: 15px;
  color: #959595;
}

.client_type {
  width: 160px;
  display: flex;
  /*! autoprefixer: off */
  display: -webkit-flex;
  /* autoprefixer: on */
  padding-left: 15px;
  color: #222222;
  font-weight: 600;
}
.client_market {
  width: 60px;
  text-align: right;
}
.client_stock_may {
  width: 100px;
  text-align: right;
  word-break: break-all;
  color: #666666 !important;
  padding-right: 5px !important;
}

.client_stock {
  width: 100px;
  text-align: right;
  padding-right: 0px !important;
}
</style>

<style>
.control_plan_two .weui-cell {
  /* padding-right: 10px; */
  color: #666666 !important;
}

.plan_type .weui-cell:before {
  border-top: 0;
}

.client_stock .weui-input {
  width: 90%;
  height: 32px;
  padding: 0 5px !important;
}
</style>
