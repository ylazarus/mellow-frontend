<template>
  <section v-if="board" class="board-container">
    <p>Board Details</p>
    <header class="board-header flex">
      <div class="board-title-container flex">
        <button class="shows-options-btn">Board</button>
        <p>Title: {{ board.title }}</p>
        <button class="isStarred">⭐</button>
      </div>
      |
      <div class="board-members-container flex">
        <user-avatar
          :v-if="board.members"
          v-for="member in board.members"
          :key="member._id"
          :user="member"
        />
        <button>Invite</button>
      </div>
    </header>
    <div class="groups-container flex">
      <board-group
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
        @saveGroup="saveGroup"
      />
      <div class="add-group" @click="addGroup">+ Add another list</div>
    </div>
  </section>
</template>

<script>
import { boardService } from "../../services/board-service";
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
  created() {
    const { boardId } = this.$route.params;
    this.$store.commit({ type: "setCurrBoard", boardId });
    this.loadBoard(boardId);
  },
  methods: {
    async loadBoard(boardId) {
      this.board = await boardService.getById(boardId);
    },
    async addGroup() {
      const newGroup = boardService.getEmptyGroup();
      this.board.groups.push(newGroup);
      this.board = await this.$store.dispatch({
        type: "saveBoard",
        board: this.board,
      });
    },
    async saveGroup({ groupId, type, newValue }) {
      const updatingGroup = this.board.groups.find(
        (group) => group.id === groupId
      );
      console.log(updatingGroup);
      switch (type) {
        case "saveGroupTitle":
          console.log(type);
          console.log(newValue);
          updatingGroup.title = newValue;
          break;
        case "addTask":
          console.log(type);
          updatingGroup.tasks.push(newValue);
          break;
      }
      console.log(updatingGroup);
      const idx = this.board.groups.findIndex((group) => group.id === groupId);
      this.board.groups.splice(idx, 1, updatingGroup);
      console.log(this.board);
      this.board = await this.$store.dispatch({
        type: "saveBoard",
        board: this.board,
      });
    },
    // async addGroup() {
    //   this.$store.dispatch({ type: "saveGroup" });
    //   // await this.$store.commit({ type: "saveGroup" });
    //   this.board = this.$store.getters.getCurrBoard;
    // },
    // async saveGroup({ groupId, type, newValue }) {
    //   const updatingGroup = this.board.groups.find(
    //     (group) => group.id === groupId
    //   );
    //   switch (type) {
    //     case "saveGroupTitle":
    //       updatingGroup.title = newValue;
    //       break;
    //     case "addTask":
    //       updatingGroup.tasks.push(newValue);
    //       break;
    //   }
    //   // await this.$store.dispatch({ type: "saveGroup", updatingGroup });
    //   await this.$store.commit({ type: "saveGroup", updatingGroup });
    //   this.board = this.$store.getters.getCurrBoard;
    //   // const idx = this.board.groups.findIndex((group) => group.id === groupId);
    //   // this.board.groups.splice(idx, 1, updatingGroup);
    // },
  },
  computed: {
    isStarred() {
      return this.board.isFavorite ? "filled" : "stroke";
    },
  },
};
</script>
<style>
/* .filled {
}
.stroke {
} */
</style>