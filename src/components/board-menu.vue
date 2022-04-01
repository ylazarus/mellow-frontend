<template>
  <section class="board-menu">
    <div class="cmp-header">
      <a
        v-if="handles.isAbout || handles.isChangeBg || handles.isShowActivities"
        class="back-to-cmp-btn"
        @click="toggleMenu"
      >
        <span></span>
      </a>
      <p class="cmp-container-title">{{ cmpTitle }}</p>
      <a class="close-cmp-btn" @click="$emit('closeCmp')">
        <span></span>
      </a>
    </div>
    <hr class="thin-hr" />
    <section class="menu-content">
      <div
        v-if="
          !handles.isAbout && !handles.isChangeBg && !handles.isShowActivities
        "
        class="menu-options flex"
      >
        <div class="menu-option" @click="toggleMenu('isAbout')">
          <span class="trello-icon"></span>
          <div>
            <p class="menu-option-about">About this board</p>
            <p class="menu-option-about-description">
              Add description to your board
            </p>
          </div>
        </div>
        <div class="menu-option" @click="toggleMenu('isChangeBg')">
          <img class="board-bg-preview" src="../assets/imgs/board.jpg" />
          <p class="menu-option-bgc">Change background</p>
        </div>
        <!-- <div class="menu-option" @click="toggleMenu('isSearch')">
          <span class="search-icon"></span>
          <p class="menu-option-search">Search</p>
        </div> -->
        <hr class="thin-hr" />
      </div>

      <section
        v-if="!handles.isAbout && !handles.isChangeBg"
        class="menu-activities-container"
      >
        <p
          v-if="!handles.isShowActivities"
          class="activity-header"
          @click="toggleMenu('isShowActivities')"
        >
          Activity
        </p>
        <div class="activities-list">
          <activity-preview
            v-for="activity in activitiesToDisplay"
            :key="activity.id"
            :activity="activity"
          />
        </div>
        <a
          v-if="!handles.isShowActivities"
          class="show-allActivities"
          @click="toggleMenu('isShowActivities')"
          >View all activity
        </a>
      </section>
      <section v-if="handles.isChangeBg" class="change-bg-container">
        <div v-if="!isChangClr && !isChangImg" class="change-bg-choose">
          <div class="photos-colors-options flex">
            <div class="photos-option-container">
              <img class="photos-option" src="../assets/imgs/photos.jpg" />
              <p class="photos-option-title">Photos</p>
            </div>
            <div class="colors-option-container">
              <img class="colors-option" src="../assets/imgs/colors.jpg" />
              <p class="color-option-title">Colors</p>
            </div>
          </div>
          <hr class="thin-hr" />
          <p class="custom-option-title">Custom</p>
          <div class="custom-option"></div>
        </div>
        <list-slot v-if="isChangClr">
          <!-- <list-slot> -->
          <template v-slot:list>
            <div
              v-for="bgc in bgColors"
              :key="bgc.id"
              class="option-large pointer"
              :style="{ backgroundColor: bgc.color }"
              @click="selectBgClr(bgc.color)"
            ></div> </template
        ></list-slot>
        <list-slot v-if="isChangImg">
          <!-- <list-slot> -->
          <template #list>
            <img
              v-for="(photo, idx) in photos"
              :key="idx"
              class="option-large pointer"
              :src="photo"
              alt="img"
              @click="selectPhoto(photo)"
            />
          </template>
        </list-slot>
      </section>
      <!-- <cover-unsplash v-if="handles.isChangeBg" /> -->
    </section>
  </section>
</template>

<script>
import activityPreview from "./activity-preview.vue";
import listSlot from "./list-slot.vue";
// import coverUnsplash from "./cover-unsplash.vue";
export default {
  props: {
    board: Object,
  },
  data() {
    return {
      filterBy: "",
      handles: {
        isAbout: false,
        isSearch: false,
        isChangeBg: false,
        isShowActivities: false,
      },
      isChangClr: false,
      isChangImg: false,
      bgClr: "",
      bgImg: "",
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
      photos: [
        "https://images.unsplash.com/photo-1648138754706-4fccd621a5f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjQ4NjUyNTQ3&ixlib=rb-1.2.1&q=80&w=400",
        "https://images.unsplash.com/photo-1648537949908-25fc530b5f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjQ4NjUyNTQ3&ixlib=rb-1.2.1&q=80&w=400",
        "https://images.unsplash.com/photo-1647960666864-01fdaed3431f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDE0fDMxNzA5OXx8fHx8Mnx8MTY0ODY1MjU0Nw&ixlib=rb-1.2.1&q=80&w=400",
      ],
    };
  },
  methods: {
    toggleMenu(type) {
      for (let key in this.handles) {
        this.handles[key] = false;
      }
      if (typeof type === "string") {
        this.handles[type] = true;
      }
    },
    selectBgClr(bgClr) {
      this.bgClr = bgClr;
    },
    selectPhoto(bgImg) {
      this.bgImg = bgImg;
    },
  },
  computed: {
    activitiesToDisplay() {
      const activities = this.board.activities.sort((a1, a2) =>
        a1.createdAt > a2.createdAt ? -1 : 1
      );

      return this.handles.isShowActivities
        ? activities
        : activities.slice(0, 20);
    },
    cmpTitle() {
      if (this.handles.isAbout) return "About";
      else if (this.handles.isSearch) return "Search";
      else if (this.handles.isChangeBg) return "Change background";
      else if (this.handles.isShowActivities) return "Activitiy";
      else return "Menu";
    },
  },
  components: {
    activityPreview,
    listSlot,
    // coverUnsplash,
  },
};
</script>

<style>
</style>