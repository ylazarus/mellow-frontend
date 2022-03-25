<template>
  <section class="date-preview pointer">
    <div class="labels-header">
      <h3 class="labels-title">Dates</h3>
      <button class="add-task-close-cmp-btn" @click="closeCmp">X</button>
    </div>
    <hr />
    <v-date-picker v-model="date.dueDate" mode="dateTime" :minute-increment="5" />
    <button class="btn" @click="saveDate">Save</button>
    <button class="remove-date-btn btn" @click="closeCmp">Remove</button>
  </section>
</template>

<script>
import "v-calendar/dist/style.css";

export default {
  name: "date-preview",
  props: {
    dueDate: Number,
  },
  created() {
      this.date.dueDate = this.dueDate
  },
  data() {
    return {
      date: {dueDate: null, isCompleted: false}
    };
  },
  methods: {
    saveDate() {
        console.log(this.date, 'this is the date from the library');
      this.$emit("saveDate", this.date);
    },
    closeCmp() {
        this.date.dueDate=this.dueDate
      this.$emit("closeDate");
    },
  },
};
</script>

<style>
</style>