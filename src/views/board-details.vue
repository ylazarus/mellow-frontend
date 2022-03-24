<template>
  <section v-if="board" class="board-container" :style="bgImg">
    <header class="board-header flex">
      <div class="board-title-container flex">
        <button class="shows-options-btn btn">Board</button>
        <p class="board-title" contenteditable="true" @blur="saveBoardTitle">
          {{ board.title }}
        </p>
        <button class="star-btn btn" @click.stop="toggleFavorite(board._id)">
          <img
            class="star"
            v-if="board.isFavorite"
            src="src/assets/icons/full-star.png"
          />
          <img class="star" v-else src="src/assets/icons/empty-star.png" />
          <!-- <img src="src/assets/icons/empty-star.png" /> -->
          <!-- <img :src="changeImgUrl" /> -->
        </button>
      </div>
      |
      <div class="board-members-container flex">
        <user-avatar
          :v-if="board.members"
          v-for="member in board.members"
          :key="member._id"
          :user="member"
        />
        <button class="btn">Invite</button>
      </div>
      |
      <nav class="board-header-nav flex">
        <button class="btn">Filter</button>
        <button class="btn">Show menu</button>
      </nav>
    </header>
    <!-- <div class="article-container"> -->
    <article class="groups-container flex">
      <board-group
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
        @saveGroup="saveGroup"
      />
      <div class="add-group" @click="addGroup">+ Add another list</div>
    </article>
    <!-- </div> -->
  </section>
</template>

<script>
import { boardService } from "../services/board-service";
import { utilService } from "../services/util-service";
import { userService } from "../services/user-service";

import boardGroup from "../components/board-group.vue";
import userAvatar from "../components/user-avatar.vue";
export default {
  name: "board-details",
  data() {
    return {
      board: null,
    };
  },
  components: {
    boardGroup,
    userAvatar,
  },
  async created() {
    const { boardId } = this.$route.params;
    this.loadBoard(boardId);
  },
  methods: {
    async loadBoard(boardId) {
      this.board = await this.$store.dispatch({ type: "loadBoard", boardId });
    },
    async saveBoard() {
      this.board = await this.$store.dispatch({
        type: "saveBoard",
        board: this.board,
      });
    },
    async saveBoardTitle(ev) {
      const newTitle = ev.currentTarget.textContent;
      this.board.title = newTitle;
      this.saveBoard();
    },
    async toggleFavorite() {
      this.board.isFavorite = !this.board.isFavorite;
      this.saveBoard();
    },
    async addGroup() {
      const newGroup = boardService.getEmptyGroup();
      this.board.groups.push(newGroup);
      this.saveBoard();
    },
    async saveGroup({ groupId, type, newValue }) {
      const updatingGroup = JSON.parse(
        JSON.stringify(this.board.groups.find((group) => group.id === groupId))
      );
      switch (type) {
        case "save group title":
          updatingGroup.title = newValue;
          break;
        case "add task":
          updatingGroup.tasks.push(newValue);
          break;
      }
      const activity = {
        id: utilService.makeId(),
        txt: type,
        createdAt: Date.now(),
        // byMember: userService.getLoggedinUser() || "Guest",
        group: { id: updatingGroup.id, title: updatingGroup.title }, // take out details and extract only mini task
      };
      this.board = await this.$store.dispatch({
        type: "saveGroup",
        boardId: this.board._id,
        group: updatingGroup,
        activity,
      });
    },
  },
  computed: {
    isStarred() {
      return this.board.isFavorite ? "filled" : "stroke";
    },
    bgImg() {
      const backGroundImg =
        this.board.style?.bgImg ||
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2286x1600/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg";
      return { backgroundImage: `url(${backGroundImg})` };
    },
  },
};
</script>
<style>
</style>