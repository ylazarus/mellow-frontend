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
      </div>

      <hr class="thin-hr" />
      <section class="menu-activities-container">
        <p
          v-if="!handles.isShowActivities"
          class="activity-header"
          @click="toggleMenu('isShowActivities')"
        >
          Activity
        </p>
        <div class="activities-list">
          <activity-preview
            v-for="activity in activitiesToDisplay.slice(0, 20)"
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
    </section>
  </section>
</template>

<script>
import activityPreview from "./activity-preview.vue";
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
  },
  computed: {
    activitiesToDisplay() {
      const activities = this.board.activities.sort((a1, a2) =>
        a1.createdAt > a2.createdAt ? -1 : 1
      );
      return activities;
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
  },
};
</script>

<style>
</style>