<template>
  <section class="group-container">
    <div contenteditable="true" @blur="saveIfTxt">{{ group.title }}</div>
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
        ref="add"
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
import taskPreview from "./task-preview.vue";
import { utilService } from "../../services/util-service";
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
    async saveIfTxt() {
      await utilService.delay(100);
      if (this.newTaskTitle) this.addTask();
      else this.clearForm();
    },
    clearForm() {
      this.isAdding = false;
      this.newTaskTitle = "";
    },
    async openAddTask() {
      this.isAdding = true;
      await utilService.delay(50);
      this.focusOnInput();

      //   console.log(this.$refs);
      //   this.$refs.input.focus()
    },
    addTask() {
      console.log("adding task");
      if (!this.newTaskTitle) {
        this.isAdding = false;
        return;
      } else {
        const task = {};
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
    focusOnInput() {
       this.$refs.add.focus()
      // inputRef.focus();
    },
  },
};
</script>

<style>
</style>