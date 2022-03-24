<template>
  <section class="task-details-page flex">
    <div v-if="task" class="task-details-container">
      <!-- title needs to become text area in the future -->
      <p class="task-title">{{ task.title }}</p>
      <p>in list {{ currGroup.title }}</p>
      <p class="members-header" v-if="task.members">Members</p>
      <user-avatar
        :v-if="task.members"
        v-for="member in task.members"
        :key="member._id"
        :user="member"
      />

      <p class="description-header">Description</p>
      <div
        class="fake-text-area"
        v-if="!addingDescription"
        @click="addDescription"
      >
        Add a more detailed description...
      </div>
      <div v-else class="add-description-container">
        <textarea v-focus v-model="description" class="description-text-area" />
        <div class="add-task-buttons-container flex">
          <button class="save-description-btn btn" @click="saveDescription">
            Save
          </button>
          <button class="delete-description-btn btn" @click="clearForm">
            X
          </button>
        </div>
      </div>

      <div class="activity-details-header">
        <p class="activity-header">Activity</p>
        <button>{{ detailsShown }}</button>
      </div>
      <div v-if="task.img">Images: {{ task.img }}</div>
      <div v-if="task.labelIds">Label ids: {{ task.labelIds }}</div>

      <div v-if="task.checklists">{{ task.checklists }}</div>
      <div v-if="task.attachments">{{ task.attachments }}</div>
      <div v-if="task.dueDate">{{ task.dueDate }}</div>
      <button @click="goBack">Go Back</button>
    </div>

    <div v-else>Loading...</div>

    <div class="add-task-buttons-container">
      <p>Add to card</p>
      <button class="btn">Members</button>
      <button @click="toggleLabel" class="btn">Labels</button>
      <label-preview v-if="isLabel" :boardLabels="currBoard.labels" />
      <button class="btn">Checklist</button>
      <button class="btn">Dates</button>
      <button @click="toggleAttachment" class="btn">Attachment</button>
      <attachment-preview
        :imgUrls="imgUrls"
        @attachImg="attachImg"
        v-if="isAttachOn"
      />
    </div>
  </section>
</template>

<script>
// import { boardService } from "../../services/board-service";
import userAvatar from "../components/user-avatar.vue";
import attachmentPreview from "../components/attachment-preview.vue";
import labelPreview from "../components/label-preview.vue";
import { utilService } from "../services/util-service";

export default {
  data() {
    return {
      task: null,
      isAttachOn: false,
      imgUrls: [],
      currBoard: null,
      currGroup: null,
      addingDescription: false,
      detailsShown: false,
      isLabel: false,
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
        // byMember: userService.getLoggedinUser() || "Guest",
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
    addDescription() {
      this.addingDescription = true;
    },
    clearForm() {
      this.addingDescription = false;
      this.newTaskTitle = "";
    },
    saveDescription() {},

    toggleAttachment() {
      this.isAttachOn = !this.isAttachOn;
      console.log(this.isAttachOn);
    },
    async attachImg(ev) {
      const img = await this.$store.dispatch({ type: "attachImg", ev });
      console.log("img task", img);
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(img.url);
      await this.saveTask("added image");
      console.log(img);
      console.log(img.url);
      this.imgUrls.push(img.url);
    },
    toggleLabel() {
      this.isLabel = !this.isLabel;
    },
  },
  computed: {
    detailsShown() {
      return this.detailsShown ? "Hide Details" : "Show Details";
    },
  },
  components: {
    userAvatar,
    attachmentPreview,
    labelPreview,
  },
};
</script>

