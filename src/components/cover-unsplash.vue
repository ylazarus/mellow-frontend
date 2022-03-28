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
      <button @click="setFullCover(true)">Full Cover</button>
      <button @click="setFullCover(false)">Top Cover</button>
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
    <hr />
    <p>Photos from Unsplash</p>
    <input
      type="text"
      placeholder="Search Unsplash for photos"
      v-model="search"
      @input="waitSearch"
    />
    <div class="select-solid-bgc-container">
      <ul class="list-unstyled">
        <li v-for="photo in photos" :key="photo.id">
          <img
            class="image-list"
            height="200"
            width="200"
            :src="photo.urls.thumb"
            alt="img"
            @click="applyPhoto(photo)"
          />
        </li>
      </ul>
    </div>
  </section>
</template>


<script>
import { getCurrentInstance, onMounted } from "vue";
import axios from "axios";
import _ from "lodash";

export default {
  name: "cover-unsplash",
  props: {
    style: Object,
  },
  data() {
    return {
      currStyle: { bgClr: "", bgImg: "", isFullCover: false },
      photos: [],
      search: "nature",
      count: 12,
      photo_url: null,
      download_url: null,
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
    this.currStyle = JSON.parse(JSON.stringify(this.style));
    this.searchPhoto()

    // var count = 6;
    //   var orientation = "landscape";
    //     var query = "project management"
    // const randomImgs = await this.$unsplash.random(count, orientation)
    // console.log(randomImgs.urls);
  },

  // setup(props, context) {
  //   const instance = getCurrentInstance();
  //   const globalProperties = instance.appContext.config.globalProperties;

  //   onMounted(async () => {

  //     var randomImgs = await globalProperties.$unsplash.photos.random;

  //     var urls = randomImgs.urls || [];
  //     // var links = randomImgs.links || [];
  //     // var user = randomImgs.user || {};
  //     console.log(urls);
  //     this.imgsToRender = urls;
  //   });
  // },

  methods: {
    // getPhoto(searchTerm) {
    //   // get the app id using the global variable of unsplash
    //   // let appid = this.$unsplash._applicationId;
    //   //this.$axios.get(`https://api.unsplash.com/photos?client_id=${appid}`)
    //   const accessKey = "Y2X6Y_wdMpqvaYX_4jgO-dOBqVAsQMQpihsIFNOAX5E";
    //   axios
    //     .get(
    //       `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${searchTerm}&client_id=${accessKey}`
    //     )
    //     .then((response) => {
    //       // JSON responses are automatically parsed.
    //       this.photos = response.data.results;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    searchPhoto() {
      let query = this.search;
      let count = this.count
      const accessKey = "Y2X6Y_wdMpqvaYX_4jgO-dOBqVAsQMQpihsIFNOAX5E";

      axios
        .get(
          `https://api.unsplash.com/search/photos?page=1&per_page=${count}&query=${query}&client_id=${accessKey}`
        )
        .then((response) => {
          // JSON responses are automatically parsed.
          this.photos = response.data.results;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // getRandom(){
    //   this.$axios.get('https://source.unsplash.com/random')
    //   .then(response =>{
    //   })
    // },
    applyPhoto(photo) {
      this.currStyle.bgImg = photo.urls.regular;
      this.currStyle.bgClr = "";
      this.$emit("addStyle", this.currStyle);
    },
    waitSearch: _.debounce(function () {
      this.searchPhoto();
    }, 1000),

    selectBgClr(bgClr) {
      this.currStyle.bgClr = bgClr;
      this.currStyle.bgImg = "";
      this.$emit("addStyle", this.currStyle);
    },
    closeCmp() {
      this.$emit("closeCmp");
    },
    setFullCover(val) {
      this.currStyle.isFullCover = val;
      this.$emit("addStyle", this.currStyle);
    },
  },
};
</script>

<style>
</style>