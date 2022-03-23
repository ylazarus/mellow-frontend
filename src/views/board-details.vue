<template>
  <section v-if="board" class="board-container">
    <p>Board Details</p>
    <p>Title: {{ board.title }}</p>
    <div class="groups-container flex">
      <board-group
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
      />
    </div>
  </section>
</template>

<script>
import { boardService } from "../../services/board-service";
import boardGroup from "../components/board-group.vue";
export default {
  name: "board-details",
  data() {
    return {
      board: null,
    };
  },
  components: {
    boardGroup,
  },
  async created() {
    const { boardId } = this.$route.params;
    this.board = await boardService.getById(boardId);
  },
};
</script>

<style>
</style>