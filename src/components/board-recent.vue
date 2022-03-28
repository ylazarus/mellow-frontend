<template>
  <section class="board-recent">
    <div class="cmp-header">
      <p class="cmp-container-title">Recent</p>
      <a class="close-cmp-btn" @click="$emit('closeCmp')">
        <span></span>
      </a>
    </div>
    <hr />
    <div class="recent-boards-list">
      <div
        class="recent-board-preview flex"
        v-for="board in boards"
        :key="board._id"
        @click="this.$router.push(`/board/${board._id}`)"
      >
        <img
          v-if="board.style.bgImg"
          class="recent-board-preview-img"
          :src="board.style.bgImg"
        />
        <img
          v-else
          class="recent-board-preview-img"
          src="src/assets/imgs/board.jpg"
        />
        <p class="recent-board-title">{{ board.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    boards() {
      console.log(this.$store.getters.boards);
      return this.$store.getters.boards;
    },
  },
};
</script>

<style>
</style>