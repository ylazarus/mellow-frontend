<template>
  <div class="task-details-dark" @click="goBack"></div>

  <section class="task-details-page">
    <div v-if="task" :style="coverStyle" class="task-cover-img"></div>
    <div class="task-details-main-content">
      <div v-if="task" class="task-details-container">
        <!-- title needs to become text area in the future -->
        <h3 class="task-title-container">
          <p class="task-title" contenteditable="true" @blur="saveTaskTitle">{{ task.title }}</p>
        </h3>
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
              <button class="avatar-btn flex" @click.stop="openCmp('isMembers')">+</button>
            </div>
          </div>
          <div v-if="task.labelIds?.length" class="edit-labels-container">
            <p class="labels-header">Labels</p>
            <div class="labels-container flex">
              <div
                v-for="label in labelsToDisplay"
                :key="label.id"
                class="label-show flex"
                @click.stop="openCmp('isLabel')"
                :style="{ backgroundColor: label.color }"
              >{{ label.title }}</div>
              <button class="label-show-btn flex" @click.stop="openCmp('isLabel')">+</button>
            </div>
          </div>
          <div class="due-date-container" v-if="task.dueDate">
            <p class="due-date-title">Due date</p>
            <div class="displayed-date-checkbox">
              <img @click="toggleDueDateDone" class="due-date-checkbox" :src="dueDateCheckBox" alt />
              <span>{{ formattedDate }}</span>
              <span
                class="completed-overdue-label l101-label"
                v-if="task.dueDate.isCompleted"
              >Completed</span>
              <span
                class="completed-overdue-label l104-label"
                v-if="overdue && !task.dueDate.isCompleted"
              >Overdue</span>
              <img @click="toggleDates" src="src/assets/svgs/arrow-down.svg" alt />
            </div>
          </div>
        </section>

        <section class="edit-description-container">
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
                <button class="delete-description-btn" @click="clearForm"></button>
              </div>
            </div>
          </div>
        </section>

        <div class="img-container" v-if="task.attachments">
          <img class="img-preview" v-for="imgUrl in imgUrls" :key="imgUrl" :src="imgUrl" />
          <p></p>
        </div>

        <div class="activities activity-details-header">
          <p class="activity-header">Activity</p>
          <button v-if="task.activity?.length" class="details-shown-btn btn">{{ areDetailsShown }}</button>
        </div>
        <button class="go-back-btn" @click="goBack"></button>
      </div>

      <div v-else>Loading...</div>

      <nav @click.stop class="add-task-buttons-container">
        <p>Add to card</p>
        <button @click.stop="openCmp('isMembers')" class="members-btn btn" title="Members">Members</button>
        <members-preview
          v-if="handles.isMembers"
          :boardMembers="currBoard.members"
          :task="task"
          @closeCmp="closeCmp"
          @toggleMemberInTask="toggleMemberInTask"
        />
        <button @click.stop="openCmp('isLabel')" class="labels-btn btn" title="Labels">Labels</button>
        <label-preview
          v-if="handles.isLabel"
          :boardLabels="currBoard.labels"
          :taskLabelIds="task.labelIds"
          @closeCmp="closeCmp"
          @addLabelToTask="addLabelToTask"
          @addLabelToBoard="addLabelToBoard"
          @updateBoardLabels="updateBoardLabels"
        />
        <button class="checklist-btn btn" title="Checklist">Checklist</button>
        <button @click.stop="openCmp('isDatesOn')" class="dates-btn btn" title="Dates">Dates</button>
        <date-preview
          v-if="handles.isDatesOn"
          :dueDate="task.dueDate?.dueDate || Date.now()"
          @saveDate="saveDate"
          @closeCmp="closeCmp"
        />
        <button
          @click.stop="openCmp('isAttachOn')"
          class="attachment-img btn"
          title="Attachment"
        >Attachment</button>
        <attachment-preview
          :imgUrls="imgUrls"
          @attachImg="attachImg"
          v-if="handles.isAttachOn"
          @closeCmp="closeCmp"
        />
        <button @click.stop="openCmp('isCover')" class="cover-btn btn" title="Cover">Cover</button>
        <cover-unsplash
          v-if="handles.isCover"
          :style="task.style"
          @closeCmp="closeCmp"
          @addStyle="addStyle"
        />
      </nav>
    </div>
  </section>
</template>

<script>
import userAvatar from "../components/user-avatar.vue";
import attachmentPreview from "../components/attachment-preview.vue";
import datePreview from "../components/date-preview.vue";
import labelPreview from "../components/label-preview.vue";
import membersPreview from "../components/members-preview.vue";
import { utilService } from "../services/util-service";
import { useThrottledRefHistory } from "@vueuse/core";
import coverUnsplash from "../components/cover-unsplash.vue";

