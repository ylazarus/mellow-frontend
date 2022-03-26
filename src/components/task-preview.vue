<template>
  <div
    @click="toTaskDetails(this.boardId, this.groupId, this.task.id)"
    class="task-preview-container"
  >
    <div v-if="task.img">{{ task.img }}</div>
    <div class="labels-container" v-if="task.labelIds?.length">
      <div
        v-for="labelId in task.labelIds"
        :key="labelId"
        class="task-preview-label"
        :class="labelId + '-label'"
      ></div>
    </div>
    <div class="task-content">{{ task.title }}</div>
    <!-- <div v-if="task.img">{{ task.img }}</div> -->
    <div class="user-avatar-pos">
      <user-avatar
        class="user-avatar"
        :v-if="task.members?.length"
        v-for="member in task.members"
        :key="member._id"
        :user="member"
      />
    </div>

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
    // }
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
        return this.task.dueDate.isCompleted ? "green-label" : "red-label";
      } else return;
      // return this.task.dueDate.isCompleted
      //   ? { "background-color": "green" }
      //   : { "background-color": "red" };
      // } else return {};
    },
    labelsToDisplay() {
      const labels = this.board.labels.filter((label) => {
        if (this.task.labelIds.includes(label.id)) return label;
      });
      console.log(labels);
      return labels;
    },
    attachmentCount() {
      return this.task.attachments?.length
    },
    checkListsCount() {

      var totalTodosCount = 0
      this.task.checklists?.forEach(checkList => totalTodosCount += checkList.todos.length)
      console.log('total todos count', totalTodosCount);

      var totalDoneTodosCount = 0
      this.task.checklists?.forEach(checkList => {
        const doneTodos = checkList.todos.filter(todo => todo.isDone)
        totalDoneTodosCount += doneTodos.length
        })
      console.log('total todos done count', totalDoneTodosCount);

      return `${totalDoneTodosCount}/${totalTodosCount}`

      // const checklistCount = this.task.checklists?.length
      // console.log('checkClistCount', checkListCount);
      // const isDoneCount = this.task?.checklists?.forEach(todos => todos.isDone.length)
      // console.log('isDoneCount', isDoneCount);
      // return `${isDoneCount}/${checkClistCount}`
      // this.task.checklists?.forEach(t => console.log(t.todos))
      // if(this.task.checklists){
      // return console.log('task from task preview', this.task.checklists[0].todos);
      // }
    }

  },
};
</script>

<style>
</style>