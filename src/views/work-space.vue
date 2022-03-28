<template>
  <main class="main-layout">
    <section class="all-boards-container">
      <!-- <h1>Work Space</h1> -->

      <!-- <article v-if="favoriteBoards"></article> -->

      <article class="saved-boards">
        <div
          v-for="board in boards"
          :key="board._id"
          @click="toBoardDetails(board._id)"
          class="board-preview img-pos style-font"
          :style="{ backgroundImage: `url(${board.style.bgImg})` }"
        >
          <h2 class="title">{{ board.title }}</h2>

          <a @click.stop="toggleFavorite(board._id)">
            <img v-if="board.isFavorite" src="src/assets/icons/full-star.png" />
            <img v-else src="src/assets/icons/empty-star.png" />
            <!-- <img src="src/assets/icons/empty-star.png" /> -->
            <!-- <img :src="changeImgUrl" /> -->
          </a>
          <!-- <button @click.stop="removeBoard(board._id)">remove</button> -->
        </div>
        <button @click="addBoard" class="board-preview justify-center add-card">
          Create new board
        </button>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  name: "work-space",
  data() {
    return {
      isFavorite: false,
      //
    };
  },
  methods: {
    toBoardDetails(boardId) {
      this.$router.push(`/board/${boardId}`);
    },
    // changeImgUrl() {
    //     var images = require.context('../assets/', false, /\.png$/)
    //     return images('./' + pet + ".png")
    // },
    async addBoard() {
      const boardId = await this.$store.dispatch({ type: "addBoard" });
      // console.log(boardId, 'id back from store');
      this.$router.push(`/board/${boardId}`);
    },
    async toggleFavorite(boardId) {
      console.log(boardId);

      // NEED TO CHANGE STATE FROM THE OBJECT...
      // SOMETIMES THE STATE IS TRUE AND IT WONT CHANGE OTHERS IF THEY ARE TRUE

      this.isFavorite = !this.isFavorite;

      this.$store.dispatch({
        type: "toggleFavorite",
        board: { boardId, status: this.isFavorite },
      });
    },
    async removeBoard(boardId) {
      this.$store.dispatch({ type: "removeBoard", boardId });
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    favoriteBoards() {
      // for favorite (like is pinned)
      return this.$store.getters.favoriteBoards;
    },
    // imgPos() {
    //     return {}
    // }
  },
};
</script>

<style>
</style>