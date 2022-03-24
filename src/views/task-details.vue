<template>
  <section class="task-details-page flex">
    

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
    <button @click="goBack">Go Back</button>

    </div>

    <div v-else>Loading...</div>

    <div class="add-task-buttons-container">
      <p>Add to card</p>
      <button class="btn">Members</button>
      <button class="btn">Labels</button>
      <button class="btn">Checklist</button>
      <button class="btn">Dates</button>
      <button @click="toggleAttachment" class="btn">Attachment</button>
      <attachment-preview :imgUrls="imgUrls" @attachImg="attachImg" v-if="isAttachOn" />
    </div>
  </section>
</template>

<script>
// import { boardService } from "../../services/board-service";
import userAvatar from "../components/user-avatar.vue";
import attachmentPreview from "../components/attachment-preview.vue";
import { utilService } from "../services/util-service";

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
    console.log(this.currBoard, "board");
    this.currGroup = this.currBoard.groups.find(
      (group) => group.id === groupId
    );
    console.log(this.currGroup, "group");
    const task = this.currGroup.tasks.find((task) => task.id === taskId);
    this.task = JSON.parse(JSON.stringify(task));
  },
  methods: {
    goBack() {
      const currBoard = this.$store.getters.getCurrBoard;
      this.$router.push(`/board/${currBoard._id}`);
    },
    async saveTask(type) {
      const activity = {
        id: utilService.makeId(),
        txt: type,
        groupId: this.currGroup.id,
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser() || "Guest",
        task: { id: this.task.id, title: this.task.title }, // take out details and extract only mini task
      };
      await this.$store.dispatch({
        type: "saveTask",
        boardId: this.currBoard._id,
        groupId: this.currGroup.id,
        task: this.task,
        activity,
      });
    },

    toggleAttachment() {
      this.isAttachOn = !this.isAttachOn;
      console.log(this.isAttachOn);
    },
    async attachImg(ev) {
      const img = await this.$store.dispatch({ type: "attachImg", ev });
      console.log("img task", img);
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(img.url);
      this.saveTask("added image");
      // this.imgUrls.push(img.url)
    },
  },
  computed: {},
  components: {
    userAvatar,
    attachmentPreview,
  },
};
</script>

