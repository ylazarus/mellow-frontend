<template>
  <section class="cmp-preview cover-unsplash-preview">
      <div class="cmp-header">

      
    <p class="cmp-container-title">Cover</p>
      <a class="close-cmp-btn" @click="closeCmp">
        <span></span>
      </a>
      </div>
    <hr />
    <p>Size</p>
    <div class="cover-size-select">
      <div @click="selectCoverSize('full')"></div>
      <div @click="selectCoverSize('top')"></div>
    </div>
    <p>Color</p>
    <div class="select-solid-bgc-container">
      <div
        v-for="bgc in bgColors"
        :key="bgc.id"
        class="bgc-option flex pointer"
        :style="{ backgroundColor: bgc.color }"
        @click.stop="selectBg(bgc.color)"
      ></div>
    </div>
  </section>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";

export default {
  name: "cover-unsplash",
  props: {
    bg: Object,
  },
  data() {
    return {
      currStyle: {},
      bgColors: [
        { id: "l101", color: "#61bd4f", isSelected: false },
        { id: "l102", color: "#f2d600", isSelected: false },
        { id: "l103", color: "#ff9f1a", isSelected: false },
        { id: "l104", color: "#eb5a46", isSelected: false },
        { id: "l105", color: "#c377e0", isSelected: false },
        { id: "l106", color: "#0079bf", isSelected: false },
        { id: "l107", color: "#00c2e0", isSelected: false },
        { id: "l108", color: "#51e898", isSelected: false },
        { id: "l109", color: "#ff78cb", isSelected: false },
        { id: "l110", color: "#344563", isSelected: false },
      ],
    };
  },
  created() {
    this.currStyle = this?.bg || {};
    if (!this.currStyle.coverSize) this.currStyle.coverSize = "top";
  },

  setup(props, context) {
    const instance = getCurrentInstance();
    const globalProperties = instance.appContext.config.globalProperties;

    onMounted(async () => {
      var image = await globalProperties.$unsplash.getPhoto("l3N9Q27zULw");
      var urls = image.urls || [];
      var links = image.links || [];
      var user = image.user || {};
    });
  },
  methods: {
    selectBg(bgColor) {
      this.currStyle.bgColor = bgColor;
      this.$emit("addBg", this.currStyle);
    },
    closeCmp() {
      this.$emit("closeCmp");
    },
    selectCoverSize(size) {
      this.currStyle.coverSize = size;
    },
  },
};
</script>

<style>
</style>