<template>
  <div class="user-avatar flex">
    <div>
      {{ avatar }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  methods: {},
  computed: {
    avatar() {
      if (this.user.imgUrl) return this.user.imgUrl;
      var avatar = this.user.fullname.slice(0, 2);
      return avatar.toUpperCase();
      //   return avatar;
    },
  },
};
</script>

<style>
</style>