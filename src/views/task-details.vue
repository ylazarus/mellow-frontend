<template>
  <section>
    <div class="add-task-buttons-container">
      <p>Add to card</p>
      <button class="btn">Members</button>
      <button class="btn">Labels</button>
      <button class="btn">Checklist</button>
      <button class="btn">Dates</button>
      <button @click="toggleAttachment" class="btn">Attachment</button>
      <attachment-preview :imgUrls="imgUrls" @attachImg="attachImg" v-if="isAttachOn" />
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

      <div v-if="task.checklists">{{ task.checklists }}</div>
      <div v-if="task.attachments">{{ task.attachments }}</div>
      <div v-if="task.dueDate">{{ task.dueDate }}</div>
    </div>

    <div v-else>Loading...</div>
    <button @click="goBack">Go Back</button>
  </section>
</template>

<script>
// import { boardService } from "../../services/board-service";
import userAvatar from "../components/user-avatar.vue"
import attachmentPreview from "../components/attachment-preview.vue";

export default {

  data() {
    return {
      task: null,
      isAttachOn: false,
      imgUrls: [],
      currBoard: null,
      currGroup: null,
    };
  },
  async created() {
    const { boardId, groupId, taskId } = this.$route.params;
    this.currBoard = await this.$store.dispatch({ type: "loadBoard", boardId });
    console.log(this.currBoard);
    this.currGroup = this.currBoard.groups.find((group) => group.id === groupId);
    const task = group.tasks.find((task) => task.id === taskId);
    this.task = JSON.parse(JSON.stringify(task));
  },
  methods: {
    goBack() {
      const currBoard = this.$store.getters.getCurrBoard;
      this.$router.push(`/board/${currBoard._id}`);
    },
    async saveTask() {
      await this.$store.dispatch({ type: "saveTask", task: this.task });
      //   this.goBack()
    },
    toggleAttachment() {
      this.isAttachOn = !this.isAttachOn
      console.log(this.isAttachOn);
    },
    async attachImg(ev) {
      const img = await this.$store.dispatch({ type: "attachImg", ev })
      console.log('img task', img);
      if (!this.task.attachments) this.task.attachments = []
      this.task.attachments.push(img.url)
      this.saveTask()
      // this.imgUrls.push(img.url)
    },


  },
  computed: {
    board() {
      const board = this.$store.getters.getCurrBoard;
      console.log(board);
      return board
    }
  },
  components: {
    userAvatar,
    attachmentPreview

  }
};
</script>

