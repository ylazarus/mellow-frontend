<template>
  <div class="task-details-dark" @click="moveToBoard">
    <section @click.stop class="task-details-page">
      <div v-if="task" :style="coverStyle" class="task-cover-img"></div>
      <div class="task-details-main-content">
        <div v-if="task" class="task-details-container">
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
                <img
                  @click="toggleDueDateDone"
                  class="due-date-checkbox"
                  :src="dueDateCheckBox"
                  alt
                />
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
          <section class="activities">
            <div class="activity-details-header">
              <p class="activity-header">Activity</p>
              <button
                v-if="currBoard.activities?.length"
                class="details-shown-btn btn"
                @click="detailsShown = !detailsShown"
              >{{ areDetailsShown }}</button>
            </div>

            <div v-if="detailsShown" class="activities-list">
              <activity-preview
                v-for="activity in taskActivities"
                :key="activity.id"
                :activity="activity"
              />
            </div>
          </section>

          <!-- <div class="img-container" v-if="task.attachments">
            <h3>Attachments</h3>
            <img class="img-preview" v-for="imgUrl in imgUrls" :key="imgUrl" :src="imgUrl" />
            <p></p>
          </div>-->

          <checklist-active
            v-if="task.checklists?.length"
            :task="task"
            @addTodo="addTodo"
            @removeChecklist="removeChecklist"
            @updateTodo="updateTodo"
          />
          <!-- <pre>{{ task }}</pre> -->
          <!-- <section v-if="isCreateChecklist" class="td-checklist">
          <div v-for="checklist in task.checklists?.length" :key="checklist.id">
    
            <pre>{{ task.checklists }}</pre>
            <a class="btn">Delete</a>
            <div>template for Progress Bar with computed by %</div>
            
            <input type="text" />
            <button>Add</button>
            <a>X</a>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam neque veritatis sit delectus facere culpa est atque ut ab ullam?</p>
          </div>
          </section>-->

          <!-- <div class="activities activity-details-header">
            <p class="activity-header">Activity</p>
            <button v-if="task.activity?.length" class="details-shown-btn btn">{{ areDetailsShown }}</button>
          </div>-->
          <button class="go-back-btn" @click="moveToBoard"></button>
        </div>

        <div v-else>Loading...</div>

        <nav @click.stop class="add-task-buttons-container">
          <p class="add-task-buttons-title">Add to card</p>
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
            @removeLabelFromBoard="removeLabelFromBoard"
            @updateBoardLabels="updateBoardLabels"
          />
          <button
            class="checklist-btn btn"
            title="Checklist"
            @click.stop="openCmp('isChecklist')"
          >Checklist</button>
          <create-checklist
            v-if="handles.isChecklist"
            @closeCmp="closeCmp"
            @createChecklist="createChecklist"
          />
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
          <button
            @click.stop="openCmp('isCover')"
            class="cover-btn btn font-cmp-btn"
            title="Cover"
          >Cover</button>

          <cover-unsplash
            v-if="handles.isCover"
            :style="task.style"
            :title="task.title"
            :attachments="task.attachments"
            @closeCmp="closeCmp"
            @addStyle="addStyle"
          />

          <h3 class="td-actions">Actions</h3>
          <a @click.stop="openCmp('isDelete')" class="td-delete-btn btn pointer">
            <span class="td-delete-icon"></span>
            <span>Delete</span>
          </a>
          <delete-task
            @removeTask="removeTask('removed task')"
            v-if="handles.isDelete"
            @closeCmp="closeCmp"
          />
        </nav>
      </div>
    </section>
  </div>
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
import deleteTask from "../components/delete-task-cmp.vue"
import createChecklist from "../components/create-checklist.vue"
// import CreateChecklist from "../components/create-checklist.vue"
import checklistActive from "../components/checklist-active.vue"
import { socketService } from "../services/socket.service";
import activityPreview from "../components/activity-preview.vue";

