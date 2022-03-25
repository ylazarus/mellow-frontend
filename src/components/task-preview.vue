<template>
  <div
    @click="toTaskDetails(this.boardId, this.groupId, this.task.id)"
    class="task-preview-container"
  >
    <div v-if="task.img">{{ task.img }}</div>
    <div v-if="task.labelIds?.length">
      <div
        v-for="label in labelsToDisplay"
        :key="label.id"
        class="task-preview-label"
      ></div>
    </div>
    <div>{{ task.title }}</div>
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
      <div class="description-img" v-if="task.description?.length"></div>
      <div class="checklists-img" v-if="task.checklists?.length"></div>
      <div class="attachment-img" v-if="task.attachments?.length"></div>
      <div class="date-img" v-if="task.dueDate?.dueDate" :style="isTaskOverdue">
        ⏰ {{ formattedDate }}
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
  },
  data() {
    return {
      boardId: null,
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
      console.log(d, "this is teh date in th eformatter computed");
      return d.toString().slice(4, 10);
    },
    isTaskOverdue() {
      const date = new Date(this.task.dueDate.dueDate);
      const ms = date.getTime();
      if (ms < Date.now()) {
        return this.task.dueDate.isCompleted
          ? { "background-color": "green" }
          : { "background-color": "red" };
      } else return {};
    },
  },
};
</script>

<style>
</style>