<template>
  <section class="cmp-preview cover-unsplash-preview">
    <div class="cmp-header">
      <a
        class="back-to-cmp-btn"
        v-if="searchingUnsplash"
        @click="(searchingUnsplash = false), (searchResults = false)"
      >
        <span></span>
      </a>
      <p class="cmp-container-title">{{ pageTitle }}</p>
      <a class="close-cmp-btn" @click="closeCmp">
        <span></span>
      </a>
    </div>
    <hr />

    <section v-if="!searchingUnsplash" class="main-cover-screen">
      <p>Size</p>
      <div class="cover-size-select">
        <button @click="setFullCover(true)">Full Cover</button>
        <button @click="setFullCover(false)">Top Cover</button>
      </div>

      <list-slot>
        <template v-slot:title>Color</template>
        <template v-slot:list>
          <div
            v-for="bgc in bgColors"
            :key="bgc.id"
            class="label-option flex pointer"
            :style="{ backgroundColor: bgc.color }"
            @click="selectBgClr(bgc.color)"
          ></div> </template
      ></list-slot>

      <!-- <ul class="img-options-list clean-list">
        
      </ul> -->

      <section>
        <list-slot>
          <template v-slot:title>Attachments</template>
          <template v-slot:list>
            <img
              v-for="(photo, idx) in attachments.slice(0, 6)"
              :key="idx"
              class="unsplash-result-small"
              :src="photo"
              alt="img"
              @click="applyPhoto(photo)"
            />
          </template>
        </list-slot>

        <label>
          <input type="file" @change="onAttachImg" hidden />
          <div class="unsplash-btn full-width-btn">Upload a cover image</div>
        </label>
        <!-- <div>LOADING...</div> -->
      </section>

      <list-slot>
        <template v-slot:title>Photos from Unsplash</template>
        <template v-slot:list>
          <img
            v-for="photo in photos.slice(0, 6)"
            :key="photo.id"
            class="unsplash-result-small"
            :src="photo.urls.thumb"
            alt="img"
            @click="applyPhoto(photo)"
          />
        </template>
      </list-slot>

      <button
        class="unsplash-btn full-width-btn"
        @click="searchingUnsplash = true"
      >
        Search for photos
      </button>
    </section>

    <section
      v-if="searchingUnsplash && !searchResults"
      class="search-unsplash-screen"
    >
      <input
        type="text"
        placeholder="Search Unsplash for photos"
        v-model="search"
        @input="waitSearch"
      />

      <list-slot>
        <template v-slot:title>Suggested searches</template>
        <template v-slot:list>
          <button
            class="unsplash-btn"
            v-for="(term, idx) in searchTerms"
            :key="idx"
            @click="searchPhoto(term)"
          >
            {{ term }}
          </button>
        </template></list-slot
      >

      <list-slot>
        <template v-slot:title>Top photos</template>
        <template v-slot:list>
          <img
            v-for="photo in photos"
            :key="photo.id"
            class="unsplash-result-small"
            :src="photo.urls.thumb"
            alt="img"
            @click="applyPhoto(photo)"
          />
        </template>
      </list-slot>
    </section>

    <section v-if="searchResults" class="unsplash-results-screen">
      <list-slot>
        <template v-slot:list>
          <img
            v-for="photo in photos"
            :key="photo.id"
            class="unsplash-result-large"
            :src="photo.urls.thumb"
            alt="img"
            @click="applyPhoto(photo)"
          />
        </template>
      </list-slot>
    </section>
  </section>
</template>


<script>
import listSlot from "../components/list-slot.vue";
import { getCurrentInstance, onMounted } from "vue";
import axios from "axios";
import _ from "lodash";

export default {
  name: "cover-unsplash",
  components: {
    listSlot,
  },
  props: {
    style: Object,
    title: String,
    attachments: Array,
  },
  data() {
    return {
      currStyle: {
        bgClr: "",
        bgImg: "",
        isFullCover: false,
        uploadedImg: "",
      },
      photos: [],
      currTitle: "",
      searchingUnsplash: false,
      searchResults: false,
      search: "",
      photo_url: null,
      download_url: null,
      searchTerms: [
        "Productivity",
        "Perspective",
        "Organization",
        "Colorful",
        "Nature",
        "Business",
        "Minimal",
        "Space",
        "Animals",
      ],
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
    this.currTitle = this.title;
    this.searchPhoto();

    // var count = 6;
    //   var orientation = "landscape";
    //     var query = "project management"
    // const randomImgs = await this.$unsplash.random(count, orientation)
    // console.log(randomImgs.urls);
  },

  methods: {
    searchPhoto(searchTerm) {
      const accessKey = "Y2X6Y_wdMpqvaYX_4jgO-dOBqVAsQMQpihsIFNOAX5E";
      let count = 20;
      let query = searchTerm;
      if (query) {
        this.search = query;
        this.searchResults = true;
      } else {
        query = this?.currTitle || "nature";
        count = 12;
      }
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
    applyPhoto(photo) {
      // this.currStyle.lastImg = (this.currStyle.bgImg) ? this.currStyle.bgImg : this.currStyle.uploadedImg || ""
      this.currStyle.uploadedImg = photo.urls.regular;
      this.currStyle.bgClr = "";
      this.currStyle.bgImg = "";
      this.searchResults = false;
      this.searchingUnsplash = false;
      this.$emit("addStyle", this.currStyle);
    },
    waitSearch: _.debounce(function () {
      this.searchPhoto();
    }, 1000),

    selectBgClr(bgClr) {
      // this.currStyle.lastImg = (this.currStyle.bgImg) ? this.currStyle.bgImg : this.currStyle.uploadedImg || ""
      this.currStyle.bgClr = bgClr;
      this.currStyle.bgImg = "";
      this.currStyle.uploadedImg = "";
      this.$emit("addStyle", this.currStyle);
    },
    closeCmp() {
      this.$emit("closeCmp");
    },
    setFullCover(val) {
      this.currStyle.isFullCover = val;
      this.$emit("addStyle", this.currStyle);
    },
    async onAttachImg(ev) {
      const img = await this.$store.dispatch({ type: "attachImg", ev });
      // this.currStyle.lastImg = (this.currStyle.bgImg) ? this.currStyle.bgImg : this.currStyle.uploadedImg
      this.currStyle.uploadedImg = img.url;
      this.currStyle.bgClr = "";
      this.currStyle.bgImg = "";
      this.$emit("addStyle", this.currStyle);
    },
  },
  computed: {
    pageTitle() {
      return this.searchingUnsplash ? "Photo search" : "Cover";
    },
  },
};
</script>

<style>
</style>