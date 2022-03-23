<template>
  <div @click="toTaskDetails(this.boardId, this.groupId, this.task.id)" class="task-preview-container">
    <div v-if="task.img">{{ task.img }}</div>
    <div v-if="task.labelIds">{{ task.labelIds }}</div>
    <div>{{ task.title }}</div>
    <div v-if="task.img">{{ task.img }}</div>
    <user-avatar
            :v-if="task.members"
            v-for="member in task.members"
            :key="member._id"
            :user="member"
          />

    <div class="task-snapshot flex">
      <div v-if="task.checklists">📃</div>
      <div v-if="task.attachments">📎</div>
      <div v-if="task.dueDate">⏰</div>
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
    return{
      boardId: null
    }

  },
  components: {
    userAvatar
  },
  methods:{
    toTaskDetails(boardId, groupId, taskId){
      this.$router.push(`/board/${boardId}/${groupId}/${taskId}`)
    }
  },
  created() {
    const { boardId } = this.$route.params;
        this.boardId = boardId

  }
};
</script>

<style>
</style>