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
      <div v-if="task.description" class="description-container">
        <div class="description-header-container flex">
          <p class="description-header">Description</p>
          <button @click="addDescription" class="edit-description-btn btn">Edit</button>
        </div>
        <p class="task-description">{{ task.description }}</p>
      </div>
      <div v-else class="add-edit-description-container">
        <p class="description-header">Description</p>
        <div
          class="fake-text-area"
          v-if="!addingDescription"
          @click="addDescription"
        >Add a more detailed description...</div>
        <div v-else class="add-description-container">
          <textarea
            v-focus
            v-model="newDescription"
            class="description-text-area"
            placeholder="Add a more detailed description..."
          />
          <div class="add-description-buttons-container flex">
            <button class="save-description-btn btn" @click="saveDescription">Save</button>
            <button class="delete-description-btn btn" @click="clearForm">X</button>
          </div>
        </div>
      </div>

      <div class="activity-details-header">
        <p class="activity-header">Activity</p>
        <button class="details-shown-btn btn">{{ areDetailsShown }}</button>
      </div>
      <div v-if="task.img">Images: {{ task.img }}</div>
      <div v-if="task.labelIds">Label ids: {{ task.labelIds }}</div>

      <div v-if="task.checklists">Checklists will be here{{ task.checklists }}</div>
      <div v-if="task.attachments">Attachments will be here{{ task.attachments }}</div>
      <div v-if="task.dueDate">Due date will be here{{ task.dueDate }}</div>
      <button class="go-back-btn btn" @click="goBack">Go Back</button>
    </div>

    <div v-else>Loading...</div>

    <div @click.stop class="add-task-buttons-container">
      <p>Add to card</p>
      <button class="btn">Members</button>
      <button @click="toggleLabel" class="btn">Labels</button>
      <label-preview v-if="isLabel" :boardLabels="currBoard.labels" />
      <button class="btn">Checklist</button>
      <button @click.stop="toggleDates" class="btn">Dates</button>
      <date-preview v-if="isDatesOn" />
      <button @click.stop="toggleAttachment" class="btn">Attachment</button>
      <attachment-preview :imgUrls="imgUrls" @attachImg="attachImg" v-if="isAttachOn" />
    </div>
  </section>
</template>

<script>
// import { boardService } from "../../services/board-service";
import userAvatar from "../components/user-avatar.vue";
import attachmentPreview from "../components/attachment-preview.vue";
import datePreview from "../components/date-preview.vue";
import labelPreview from "../components/label-preview.vue";
import { utilService } from "../services/util-service";

export default {
  data() {
    return {
      task: null,
      isAttachOn: false,
      isDatesOn: false,
      imgUrls: [],
      currBoard: null,
      currGroup: null,
      addingDescription: false,
      newDescription: "",
      detailsShown: false,
      isLabel: false,
    };
  },
  created() {
    this.loadTask();
  },
  methods: {
    async loadTask() {
      const { boardId, groupId, taskId } = this.$route.params;
      this.currBoard = await this.$store.dispatch({
        type: "loadBoard",
        boardId,
      });
      console.log(this.currBoard, "board");
      this.currGroup = this.currBoard.groups.find(
        (group) => group.id === groupId
      );
      const task = this.currGroup.tasks.find((task) => task.id === taskId);
      this.task = JSON.parse(JSON.stringify(task));
      this.newDescription = JSON.parse(JSON.stringify(this.task.description));
    },
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
      console.log(this.task);
      await this.$store.dispatch({
        type: "saveTask",
        boardId: this.currBoard._id,
        groupId: this.currGroup.id,
        task: this.task,
        activity,
      });
    },
    addDescription() {
      this.task.description = "";
      this.addingDescription = true;
    },
    clearForm() {
      this.addingDescription = false;
      this.newDescription = "";
    },
    async saveDescription() {
      this.task.description = this.newDescription;
      await this.saveTask("Updated Description");
      this.loadTask();
    },

    toggleAttachment() {
      this.isAttachOn = !this.isAttachOn;
      if (this.isAttachOn) this.isDatesOn = false
      console.log(this.isAttachOn);
    },


    toggleDates() {
      this.isDatesOn = !this.isDatesOn;
      if (this.isDatesOn) this.isAttachOn = false
      console.log('isDatesOn', this.isDatesOn);
      console.log('isAttachOn', this.isAttachOn);
    },

    // closeAllModals() {
    //   if (this.isAttachOn) this.isDatesOn = false

    // },

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
    areDetailsShown() {
      return this.detailsShown ? "Hide Details" : "Show Details";
    },
  },
  components: {
    userAvatar,
    attachmentPreview,
    datePreview,
    labelPreview,
  },
};
</script>