export default {
  name: "task-details",
  emits: ["updateBoard", "addLabelToBoard", "updateBoardLabels"],
  data() {
    return {
      task: null,
      imgUrls: [],
      currBoard: null,
      currGroup: null,
      addingDescription: false,
      newDescription: "",
      detailsShown: false,
      // isCreateChecklist: false,
      checklistTitle: '',
      // checklist: [],
      // isChecklistActive: false,
      handles: {
        isLabel: false,
        isAttachOn: false,
        isDatesOn: false,
        isMembers: false,
        isCover: false,
        isDelete: false,
        isChecklist: false,
      },
    };
  },
  async created() {
    await this.loadTask();
    socketService.on("someone updated", this.boardUpdated);
    // this.setActivities();
  },
  unmounted() {
    socketService.off("someone updated", this.boardUpdated);
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
    boardUpdated() {
      this.loadTask();
    },
    moveToBoard() {
      const currBoard = this.$store.getters.getCurrBoard;
      this.$router.push(`/board/${currBoard._id}`);
      // document.body.classList.remove("dark-mode");
    },
    async addStyle(style) {
      this.task.style = style;
      await this.saveTask("Updated style");
      // this.closeCmp();
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
        byMember:
          this.$store.getters.loggedinUser || this.$store.getters.getGuestUser,
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
    async removeLabelFromBoard(labelId) {
      console.log("task", labelId);
      const idx = this.currBoard.labels.findIndex((l) => l.id === labelId);
      console.log("task", idx);
      this.currBoard.labels.splice(idx, 1);
      await this.saveBoard("Remove label");
    },
    async updateBoardLabels(newLabel) {
      const idx = this.currBoard.labels.findIndex((l) => l.id === newLabel.id);
      if (idx === -1) this.currBoard.labels.push(newLabel);
      else this.currBoard.labels.splice(idx, 1, newLabel);
      await this.saveBoard("Change labels");
    },
    async saveBoard(type) {
      const activity = {
        id: utilService.makeId(),
        txt: type,
        createdAt: Date.now(),
        byMember:
          this.$store.getters.loggedinUser || this.$store.getters.getGuestUser,
      };
      this.currBoard.activities.push(activity);
      const board = await this.$store.dispatch({
        type: "saveBoard",
        board: JSON.parse(JSON.stringify(this.currBoard)),
      });
      await this.$emit("updateBoard", board);
    },
    async toggleMemberInTask(memberToAdd) {

      if (!this.task.members) this.task.members = [];
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
      this.task.style.uploadedImg = "";
      this.task.style.bgClr = "";
      this.task.style.bgImg = img.url;
      await this.saveTask("Added image");
      this.loadTask();
    },
    async removeTask(type) {
      const activity = {
        id: utilService.makeId(),
        txt: type,
        groupId: this.currGroup.id,
        createdAt: Date.now(),
        byMember:
          this.$store.getters.loggedinUser || this.$store.getters.getGuestUser,
        task: { id: this.task.id, title: this.task.title }, // take out details and extract only mini task
      };

      const board = await this.$store.dispatch({
        type: "removeTask",
        boardId: this.currBoard._id,
        groupId: this.currGroup.id,
        task: this.task,
        activity,
      });
      this.$emit("updateBoard", board);
      this.moveToBoard()
    },
    setActivities() {
      this.taskActivities = this.currBoard.activities.filter(
        (activity) => activity.task?.id === this.task.id
      );
    },
    async createChecklist(title) {
      // isCreateChecklist = !isCreateChecklist
      if (!this.task.checklists) this.task.checklists = [];
      const checklist = {
        id: utilService.makeId(),
        title,
        todos: []
      }

      this.task.checklists.push(checklist)
      await this.saveTask('Added checklist')
      this.loadTask();

      // this.isCreateChecklist = true
      this.closeCmp()
    },
    async addTodo(inputVal, checklistId) {

      if (!inputVal) return
      const checklistToUpdate = this.task.checklists.find(checklist => {
        return checklist.id === checklistId
      })
      checklistToUpdate.todos.push({
        id: utilService.makeId(),
        title: inputVal,
        isDone: false
      })
      await this.saveTask('Added todo')
      console.log('task', this.task);
      this.loadTask()

    },
    async removeChecklist(checklistId) {
      const checklistIdx = this.task.checklists.findIndex(checklist => {
        return checklist.id === checklistId
      })
      this.task.checklists.splice(checklistIdx, 1)
      await this.saveTask('Removed checklist')
      this.loadTask()
    },
    async updateTodo(checklistId, todoId, updateTodoVal) {
      console.log('checklistId', checklistId);
      console.log('updateTodoVal', updateTodoVal);
      console.log('todoId', todoId);
      const checklistToUpdate = this.task.checklists.find(checklist => {
        return checklist.id === checklistId
      })
      console.log('checklistToUpdate', checklistToUpdate);
      const todoIdx = checklistToUpdate.todos.findIndex(todo => {
        return todo.id === todoId
      })
      console.log('todoIdx', todoIdx);
      checklistToUpdate.todos.splice(todoIdx, 1, updateTodoVal)
      // await this.saveTask('Updated todo')
      // this.loadTask()
    }

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
      if (this.task.style.uploadedImg)
        return {
          "background-image": `url(${this.task.style.uploadedImg})`,
          height: "160px",
          "background-color": "#ccd6e0", // later make this dynamic with library?
          "border-radius": "3px 3px 0 0",
        };
      else if (this.task.style.bgImg)
        return {
          "background-image": `url(${this.task.style.bgImg})`,
          height: "160px",
          "background-color": "#ccd6e0", // later make this dynamic with library?
          "border-radius": "3px 3px 0 0",
        };
      else if (this.task.style.bgClr)
        return {
          "background-color": this.task.style.bgClr,
          height: "100px",
          "border-radius": "3px 3px 0 0",
        };
      else return { display: "none" };
    },
    taskActivities() {
      return this.currBoard.activities.filter(
        (activity) => activity.task?.id === this.task.id
      );
    },
  },
  components: {
    userAvatar,
    attachmentPreview,
    datePreview,
    labelPreview,
    membersPreview,
    coverUnsplash,
    deleteTask,
    createChecklist,
    checklistActive,
    // CreateChecklist
    activityPreview,
  },
};
</script>

