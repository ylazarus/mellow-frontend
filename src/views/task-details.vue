<template>
  <section class="task-details-page">
    <div v-if="task" class="task-details-container">
      <!-- title needs to become text area in the future -->
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-group-title">in list {{ currGroup.title }}</p>

      <section class="show-member-label flex">
        <div v-if="task.members?.length" class="edit-members-container">
          <p class="members-header">Members</p>
          <div class="members-container flex">
            <user-avatar
              :v-if="task.members"
              v-for="member in task.members"
              :key="member._id"
              :user="member"
            />
            <button class="avatar-btn flex" @click="toggleIsLabel">+</button>
          </div>
        </div>
        <div v-if="task.labelIds?.length" class="edit-labels-container">
          <p class="labels-header">Labels</p>
          <div class="labels-container flex">
            <div
              v-for="label in labelsToDisplay"
              :key="label.id"
              class="label-show flex"
              @click="isLabel = true"
              :style="{ backgroundColor: label.color }"
            >
              {{ label.title }}
            </div>
            <button class="label-show-btn flex" @click="isLabel = true">
              +
            </button>
          </div>
        </div>
        <div class="due-date-container" v-if="task.dueDate">
          <p class="due-date-title">Due date</p>
          <div class="displayed-date-checkbox" >
            <span>{{dueDateCheckBox}}</span>
            <span>{{ formattedDate }}</span>
            <span>{{completeOverdue}}</span>
            </div>
        </div>
      </section>

      <section class="edit-description-container">
        <div v-if="task.description" class="description-container">
          <div class="description-header-container flex">
            <p class="description-header">Description</p>
            <button @click="addDescription" class="edit-description-btn btn">
              Edit
            </button>
          </div>
          <p class="task-description">{{ task.description }}</p>
        </div>
        <div v-else class="add-edit-description-container">
          <p class="description-header">Description</p>
          <div
            class="fake-text-area"
            v-if="!addingDescription"
            @click="addDescription"
          >
            Add a more detailed description...
          </div>
          <div v-else class="add-description-container">
            <textarea
              v-focus
              v-model="newDescription"
              class="description-text-area"
              placeholder="Add a more detailed description..."
            />
            <div class="add-description-buttons-container flex">
              <button class="save-description-btn btn" @click="saveDescription">
                Save
              </button>
              <button
                class="delete-description-btn"
                @click="clearForm"
              ></button>
            </div>
          </div>
        </div>
      </section>

      <div class="activities activity-details-header">
        <p class="activity-header">Activity</p>
        <button v-if="task.activity?.length" class="details-shown-btn btn">
          {{ areDetailsShown }}
        </button>
      </div>
      <div v-if="task.img">Images: {{ task.img }}</div>

      <div v-if="task.checklists">
        Checklists will be here{{ task.checklists }}
      </div>
      <!-- <div v-if="task.attachments">Attachments will be here{{ task.attachments }}</div> -->
      <div class="img-container" v-if="task.attachments">
        <img
          class="img-preview"
          v-for="imgUrl in imgUrls"
          :key="imgUrl"
          :src="imgUrl"
        />
        <p></p>
      </div>
      <!-- <div v-if="task.dueDate">{{ formattedDate }}</div> -->
      <button class="go-back-btn" @click="goBack"></button>
    </div>

    <div v-else>Loading...</div>

    <nav @click.stop class="add-task-buttons-container">
      <p>Add to card</p>
      <button class="members-btn btn" title="Members">Members</button>
      <button @click.stop="toggleIsLabel" class="labels-btn btn" title="Labels">
        Labels
      </button>
      <label-preview
        v-if="isLabel"
        :boardLabels="currBoard.labels"
        :taskLabelIds="task.labelIds"
        @close="toggleIsLabel"
        @addLabelToTask="addLabelToTask"
      />
      <button class="checklist-btn btn" title="Checklist">Checklist</button>

      <button @click.stop="toggleDates" class="dates-btn btn" title="Dates">
        Dates
      </button>
      <date-preview
        v-if="isDatesOn"
        :dueDate="task.dueDate?.dueDate || Date.now()"
        @saveDate="saveDate"
        @closeDate="toggleDates"
      />

      <button
        @click.stop="toggleAttachment"
        class="attachment-img btn"
        title="Attachment"
      >
        Attachment
      </button>
      <attachment-preview
        :imgUrls="imgUrls"
        @attachImg="attachImg"
        v-if="isAttachOn"
      />
    </nav>
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
  // props: {
  //   board: Object
  // },
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
    // console.log("created");
    this.loadTask();
  },
  methods: {
    async loadTask() {
      const { boardId, groupId, taskId } = this.$route.params;
      this.currBoard = await this.$store.dispatch({
        type: "loadBoard",
        boardId,
      });
      // console.log(this.currBoard, "board");
      this.currGroup = this.currBoard.groups.find(
        (group) => group.id === groupId
      );
      const task = this.currGroup.tasks.find((task) => task.id === taskId);
      this.task = JSON.parse(JSON.stringify(task));
      this.newDescription = this.task.description;
    },
    goBack() {
      const currBoard = this.$store.getters.getCurrBoard;
      this.$router.push(`/board/${currBoard._id}`);
      document.body.classList.remove("dark-mode");
    },
    async saveDate(newDateInfo) {
      this.task.dueDate = newDateInfo;
      await this.saveTask("Updated due date");
      this.toggleDates();
      this.loadTask();
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
      console.log("task with img", this.task);
      const board = await this.$store.dispatch({
        type: "saveTask",
        boardId: this.currBoard._id,
        groupId: this.currGroup.id,
        task: this.task,
        activity,
      });
      this.$emit("updateBoard", board);
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
    async addLabelToTask(labelId) {
      // console.log(labelId);
      if (!this.task.labelIds) this.task.labelIds = [];
      // console.log(this.task.labelIds);
      if (this.task.labelIds.includes(labelId)) {
        // console.log("includes");
        this.task.labelIds = this.task.labelIds.filter(
          (lId) => lId !== labelId
        );
      } else {
        console.log("push");
        this.task.labelIds.push(labelId);
      }
      await this.saveTask("Change Labels");
      this.loadTask();
    },

    toggleAttachment() {
      this.isAttachOn = !this.isAttachOn;
      if (this.isAttachOn) this.isDatesOn = false;
      console.log(this.isAttachOn);
    },

    toggleDates() {
      this.isDatesOn = !this.isDatesOn;
      if (this.isDatesOn) this.isAttachOn = false;
      console.log("isDatesOn", this.isDatesOn);
      console.log("isAttachOn", this.isAttachOn);
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
      // console.log(img);
      console.log("img url", img.url);
      console.log("task attachment", this.task.attachments);
      // console.log('task with img', task);
      this.imgUrls.push(...this.task.attachments);
      // this.imgUrls.push(img.url);
    },
    toggleIsLabel() {
      this.isLabel = !this.isLabel;
    },
  },
  computed: {
    areDetailsShown() {
      return this.detailsShown ? "Hide Details" : "Show Details";
    },
    labelsToDisplay() {
      const labels = this.currBoard.labels.filter((label) => {
        if (this.task.labelIds.includes(label.id)) return label;
      });
      console.log(labels);
      return labels;
    },
    formattedDate() {
      var d = new Date(this.task.dueDate.dueDate);
      return d.toString().slice(4, 21);
    },
    // dueDateCheckBox{
    //   // return this.task.dueDate.isDone ? 
    // }
    // isTaskOverdue(){
    //   return (this.task.dueDate.dueDate < date.now()) ?  {"background-color": "red"} : {"background-color": "green"}
    // }
  },
  components: {
    userAvatar,
    attachmentPreview,
    datePreview,
    labelPreview,
  },
};
</script>

