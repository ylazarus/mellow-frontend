<template>
  <app-header />
  <router-view />
</template>

<script>
import appHeader from "./components/app-header.vue";
export default {
  components: {
    appHeader,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({ type: "loadBoards" });
    this.$store.dispatch({ type: "loadGuestUser" });
  },
  methods: {},
  computed: {},
  unmounted() {},
};
</script>

<style>
</style>