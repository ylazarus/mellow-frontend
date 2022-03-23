<template>
  <section>
    
    <div class="add-task-buttons-container">
        <p>Add to card</p>
        <button class="btn">Members</button>
        <button class="btn">Labels</button>
        <button class="btn">Checklist</button>
        <button class="btn">Dates</button>
        <button class="btn">Attachment</button>
    </div>
    <div v-if="task" class="task-details-container">
      <h2>title: {{ task.title }}</h2>
      <user-avatar
        :v-if="task.members"
        v-for="member in task.members"
        :key="member._id"
        :user="member"
      />
      <div v-if="task.img">{{ task.img }}</div>
      <div v-if="task.labelIds">{{ task.labelIds }}</div>
      <div v-if="task.img">{{ task.img }}</div>

      
        <div v-if="task.checklists">{{task.checklists}}</div>
        <div v-if="task.attachments">{{task.attachments}}</div>
        <div v-if="task.dueDate">{{task.dueDate}}</div>
      
    </div>

    <div v-else>Loading...</div>
    <button @click="goBack">Go Back</button>
  </section>
</template>

<script>
import { boardService } from "../../services/board-service";
import userAvatar from "../components/user-avatar.vue"
export default {
  data() {
    return {
      task: null,
    };
  },
  async created() {
    const { groupId, taskId } = this.$route.params;
    const board = this.$store.getters.getCurrBoard;
    const group = board.groups.find((group) => group.id === groupId);
    const task = group.find((task) => task.id === taskId);
    this.task = JSON.parse(JSON.stringify(task));
  },
  methods: {
    goBack() {
      const currBoard = this.$store.getters.getCurrBoard;
      this.$router.push(`/${currBoard._id}`);
    },
    async saveTask() {
      await this.$store.dispatch({ type: "saveTask", toy: this.task });
      //   this.goBack()
    },
    async addReview() {
      await this.$store.dispatch({
        type: "addReview",
        review: this.reviewToEdit,
      });
      this.reviewToEdit = { txt: "", toyId: null };
      this.$router.push("/toy");
    },
  },
  components:{
    userAvatar

  }
};
</script>

