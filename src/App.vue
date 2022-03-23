<template>
  <router-view />
</template>

<script>


export default {

  components: {

  },
  data() {
    return {}
  },
  created() { 
    this.$store.dispatch({type: 'loadBoards'})
  },
  methods: {},
  computed: {},
  unmounted() { },

}
</script>

<style>
</style>