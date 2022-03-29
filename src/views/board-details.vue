<template>
  <section v-if="board" class="board-container" :style="bgImg">
    <router-view
      @updateBoard="updateBoard"
      @addLabelToBoard="addLabelToBoard"
      @updateBoardLabels="updateBoardLabels"
    ></router-view>

    <header class="board-header flex">
      <div class="board-title-container flex">
        <button class="btn-board-details btn-board">Board</button>
        <div class="board-title" contenteditable="true" @blur="saveBoardTitle">
          {{ board.title }}
        </div>
        <button
          class="star-btn btn-board btn"
          @click.stop="toggleFavorite(board._id)"
        >
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
      <div class="members-nav-bar flex">
        <div class="board-members-container flex">
          <user-avatar
            :v-if="board.members"
            v-for="member in board.members"
            :key="member._id"
            :user="member"
          />
        </div>
        <button class="invite-btn btn-board btn">Invite</button>
      </div>
      <nav class="board-header-nav flex">
        <button class="filter-btn btn-board btn" @click="toggleFilter">
          Filter
        </button>
        <board-filter
          v-if="isOpenFilter"
          :board="board"
          @closeCmp="toggleFilter"
          @setFilter="setFilter"
        />
        <button class="show-menu-btn btn-board btn">Show menu</button>
      </nav>
    </header>
    <!-- <div class="article-container"> -->
    <div class="groups-layout">
      <article class="groups-container flex">
        <Container @drop="onDrop" orientation="horizontal">
          <Draggable
            class="draggable-container flex"
            v-for="group in board.groups"
            :key="group.id"
          >
            <board-group
              :group="group"
              :isLabelTitle="isLabelTitle"
              @dropped="dropCard"
              @saveGroup="saveGroup"
              @toggleLabelTitle="toggleLabelTitle"
            />
          </Draggable>
        </Container>
        <!-- <board-group
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
        @saveGroup="saveGroup"
        />-->
        <div class="add-group" @click="addGroup">+ Add another list</div>
      </article>
    </div>
    <!-- </div> -->
  </section>
</template>

<script>
import { boardService } from "../services/board-service";
import { utilService } from "../services/util-service";
import { userService } from "../services/user-service";
import { eventBus, showMsg } from "../services/event-bus-service";
import { socketService } from "../services/socket.service";

import boardGroup from "../components/board-group.vue";
import userAvatar from "../components/user-avatar.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import boardFilter from "../components/board-filter.vue";

export default {
  name: "board-details",
  data() {
    return {
      board: null,
      dndInfo: {},
      isLabelTitle: false,
      isOpenFilter: false,
    };
  },
  components: {
    boardGroup,
    userAvatar,
    Container,
    Draggable,
    boardFilter,
  },
  async created() {
    this.unsubscribe = eventBus.on("show-msg", this.showMsg);
    const { boardId } = this.$route.params;
    this.topic = boardId
    socketService.emit("board topic", this.topic)
    socketService.on("someone updated", this.boardUpdated)
    this.loadBoard(boardId);
  },
  unmounted() {
    socketService.off("someone updated", this.boardUpdated)
    
    // socketService.terminate();
  },
  methods: {
    async updateBoard(board) {
      const updatedBoard = await this.$store.dispatch({
        type: "saveBoard",
        board,
      });
      this.board = updatedBoard;
    },
    onDrop(ev) {
      const group = this.board.groups.splice(ev.removedIndex, 1)[0];
      this.board.groups.splice(ev.addedIndex, 0, group);
      this.saveBoard();
    },
    dropCard({ ev, groupToId }) {
      this.dndInfo.groupFromId = ev.payload; // groupFrom is always correct, update immediately

      if (ev.payload !== groupToId) this.dndInfo.groupToId = groupToId; // won't update toId on subsequent passes through the function

      if (ev.removedIndex || typeof ev.removedIndex === "number")
        this.dndInfo.removedIndex = ev.removedIndex;

      if (ev.addedIndex || typeof ev.addedIndex === "number")
        this.dndInfo.addedIndex = ev.addedIndex;

      if (
        (this.dndInfo.addedIndex ||
          typeof this.dndInfo.addedIndex === "number") &&
        (this.dndInfo.removedIndex ||
          typeof this.dndInfo.removedIndex === "number")
      )
        this.moveTask();
    },
    moveTask() {
      const fromGroup = this.board.groups.find(
        (g) => g.id === this.dndInfo.groupFromId
      );
      const toGroup = !this.dndInfo.groupToId
        ? fromGroup
        : this.board.groups.find((g) => g.id === this.dndInfo.groupToId); // if moving within same group, make to group same as from group
      const cardToMove = fromGroup.tasks.splice(
        this.dndInfo.removedIndex,
        1
      )[0];
      toGroup.tasks.splice(this.dndInfo.addedIndex, 0, cardToMove);
      this.saveBoard();
      this.dndInfo = {};
    },

    async loadBoard(boardId) {
      this.board = await this.$store.dispatch({ type: "loadBoard", boardId });
    },
    async saveBoard(type) {
      const activity = {
        id: utilService.makeId(),
        txt: type,
        createdAt: Date.now(),
        // byMember: userService.getLoggedinUser() || "Guest",
      };
      this.board.activities.push(activity);
      this.board = await this.$store.dispatch({
        type: "saveBoard",
        board: JSON.parse(JSON.stringify(this.board)),
      });
    },
    async saveBoardTitle(ev) {
      const newTitle = ev.currentTarget.textContent;
      this.board.title = newTitle;
      this.saveBoard("Change board title");
    },
    async toggleFavorite() {
      this.board.isFavorite = !this.board.isFavorite;
      this.saveBoard("Toggle favorite");
    },
    async addGroup() {
      const newGroup = boardService.getEmptyGroup();
      this.board.groups.push(newGroup);
      this.saveBoard("Added a new group");
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
    toggleLabelTitle() {
      this.isLabelTitle = !this.isLabelTitle;
    },
    async addLabelToBoard(newLabel) {
      this.board.labels.push(newLabel);
      await this.saveBoard("Added a new label");
    },
    async updateBoardLabels(newLabel) {
      const idx = this.board.labels.findIndex((l) => l.id === newLabel.id);
      this.board.labels.splice(idx, 1, newLabel);
      await this.saveBoard("Added a new label");
    },
    toggleFilter() {
      this.isOpenFilter = !this.isOpenFilter;
    },
    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
    },
    boardUpdated(){
      this.loadBoard(this.board._id)
    }

  },
  computed: {
    isStarred() {
      return this.board.isFavorite ? "filled" : "stroke";
    },
    bgImg() {
      const backGroundImg = this.board.style?.bgImg || "";
      return { backgroundImage: `url(${backGroundImg})` };
    },
    updatedBoardFromStore() {
      return this.$store.getters.boards;
    },
  },
  unmounted() {
    this.unsubscribe();
  },
};
</script>
<style>
</style>