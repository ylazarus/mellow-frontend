<template>
  <section class="home-page-container">
    <div class="title-container flex">
      
      <div class="title-text">
        <h1 class="home-logo">Mellow helps teams <span>move work forward</span></h1>
        <h3 class="title">Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your your team works is unique - accomplish it all with Mellow</h3>
        <router-link class="home-link" to="/board"
          ><span class="guest-login-button"> Start as guest</span></router-link
        >

      </div>
     <img
        class="home-page-img"
        src="src/assets/imgs/mellow-cover.png"
      />
    </div>
    <!-- <div class="hero-container">
      <img class="hero-img" src="src/assets/imgs/hero-mello.jpg" />
    </div> -->
  </section>
</template>

<script>
export default {
  // props: [""],

  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
};
</script>

<style>
</style>