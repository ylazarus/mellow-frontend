<template>
  <header class="app-header-container" :class="bgc">
    <div class="app-header-inner flex">
      <router-link class="logo-link" to="/board">
        <h3 class="logo">
          <img class="logo-img" src="src/assets/svgs/trello.svg" /> Mellow
        </h3>
      </router-link>
      <nav class="app-header-nav">
        <button class="btn-header">
          Recent
          <img
            class="header-arrow-img"
            src="src/assets/svgs/arrow-down.svg"
            alt=""
          />
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isWorkspace: false,
    };
  },
  methods: {
    // moveToBoards() {
    //     this.$router.push()
    // }
  },
  computed: {
    bgc() {
      return { blue: this.isWorkspace };
    },
  },
};
</script>

<style>
</style>