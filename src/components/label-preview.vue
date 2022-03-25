<template>
  <section class="label-preview">
    <div class="labels-header">
      <button v-if="isCreate" @click="isCreate = !isCreate">></button>
      <h3 class="labels-title">labels</h3>
      <button class="add-task-close-cmp-btn" @click="closeCmp">X</button>
    </div>
    <hr />
    <section v-if="!isCreated" class="select-label-container">
      <input type="text" v-model="filterTxt" placeholder="Search labels.." />
      <div class="labels-container"></div>
      <p class="labels-container">labels</p>
      <ul class="labels-list flex">
        <li
          class="label-option-container flex"
          v-for="label in getLabels"
          :key="label.id"
        >
          <div
            class="label-option flex pointer"
            :style="{ backgroundColor: label.color }"
            @click="toggleLabel(label.id)"
          >
            <span class="label-title"> {{ label.title }} </span>
            <span v-if="label.inTask">v</span>
          </div>
          <a @click="openCreate(label.id)">🖋️</a>
        </li>
      </ul>
      <button class="create=label-btn btn" @click="openCreate">
        Create a new label
      </button>
      <label>
        <p>Name</p>
        <input type="text" v-model="newLabelTitle" />
      </label>
    </section>
    <section v-else class="create-label-container"></section>
  </section>
</template>

<script>
import { utilService } from "@/services/util-service";
export default {
  props: {
    boardLabels: Array,
    taskLabelIds: Array,
  },
  components: {},
  data() {
    return {
      labels: [],
      filterTxt: "",
      defaultLabels: {
        $labe0: { id: "l101", color: "#61bd4f", title: "" },
        $labe1: { id: "l102", color: "#f2d600", title: "" },
        $labe2: { id: "l103", color: "#ff9f1a", title: "" },
        $labe3: { id: "l104", color: "#eb5a46", title: "" },
        $labe4: { id: "l105", color: "#c377e0", title: "" },
        $labe5: { id: "l106", color: "#0079bf", title: "" },
        $labe6: { id: "l107", color: "#00c2e0", title: "" },
        $labe7: { id: "l108", color: "#51e898", title: "" },
        $labe8: { id: "l109", color: "#ff78cb", title: "" },
        $labe9: { id: "l110", color: "#344563", title: "" },
        $labe10: { id: "l111", color: "#b3bac5", title: "" },
      },
      newLabelTitle: "",
      isCreate: false,
    };
  },
  created() {
    // this.labels = this.boardLabels;
    this.aggregatLabels();
  },
  methods: {
    toggleLabel(labelId) {
      this.$emit("saveLabel", labelId);
    },
    closeCmp() {
      this.$emit("close");
    },
    aggregatLabels() {
      this.labels = this.boardLabels.map((label) => {
        if (this.taskLabelIds.includes(label.id)) {
          label.inTask = true;
        }
        return label;
      });
    },
    openCreate(labelId) {
      this.isCreate = true;
    },
  },
  computed: {
    getLabels() {
      const regex = new RegExp(this.filterTxt, "i");
      return this.labels.filter((label) => regex.test(label.title));
    },
    // labelSelected() {},
  },
  watch: {
    taskLabelIds() {
      this.aggregatLabels();
    },
  },
  unmounted() {},
};
</script>

<style>
</style>