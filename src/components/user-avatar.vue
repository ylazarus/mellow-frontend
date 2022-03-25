<template>
  <div>
    <div class="user-avatar">
      <img class="user-avatar-img" v-if="user.imgUrl" :src="imgAvatar" />
      <span class="user-avatar-name flex" v-else>{{ nameAvatar }}</span>
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
    imgAvatar() {
      if (this.user.imgUrl) return this.user.imgUrl;
      //   return avatar;
    },
    nameAvatar() {
      if (!this.user.imgUrl) {
        var avatar = this.user.fullname.slice(0, 2);
        return avatar.toUpperCase();
        //   return avatar;
      }
    },
  },
};
</script>

<style>
</style>