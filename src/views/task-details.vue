<template>
  <p>task details page</p>
  <div v-if="task" class="task-details-container">

  <p>title: {{task.title}}</p>
  </div>
  <div v-else>Loading...</div>
  <button @click="goBack">Go Back</button>
</template>

<script>
import { boardService } from '../../services/board-service'
export default {
    data(){
        return{
            task: null
        }
    },
async created() {
    const { groupId, taskId } = this.$route.params
    const board = this.$store.getters.board
    const group = board.groups.find(group => group.id === groupId)
    const task = group.find(task => task.id === taskId)
    this.task=JSON.parse(JSON.stringify(task))
      
  },
  methods: {
    goBack() {
       const currBoard = this.$store.getters.currBoard
      this.$router.push(`/${currBoard._id}`)
    },
    async saveToy() {
      await this.$store.dispatch({ type: "saveToy", toy: this.toyToEdit })
      this.$router.push("/toy")
    },
    async addReview() {
      await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
      this.reviewToEdit = {txt: '', toyId: null}
      this.$router.push("/toy")
    }
  },
}
</script>

