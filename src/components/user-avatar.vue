<template>
  <div class="user-avatar">
<<<<<<< HEAD
    <span
      class="user-avatar-guest flex"
      v-if="user.username === 'Guest'"
    ></span>
=======
    <span class="user-avatar-guest flex" v-if="user.username === 'Guest'"></span>
>>>>>>> 93661076962b2593afa8a96ce1e6afc709dddb44
    <img class="user-avatar-img" v-else-if="user.imgUrl" :src="imgAvatar" />
    <span class="user-avatar-name flex" v-else>{{ nameAvatar }}</span>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  methods: {},
  computed: {
    imgAvatar() {
      if (this.user.imgUrl) return this.user.imgUrl;
    },
    nameAvatar() {
      if (!this.user.imgUrl) {
        const userName = this.user.fullname.split(" ");
        var avatar = "";
        userName.forEach((w) => {
          avatar += w.charAt(0);
        });
        return avatar.toUpperCase();
      }
    },
  },
};
</script>

<style>
</style>