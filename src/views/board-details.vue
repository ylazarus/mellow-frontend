<template>
  <section v-if="board" class="board-container" :style="bgImg">
    <header class="board-header flex">
      <div class="board-title-container flex">
        <button class="btn-board-details">
          <img src="src/assets/imgs/5.png" /> Board
        </button>
        <p class="board-title" contenteditable="true" @blur="saveBoardTitle">{{ board.title }}</p>
        <button class="star-btn btn" @click.stop="toggleFavorite(board._id)">
          <img class="star" v-if="board.isFavorite" src="src/assets/icons/full-star.png" />
          <img class="star" v-else src="src/assets/icons/empty-star.png" />
          <!-- <img src="src/assets/icons/empty-star.png" /> -->
          <!-- <img :src="changeImgUrl" /> -->
        </button>
      </div>|
      <div class="board-members-container flex">
        <user-avatar
          :v-if="board.members"
          v-for="member in board.members"
          :key="member._id"
          :user="member"
        />
        <button class="btn">Invite</button>
      </div>|
      <nav class="board-header-nav flex">
        <button class="btn">Filter</button>
        <button class="btn">Show menu</button>
      </nav>
    </header>
    <!-- <div class="article-container"> -->
    <article class="groups-container flex">
      <Container @drop="onDrop" orientation="horizontal">
        <Draggable
          class="draggable-container flex"
          v-for="group in board.groups"
          :key="group.id"
        >
          <board-group :group="group" @dropped="dropCard" @saveGroup="saveGroup" />
        </Draggable>
      </Container>
      <!-- <board-group
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
        @saveGroup="saveGroup"
      /> -->
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
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  name: "board-details",
  data() {
    return {
      board: null,
      dndInfo: {},
    };
  },
  components: {
    boardGroup,
    userAvatar,
    Container,
    Draggable,
  },
  async created() {
    const { boardId } = this.$route.params;
    this.loadBoard(boardId);
  },
  methods: {
    onDrop(ev) {
      const group = this.board.groups.splice(ev.removedIndex, 1)[0];
      this.board.groups.splice(ev.addedIndex, 0, group);
      this.saveBoard();
    },
    dropCard({ ev, groupToId }) {
      this.dndInfo.groupFromId = ev.payload; // groupFrom is always correct, update immediately

      if (ev.payload !== groupToId) this.dndInfo.groupToId = groupToId; // won't update toId on subsequent passes through the function

      if (ev.removedIndex || typeof(ev.removedIndex) === 'number') this.dndInfo.removedIndex = ev.removedIndex;

      if (ev.addedIndex || typeof(ev.addedIndex) === 'number') this.dndInfo.addedIndex = ev.addedIndex;
      
      if (ev.addedIndex || typeof(ev.addedIndex) === 'number' && this.dndInfo.removedIndex || typeof(ev.removedIndex) === 'number') this.moveTask();
    },
    moveTask() {
      const fromGroup = this.board.groups.find(g=> g.id === this.dndInfo.groupFromId)
      const toGroup = (!this.dndInfo.groupToId)  ? fromGroup : this.board.groups.find(g=> g.id === this.dndInfo.groupToId) // if moving within same group, make to group same as from group
      const cardToMove = fromGroup.tasks.splice(this.dndInfo.removedIndex, 1)[0];
      toGroup.tasks.splice(this.dndInfo.addedIndex, 0, cardToMove);
      this.dndInfo = {}
      this.saveBoard();
    },

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
      console.log('in save group');
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
      const backGroundImg = this.board.style?.bgImg || "";
      return { backgroundImage: `url(${backGroundImg})` };
    },
  },
};
</script>
<style>
</style>