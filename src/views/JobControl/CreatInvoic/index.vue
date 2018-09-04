<!-- 进销存录入 -->
<template>
  <scroller :style="`margin-top: ${winTop}px;`" v-model="winTop">
    <group gutter='0'>
      <datetime v-model="dataValue" @on-change="changeValue" title="日期:" clear-text="清除" @on-clear="clearValue" @on-confirm="onConfirm"></datetime>
      <x-input title='进货:' v-model="stockValue" text-align='left' type='number'></x-input>
      <x-input title='销售:' v-model="marketValue" text-align='left' type='number'></x-input>
      <x-input title='库存:' v-model="repertoryValue" text-align='right' type='number'></x-input>
      <cell v-model="listValue" text-align='right'>
        <div slot="title" class="update_img">
          <span class="update_img_span">陈列:</span>
          <div class="img_show">
            <div class="img_show_no" style="box-shadow: 1px 0px 1px #ccc; border: 1px solid #eaeaea; border-radius: 10px;">
              <span class="iconfont icon-zhaopian1"></span>
              <span class="img_show_font" @click="galleryImgsSelected()">上传照片</span>
            </div>
            <div class="img_show_view" v-for="(item, index) in imgList" :key="index">
              <img class="previewer-demo-img" :src="item.src" alt="" style="box-shadow: 1px 0px 1px #ccc; border-radius: 10px;" @click="showImg(index)">
              <span class="img_span_show iconfont icon-jianshao"></span>
            </div>
            <div v-transfer-dom>
              <previewer :list="imgList" ref="previewer" @on-index-change="logIndexChange" :options="options"></previewer>
            </div>
          </div>
        </div>
      </cell>
    </group>
    <!-- 提交操作 -->
    <div class="confirm_button">
      <x-button :show-loading="loginLoading" text="确定" @click.native="confirmClick"></x-button>
    </div>
  </scroller>
</template>

<script>

export default {
  created() { },
  mounted() {
    // 导航栏高度
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      imgList: [{
        src: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        msrc: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        w: 800,
        h: 400
      }, {
        src: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        msrc: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
        w: 800,
        h: 400
      }],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          const thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
          // get window scroll Y
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          const rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },
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
      window.mobileNative.getGeocode();
    },
    // 预览图片
    showImg(index) {
      this.$refs.previewer.show(index)
    },
    logIndexChange(arg) {
      console.log(arg)
    },
    // 从相册中选择图片
    galleryImgsSelected() {
      window.mobileNative.galleryImgsSelected()
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
/* 陈列图片上传 */
.update_img {
  display: flex;
}

.img_show div img {
  width: 62px;
  height: 62px;
  margin: 6px 0 5px 14px;
}
.img_show {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.img_show_no {
  width: 62px;
  height: 62px;
  margin: 6px 0 5px 14px;
  text-align: center;
  background-color: #f8f8f8;
}
.img_show_view {
  position: relative;
}
.img_show_no span {
  font-size: 25px;
  color: #cccccc;
  display: block;
  margin-top: 3px;
}
.img_show_no .img_show_font {
  font-size: 11px;
  display: block;
  margin-top: -8px;
}
.update_img_span {
  margin-right: 6px;
}
.img_span_show {
  position: absolute;
  top: -1px;
  right: -4px;
  color: red;
  font-size: 19px;
  background-color: #ffffff;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  line-height: 15px;
}
</style>
