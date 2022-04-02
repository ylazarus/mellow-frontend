<template>
  <!-- <p>chart.js chart-vue-3</p> -->
  <section class="dashboard-preview-container">
    <div>
      <div v-for="(n, index) in stats" :key="index">
        <article>{{ n }}</article>
      </div>
    </div>
  </section>
</template>

<script>
export default {

  components: {},
  data() {
    return {
      // boardStats: {
      //   activities: null,
      //   createdAt: null,
      //   createdBy: null,
      //   boardMembers: null,
      //   groups: null,
      //   tasksInGroup: null,
      //   overallTasksDone: []
      // }
    }
  },
  created() { },
  methods: {},
  computed: {
    currBoard() {
      return this.$store.getters.getCurrBoard;
    },
    stats() {
      console.log(this.currBoard);
      // how much activities there is in the board
      // created at - 
      // created by - 
      // how many members on the board 0 by number

      // groups 
      // how many groups there is and how much task in each
      // how many tasks are done overall

      var activities = this.currBoard.activities.length
      var createdAt = new Date(this.currBoard.createdAt)
      var createdBy = this.currBoard.createdBy.fullname
      var boardMembers = this.currBoard.members.length
      var groups = this.currBoard.groups.length
      var tasksInGroup = this.currBoard.groups.map(group => group.tasks.length) // not sure how to present it
      // console.log(tasksInGroup);
      var overallTasksDone = 0
      this.currBoard.groups.forEach(group => {
        group.tasks?.forEach(task => {
          if (task.labelIds?.includes('l101')) overallTasksDone++
        })
      })
      // console.log('overallTasksDone', overallTasksDone);

      return {
        'board-stats':
          activities,
        createdAt,
        createdBy,
        boardMembers,
        groups,
        tasksInGroup,
        overallTasksDone
      }
    }
  },
  unmounted() { },
}
</script>
