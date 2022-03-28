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
      <div @click="setFullCover(true)">Select Bottom</div>
      <div @click="setFullCover(false)">Select Top</div>
    </div>
    <p>Color</p>
    <div class="select-solid-bgc-container">
      <div
        v-for="bgc in bgColors"
        :key="bgc.id"
        class="bgc-option flex pointer"
        :style="{ backgroundColor: bgc.color }"
        @click="selectBgClr(bgc.color)"
      ></div>
    </div>
  </section>
</template>


<script>
import { getCurrentInstance, onMounted } from "vue";

export default {
  name: "cover-unsplash",
  props: {
    style: Object,
  },
  data() {
    return {
      currStyle:  {"bgClr": '', "bgImg": '', "isFullCover": false},
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
    this.currStyle = JSON.parse(JSON.stringify(this.style)) 
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
    selectBgClr(bgClr) {
      this.currStyle.bgClr = bgClr;
      this.$emit("addStyle", this.currStyle);
    },
    closeCmp() {
      this.$emit("closeCmp");
    },
    setFullCover(val) {
      this.currStyle.isFullCover = val;
    },
  },
};
</script>

<style>
</style>