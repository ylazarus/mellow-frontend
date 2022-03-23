<template>
<section class="flex">

  <div contenteditable="true" @blur="saveTitle">Groups!!!</div>
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
    },
    methods:{
        saveTitle(ev){
            // console.log(ev);
            console.log(ev.currentTarget.textContent);
            //emit group id type:saveGroupTitle value
        }
    }

}
</script>

<style>

</style>