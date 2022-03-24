<template>
  <section class="group-container">
    <div contenteditable="true" @blur="saveTitle">{{ group.title }}</div>
    <task-preview
      v-for="task in group.tasks"
      :key="task.id"
      :task="task"
      :groupId="group.id"
    />
    <div class="add-task-btn" v-if="!isAdding" @click="openAddTask">
      Add a card
    </div>
    <div v-else class="add-task-container">
      <input
        @blur.stop="saveIfTxt"
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
import { boardService } from "../../services/board-service";
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
      newTaskTitle: "",
    };
  },
  methods: {
    saveIfTxt() {
      console.log("blur");
      if (this.newTaskTitle) this.addTask();
      else this.clearForm();
    },
    clearForm() {
      this.isAdding = false;
      this.newTaskTitle = "";
    },
    openAddTask() {
      this.isAdding = true;
      //   console.log(this.$refs);
      //   this.$refs.input.focus()
    },
    addTask() {
      console.log("adding task");
      if (!this.newTaskTitle) {
        this.isAdding = false;
        return;
      } else {
        const task = boardService.getEmptyTask();
        task.title = this.newTaskTitle;
        this.$emit("saveGroup", {
          groupId: this.group.id,
          type: "addTask",
          newValue: task,
        });
        this.clearForm();
      }
    },
    saveTitle(ev) {
      const newTitle = ev.currentTarget.textContent;
      console.log(newTitle);
      this.$emit("saveGroup", {
        groupId: this.group.id,
        type: "saveGroupTitle",
        newValue: newTitle,
      });
    },
  },
};
</script>

<style>
</style>