<template>
  <section class="group-container">
    <div contenteditable="true" @blur="saveTitle">{{ group.title }}</div>
    <task-preview v-for="task in group.tasks" :key="task.id" :task="task" :groupId="group.id" />
    <button class="btn" v-if="!isAdding" @click="openAddTask">Add a card</button>
    <div  v-else class="add-task-container">
      <input
        @blur="saveIfTxt"
        type="textarea"
        v-model="newTaskTitle"
        placeholder="Enter a title for this card..."
      />
      <div class="add-task-buttons-container flex">

      <button class="btn" @click="addTask">Save</button>
      <button class="btn" @click="clearForm">X</button>
      </div>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";
export default {
  props: {
    group: Object,
  },
  components: {
    taskPreview,
  },
  data() {
    return {
      isAdding: false,
      newTaskTitle: '',
    };
  },
  methods: {
      saveIfTxt(){
          if (this.newTaskTitle) this.addTask()
          else this.clearForm()
      },
      clearForm(){
          this.isAdding = false
          this.newTaskTitle = ''
      },
      openAddTask(){
          this.isAdding = true
        //   console.log(this.$refs);
        //   this.$refs.input.focus()
      },
    addTask() {
        console.log('adding task');
      if (!this.newTaskTitle) {
        this.isAdding = false;
        return;
      } else {
        this.$emit("saveGroup", {
          groupId: this.group.id,
          type: "addTask",
          task: this.newTaskTitle,
        });
        this.clearForm()
      }
    },
    saveTitle(ev) {
      const newTitle = ev.currentTarget.textContent;
      this.$emit("saveGroup", {
        groupId: this.group.id,
        type: "saveGroupTitle",
        newTitle,
      });
    },
  },
};
</script>

<style>
</style>