export default {
  emits: ['updateBoard', 'addLabelToBoard', 'updateBoardLabels'],
  data() {
    return {
      task: null,
      imgUrls: [],
      currBoard: null,
      currGroup: null,
      addingDescription: false,
      newDescription: "",
      detailsShown: false,
      handles: {
        isLabel: false,
        isAttachOn: false,
        isDatesOn: false,
        isMembers: false,
        isCover: false,
      },
    };
  },
  async created() {
    await this.loadTask();
  },
  methods: {
    async loadTask() {
      const { boardId, groupId, taskId } = this.$route.params;
      this.currBoard = await this.$store.dispatch({
        type: "loadBoard",
        boardId,
      });
      this.currGroup = this.currBoard.groups.find(
        (group) => group.id === groupId
      );
      const task = this.currGroup.tasks.find((task) => task.id === taskId);
      this.task = JSON.parse(JSON.stringify(task));
      this.newDescription = this.task.description;
      this.imgUrls = this.task.attachments;
    },
    goBack() {
      const currBoard = this.$store.getters.getCurrBoard;
      this.$router.push(`/board/${currBoard._id}`);
      document.body.classList.remove("dark-mode");
    },
    async addStyle(style) {
      this.task.style = style;
      await this.saveTask("Updated style");
      this.closeCmp();
      this.loadTask();
    },
    openCmp(type) {
      for (let key in this.handles) {
        this.handles[key] = false;
      }
      this.handles[type] = true;
    },
    closeCmp() {
      for (let key in this.handles) {
        this.handles[key] = false;
      }
    },
    async saveTaskTitle(ev) {
      const newTitle = ev.currentTarget.textContent;
      this.task.title = newTitle;
      await this.saveTask("Change task title");
      this.loadTask();
    },
    async saveDate(newDateInfo) {
      this.task.dueDate = newDateInfo;
      await this.saveTask("Updated due date");
      this.closeCmp();
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
      if (!this.task.labelIds) this.task.labelIds = [];
      if (this.task.labelIds.includes(labelId)) {
        this.task.labelIds = this.task.labelIds.filter(
          (lId) => lId !== labelId
        );
      } else {
        this.task.labelIds.push(labelId);
      }
      await this.saveTask("Change Labels");
      this.loadTask();
    },
    async addLabelToBoard(newLabel) {
      console.log("task", newLabel);
      await this.$emit("addLabelToBoard", newLabel);
    },
    async updateBoardLabels(newLabel) {
      console.log("task", newLabel);
      await this.$emit("updateBoardLabels", newLabel);
    },
    async toggleMemberInTask(memberToAdd) {
      console.log("memberToAdd", memberToAdd);
      // console.log('task', this.task);
      if (!this.task.members) this.task.members = [];
      // if (!this.task.members.isCheck) this.task.members.isCheck = [];
      console.log("task", this.task);
      const idx = this.task.members.findIndex(
        (member) => member._id === memberToAdd._id
      );
      if (idx === -1) {
        this.task.members.push(memberToAdd);
        this.task.members.isCheck = true;
      } else {
        this.task.members.splice(idx, 1);
        this.task.members.isCheck = false;
      }
      await this.saveTask("Added member");
      this.loadTask();
    },
    async toggleDueDateDone() {
      this.task.dueDate.isCompleted = !this.task.dueDate.isCompleted;
      await this.saveTask("updated due date status");
      this.loadTask();
    },
    async attachImg(ev) {
      const img = await this.$store.dispatch({ type: "attachImg", ev });
      if (!this.task.attachments) this.task.attachments = [];
      this.task.attachments.push(img.url);
      this.task.style.bgImg = img.url
      await this.saveTask("added image");
      this.loadTask();
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
      return labels;
    },
    formattedDate() {
      var d = new Date(this.task.dueDate.dueDate);
      return d.toString().slice(4, 21);
    },
    dueDateCheckBox() {
      return this.task.dueDate.isCompleted
        ? "src/assets/svgs/full-checkbox.svg"
        : "src/assets/svgs/empty-checkbox.svg";
    },
    overdue() {
      const date = new Date(this.task.dueDate.dueDate);
      const ms = date.getTime();
      if (ms < Date.now()) {
        return true;
      }
    },
    // {"bgClr": '', "bgImg": '', "isFullCover": false}
    coverStyle() {
      if (this.task.style.bgImg) return {
        "background-image": `url(${this.task.style.bgImg})`,
        "height": "160px",
        "background-color": "#ccd6e0", // later make this dynamic with library?
        "border-radius": "3px 3px 0 0"
      }; else if (this.task.style.bgClr) return {
        "background-color": this.task.style.bgClr,
        "height": "100px",
        "border-radius": "3px 3px 0 0"
      }; else return { "display": "none" }
    },


  },
  components: {
    userAvatar,
    attachmentPreview,
    datePreview,
    labelPreview,
    membersPreview,
    coverUnsplash,
  },
};
// };
</script>

