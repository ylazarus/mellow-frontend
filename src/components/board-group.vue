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
      <textarea
        v-focus
        @blur.stop="saveIfTxt"
        v-model="newTaskTitle"
        placeholder="Enter a title for this card..."
      />
      <div class="add-task-buttons-container flex">
        <button class="adding-task-btn btn" @click="addTask">Add card</button>
        <button class="delete-task-btn btn" @click="clearForm">X</button>
      </div>
    </div>
  </section>
</template>


<script>
import { boardService } from "../services/board-service";
import taskPreview from "./task-preview.vue";
import { utilService } from "../services/util-service";
export default {
  props: {
    group: Object,
  },
  components: {
    taskPreview,
  },
  data() {
    return {
      isAdding: true,
      newTaskTitle: "",
    };
  },
  methods: {
    async saveIfTxt() {
      console.log("blur");
      await utilService.delay(100);
      if (this.newTaskTitle) this.addTask();
      else this.clearForm();
    },
    clearForm() {
      this.isAdding = false;
      this.newTaskTitle = "";
    },
    async openAddTask() {
      // element.scrollTo({
      //   top: 100,
      //   left: 100,
      //   behavior: "smooth",
      // });
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
        const task = boardService.getEmptyTask();
        task.title = this.newTaskTitle;
        this.$emit("saveGroup", {
          groupId: this.group.id,
          type: "add task",
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
        type: "save group title",
        newValue: newTitle,
      });
    },
    focusOnInput() {
      //  this.$refs.add.focus()
      // inputRef.focus();
    },
  },
};
</script>

<style>
</style>