<template>
  <header class="app-header-container" :class="bgc">
    <div class="app-header-inner flex">
      <router-link class="logo-link flex" to="/">
        <img class="logo-img" src="src/assets/svgs/trello.svg" />
        <h3 class="logo">Mellow</h3>
      </router-link>
      <nav class="app-header-nav flex">
        <div class="app-header-left-nav flex">
          <button class="btn-header flex" @click="$router.push('/board')">
            Workspace
            <span class="header-arrow-icon"></span>
          </button>
          <button class="btn-header flex" @click="openCmp('isRecent')">
            Recent
            <span class="header-arrow-icon"></span>
          </button>
          <board-recent v-if="handles.isRecent" @closeCmp="openCmp" />
          <button class="btn-header flex" @click="openCmp('isCreateBoard')">
            Create
            <span v-if="handles.isCreateBoard" class="header-arrow-icon"></span>
          </button>
          <create-board v-if="handles.isCreateBoard" @closeCmp="openCmp" />
        </div>
        <div class="app-header-right-nav flex">
          <router-link
            v-if="!loggedinUser"
            class="login-btn"
            @click="isLogin = true"
            to="/login"
            >Log in</router-link
          >
          <router-link
            v-if="!loggedinUser"
            class="signup-btn"
            @click="isLogin = true"
            to="/login"
            >Sign up</router-link
          >
          <div class="header-bell"><img src="src/assets/svgs/bell.svg" /></div>
          <user-avatar v-if="loggedinUser" :user="loggedinUser" />
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { userService } from "../services/user-service";
import boardRecent from "./board-recent.vue";
import createBoard from "./create-board.vue";
import userAvatar from "./user-avatar.vue";
export default {
  data() {
    return {
      handles: {
        isRecent: false,
        isCreateBoard: false,
      },
      isBlue: false,
      isLogin: false,
      loggedinUser: this.$store.getters.loggedinUser,
    };
  },
  created() {},
  methods: {
    openCmp(type) {
      if (typeof type !== "string") {
        for (let key in this.handles) {
          this.handles[key] = false;
        }
        return;
      }
      if (this.handles[type] === true) {
        this.handles[type] = false;
      } else {
        for (let key in this.handles) {
          this.handles[key] = false;
        }
        this.handles[type] = true;
      }
    },
  },
  computed: {
    bgc() {
      return { blue: this.isBlue };
    },
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler() {
        const path = this.$route.path;
        if (path === "/board" || path === "/login") {
          this.isBlue = true;
        } else this.isBlue = false;
        if (path !== "/" && path !== "/login") {
          console.log(this.$store.getters.getGuestUser);
          this.loggedinUser = this.$store.getters.getGuestUser;
        }
      },
    },
  },

  components: {
    boardRecent,
    createBoard,
    userAvatar,
  },
};
</script>

<style>
</style>