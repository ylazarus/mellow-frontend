<template>
<section class="flex">

  <p>Groups!!!</p>
  <task-preview v-for="task in group.tasks" :key="task.id" :task="task" />
</section>
</template>

<script>
import taskPreview from "./task-preview.vue"
export default {
    props: {
        group: Object
    },
    components:{
        taskPreview
    }

}
</script>

<style>

</style>