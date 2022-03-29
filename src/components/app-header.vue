<template>
  <header class="app-header-container" :class="bgc">
    <div class="app-header-inner flex">
      <router-link class="logo-link flex" to="/board">
        <img class="logo-img" src="src/assets/svgs/trello.svg" />
        <h3 class="logo">Mellow</h3>
      </router-link>
      <nav class="app-header-nav">
        <button class="btn-header flex" @click="toggleRecent">
          Recent
          <span class="header-arrow-icon"></span>
        </button>
        <board-recent v-if="isRecent" @closeCmp="toggleRecent" />
      </nav>
    </div>
  </header>
</template>

<script>
import boardRecent from "./board-recent.vue";
export default {
  data() {
    return {
      isWorkspace: false,
      isRecent: false,
    };
  },
  created() {},
  methods: {
    toggleRecent() {
      this.isRecent = !this.isRecent;
    },
  },
  computed: {
    bgc() {
      return { blue: this.isWorkspace };
    },
  },
  components: {
    boardRecent,
  },
};
</script>

<style>
</style>