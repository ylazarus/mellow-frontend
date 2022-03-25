<template>
  <div
    @click="toTaskDetails(this.boardId, this.groupId, this.task.id)"
    class="task-preview-container"
  >
    <div v-if="task.img">{{ task.img }}</div>
    <div v-if="task.labelIds">{{ task.labelIds }}</div>
    <div>{{ task.title }}</div>
    <!-- <div v-if="task.img">{{ task.img }}</div> -->
    <user-avatar
      class="user-avatar"
      :v-if="task.members"
      v-for="member in task.members"
      :key="member._id"
      :user="member"
    />

    <div class="task-snapshot flex">
      <div class="description-img" v-if="task.description?.length"></div>
      <div class="checklists-img" v-if="task.checklists?.length"></div>
      <div class="attachment-img" v-if="task.attachments?.length"></div>
      <div class="date-img" v-if="task.dueDate?.length" :style="isTaskOverdue">⏰ {{task.dueDate.dueDate.slice(6,10)}}</div>
    </div>
  </div>
</template>

<script>
import userAvatar from "./user-avatar.vue";

export default {
  props: {
    task: Object,
    groupId: String
  },
  data() {
    return {
      boardId: null
    }

  },
  components: {
    userAvatar
  },
  methods: {
    toTaskDetails(boardId, groupId, taskId) {
      this.$router.push(`/board/${boardId}/${groupId}/${taskId}`)
    }
  },
  created() {
    const { boardId } = this.$route.params;
    this.boardId = boardId

  },
  computed: {
    // isTaskOverdue(){
    //   return (this.task.dueDate.dueDate < date.now()) ?  {"background-color": "red"} : {"background-color": "green"}
    // }
  }
};
</script>

<style>
</style>