<template>
  <div
    @click="toTaskDetails(this.boardId, this.groupId, this.task.id)"
    class="task-preview-container"
    :class="isFullImage"
  >
    <div :style="coverBg" class="task-preview-cover"></div>
    <div class="labels-container" v-if="task.labelIds?.length" @click.stop="showLabelTitle">
      <div
        v-for="label in labelsToDisplay"
        :key="label.id"
        class="task-preview-label"
        :class="[label.id + '-label', openLabel]"
        @click.stop="toggleLabelTitle"
      >
        <span v-if="isLabelTitle" :class="openLabel">{{ label.title }}</span>
      </div>
    </div>
    <div>
      <img v-if="task.attachments?.length" :src="task.attachments[0]" alt />
    </div>
    <div class="task-content">{{ task.title }}</div>

    <div class="task-snapshot flex">
      <div class="description-img-preview" v-if="task.description?.length" title="Card description"></div>
      <div
        class="checklists-img-preview"
        v-if="task.checklists?.length"
        title="Checklists items"
      >{{ checkListsCount }}</div>
      <div
        class="attachment-img-preview"
        v-if="task.attachments?.length"
        title="Attachment"
      >{{ attachmentCount }}</div>
      <div
        class="date-img-preview"
        v-if="task.dueDate?.dueDate"
        :class="isTaskOverdue"
      >{{ formattedDate }}</div>
      <div class="user-avatar-pos flex">
        <user-avatar
          class="user-avatar"
          :v-if="task.members?.length"
          v-for="member in task.members"
          :key="member._id"
          :user="member"
        />
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from "./user-avatar.vue";
import taskDetails from "../views/task-details.vue";

export default {
  props: {
    task: Object,
    groupId: String,
    isLabelTitle: Boolean,
  },
  data() {
    return {
      boardId: null,
      // isDarkMode: false,
    };
  },
  components: {
    userAvatar,
    taskDetails,
  },
  methods: {
    toTaskDetails(boardId, groupId, taskId) {
      console.log(taskId);
      this.$router.push(`/board/${boardId}/${groupId}/${taskId}`);
      // this.toggleDarkMode()
    },
    // toggleDarkMode() {
    //   console.log('dark mode');
    //   // document.body.classList.add('dark-mode')
    //   this.isDarkMode = true
    //   this.$emit('darkMode', this.isDarkMode)
    // },
    toggleLabelTitle() {
      this.$emit("toggleLabelTitle");
    },
  },
  created() {
    const { boardId } = this.$route.params;
    this.boardId = boardId;
  },
  computed: {
    formattedDate() {
      // const date = this.task.dueDate.dueDate
      var d = new Date(this.task.dueDate.dueDate);
      // console.log(d, "this is teh date in th eformatter computed");
      return d.toString().slice(4, 10);
    },
    isTaskOverdue() {
      const date = new Date(this.task.dueDate.dueDate);
      const ms = date.getTime();
      if (ms < Date.now()) {
        return this.task.dueDate.isCompleted ? "l101-label" : "l104-label";
      } else return;
    },
    labelsToDisplay() {
      const labels = this.$store.getters.getCurrBoard.labels.filter((label) => {
        if (this.task.labelIds.includes(label.id)) return label;
      });
      return labels;
    },
    attachmentCount() {
      return this.task.attachments?.length;
    },
    checkListsCount() {
      var totalTodosCount = 0;
      this.task.checklists?.forEach(
        (checkList) => (totalTodosCount += checkList.todos.length)
      );

      var totalDoneTodosCount = 0;
      this.task.checklists?.forEach((checkList) => {
        const doneTodos = checkList.todos.filter((todo) => todo.isDone);
        totalDoneTodosCount += doneTodos.length;
      });

      return `${totalDoneTodosCount}/${totalTodosCount}`;
    },
    openLabel() {
      return { open: this.isLabelTitle };
    },
    isCoverSizeTop() {
      if (task.style.coverSize === 'top') return true
    },
    // coverBg() {
    //   console.log("background info", this.task.style);
    //   return { "background-color": this.task.style.bgColor };
    // },
    coverBgImg() {
      return { "background-image": this.task.style.bgImg }
    },
  },
  // methods: {
  //   toggleLabelTitle() {
  //     this.$emit("toggleLabelTitle");
  //   },
  // },
};
</script>

<style>
</style>