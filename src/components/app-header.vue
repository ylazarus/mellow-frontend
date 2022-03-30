<template>
  <header class="app-header-container" :class="bgc">
    <div class="app-header-inner flex">
      <router-link class="logo-link flex" to="/board">
        <img class="logo-img" src="src/assets/svgs/trello.svg" />
        <h3 class="logo">Mellow</h3>
      </router-link>
      <nav class="app-header-nav flex">
        <button class="btn-header flex" @click="toggleRecent">
          Recent
          <span class="header-arrow-icon"></span>
        </button>
        <board-recent v-if="isRecent" @closeCmp="toggleRecent" />
        <button class="btn-header flex" @click="toggleCreate">
          Create
          <span class="header-arrow-icon"></span>
        </button>
        <create-board v-if="isCreateBoard" @closeCmp="isCreateBoard = false" />
      </nav>
    </div>
  </header>
</template>

<script>
import boardRecent from "./board-recent.vue";
import createBoard from "./create-board.vue";
export default {
  data() {
    return {
      isWorkspace: false,
      isRecent: false,
      isCreateBoard: false,
    };
  },
  created() {},
  methods: {
    toggleRecent() {
      this.isRecent = !this.isRecent;
    },
    toggleCreate() {
      this.isCreateBoard = !this.isCreateBoard;
    },
  },
  computed: {
    bgc() {
      return { blue: this.isWorkspace };
    },
  },
  watch: {
    // "$route.params.boardId": {
    //   immediate: true,
    //   handler() {
    //     const { boardId } = this.$route.params;
    //     if (boardId) {
    //       this.isWorkspace = false;
    //     } else this.isWorkspace = true;
    //   },
    // },
    "$route.path": {
      immediate: true,
      handler() {
        const path = this.$route.path;
        if (path === "/board") {
          this.isWorkspace = true;
        } else this.isWorkspace = false;
        console.log(this.$route.path);
      },
    },
  },

  components: {
    boardRecent,
    createBoard,
  },
};
</script>

<style>
</style>