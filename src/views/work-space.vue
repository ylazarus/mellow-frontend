<template>
  <main class="main-layout">
    <!-- <div class="side-bar">
      <div>
        <h3>boards</h3>
        <h3>members</h3>
      </div>
    </div>-->
    <section class="all-boards-container">
      <!-- <h1>Work Space</h1> -->

      <section>
        <h1>Favorite boards</h1>
        <ul class="favorite-boards flex">
          <div class="boards-container flex">
            <li
              v-for="board in favoriteBoards"
              :key="board._id"
              @click="toBoardDetails(board._id)"
              class="board-preview img-pos style-font"
              :style="{ backgroundImage: `url(${board.style?.bgImg || ''})` }"
            >
              <h2 class="favorite-board-title">{{ board.title }}</h2>
              <a class="star-container" @click.stop="toggleFavorite(board._id)">
                <img
                  class="ws-full-star"
                  v-if="board.isFavorite"
                  src="../assets/icons/full-star.png"
                />
                <img class="ws-empty-star" v-else src="../assets/icons/empty-star.png" />
              </a>
            </li>
          </div>
        </ul>
      </section>

      <h3>All boards</h3>
      <article class="saved-boards">
        <div
          v-for="board in boards"
          :key="board._id"
          @click="toBoardDetails(board._id)"
          class="board-preview img-pos style-font"
          :style="{ backgroundImage: `url(${board.style?.bgImg || ''})` }"
        >
          <h2 class="title">{{ board.title }}</h2>

          <a class="star-container" @click.stop="toggleFavorite(board._id)">
            <img class="ws-full-star" v-if="board.isFavorite" src="../assets/icons/full-star.png" />
            <img class="ws-empty-star" v-else src="../assets/icons/empty-star.png" />
          </a>
          <!-- <button class="remove-board-button" @click.stop="removeBoard(board._id)">remove</button> -->
        </div>
        <button
          @click="isCreateBoard = true"
          class="board-preview justify-center add-card"
        >Create new board</button>
        <create-board v-if="isCreateBoard" @closeCmp="isCreateBoard = false" />
      </article>
    </section>
  </main>
</template>

<script>
import createBoard from "../components/create-board.vue";
export default {
  name: "work-space",
  data() {
    return {
      isFavorite: false,
      isCreateBoard: false,
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
    async toggleFavorite(boardId) {
      console.log(boardId);

      // NEED TO CHANGE STATE FROM THE OBJECT...
      // SOMETIMES THE STATE IS TRUE AND IT WONT CHANGE OTHERS IF THEY ARE TRUE

      // this.isFavorite = !this.isFavorite;

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
    // getStarImg(){
    //   return new URL('./full-star.png', import.meta.url)
    // }
    // imgPos() {
    //     return {}
    // }
  },
  components: {
    createBoard,
  },
};
</script>

<style>
</style>