<template>
  <!-- <section class="groups-border"> -->
  <!-- <div class="outside-group" contenteditable="true" @blur="saveTitle">{{ group.title }}</div> -->
  <!-- <div class="group-container"> -->
  <!-- <task-preview v-for="task in group.tasks" :key="task.id" :task="task" :groupId="group.id" /> -->
  <!-- </div> -->
  <!-- <div class="bottom-outside-group"> -->
  <!-- <div class="add-task-btn" v-if="!isAdding" @click="openAddTask">Add a card</div>
      <div v-else class="add-task-container">
        <textarea v-focus @blur.stop="saveIfTxt" v-model="newTaskTitle" placeholder="Enter a title for this card..." />
        <div class="add-task-buttons-container flex">
          <button class="adding-task-btn btn" @click="addTask">Add card</button>
          <button class="delete-task-btn btn" @click="clearForm">X</button>
  </div>-->

  <section class="groups-border">
    <!-- </section>   -->
    <div class="group-container">
      <div class="outside-group" contenteditable="true" @blur="saveTitle">{{ group.title }}</div>
      <Container :group-name="'group'" :get-child-payload="getPayload(group.id)" @drop="onDrop">
        <!-- <Draggable class="draggable-container group-container" v-for="task in group.tasks" :key="task.id" :groupId="group.id"> -->
        <Draggable
          class="draggable-container group-container"
          v-for="task in group.tasks"
          :key="task.id"
        >
          <task-preview :task="task" :groupId="group.id" />
        </Draggable>
      </Container>
    </div>
    <div class="bottom-outside-group">
      <div class="add-task-btn" v-if="!isAdding" @click="openAddTask">Add a card</div>
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
    </div>
  </section>
  <!-- <section class="group-container">
          <div class="group-title" contenteditable="true" @blur="saveTitle">{{ group.title }}</div>
          <Container :group-name="'group'" :get-child-payload="getPayload(group.id)" @drop="onDrop">
            <Draggable class="draggable-container" v-for="task in group.tasks" :key="task.id" :groupId="group.id">
              <task-preview :task="task" :groupId="group.id" />
            </Draggable>
          </Container>
          <div class="add-task-btn" v-if="!isAdding" @click="openAddTask">
            Add a card
          </div>
          <div v-else class="add-task-container">
            <textarea v-focus @blur.stop="saveIfTxt" v-model="newTaskTitle"
              placeholder="Enter a title for this card..." />
            <div class="add-task-buttons-container flex">
              <button class="adding-task-btn btn" @click="addTask">Add card</button>
              <button class="delete-task-btn btn" @click="clearForm">X</button>
            </div>
          </div>
  </section>-->
</template>


<script>
import { boardService } from "../services/board-service";
import taskPreview from "./task-preview.vue";
import { utilService } from "../services/util-service";
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  props: {
    group: Object,
  },
  components: {
    taskPreview,
    Container,
    Draggable,
  },
  data() {
    return {
      isAdding: false,
      newTaskTitle: "",
    };
  },
  methods: {
    getPayload(groupId) {
      return () => groupId
    },
    onDrop(ev) {
      if (typeof (ev.removedIndex) !== 'number' && typeof (ev.addedIndex) !== 'number') return

      this.$emit("dropped", {
        ev,
        groupToId: this.group.id,
      });
    },
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