<template>
  <section class="label-preview">
    <div class="labels-header">
      <a
        class="back-to-label-btn"
        v-if="isCreate"
        @click="isCreate = !isCreate"
      >
        <span></span>
      </a>
      <p class="labels-container-title">Labels</p>
      <a class="add-task-close-cmp-btn" @click="closeCmp">
        <span></span>
      </a>
    </div>
    <hr />
    <section v-if="!isCreate" class="select-label-container">
      <input
        class="label-input"
        type="text"
        v-model="filterTxt"
        v-focus
        placeholder="Search labels.."
      />
      <div class="choose-labels-container">
        <p class="labels-title">Labels</p>
        <ul class="labels-list flex clean-list">
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
              <span class="label-title">{{ label.title }}</span>
              <span v-if="label.inTask" class="v-icon"></span>
            </div>
            <span class="change-label-btn">
              <a @click="openCreate(label.id)"></a>
            </span>
          </li>
        </ul>
      </div>
      <button class="open-create-label-btn" @click="openCreate">
        Create a new label
      </button>
    </section>
    <section v-else class="create-label-container">
      <label>
        <p>Name</p>
        <input type="text" v-model="newLabelTitle" v-focus />
      </label>
      <p class="labels-container-title">Select a color</p>
      <div class="create-label-options-container">
        <div
          v-for="label in defaultLabels"
          :key="label.id"
          class="label-option flex pointer"
          :style="{ backgroundColor: label.color }"
          @click="selectLabel(label.id)"
        >
          <span v-if="label.isSelected" class="v-icon"></span>
        </div>
      </div>
      <button class="create-label-btn" @click="addLabelToBoard">Create</button>
    </section>
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
      defaultLabels: [
        { id: "l101", color: "#61bd4f", title: "", isSelected: false },
        { id: "l102", color: "#f2d600", title: "", isSelected: false },
        { id: "l103", color: "#ff9f1a", title: "", isSelected: false },
        { id: "l104", color: "#eb5a46", title: "", isSelected: false },
        { id: "l105", color: "#c377e0", title: "", isSelected: false },
        { id: "l106", color: "#0079bf", title: "", isSelected: false },
        { id: "l107", color: "#00c2e0", title: "", isSelected: false },
        { id: "l108", color: "#51e898", title: "", isSelected: false },
        { id: "l109", color: "#ff78cb", title: "", isSelected: false },
        { id: "l110", color: "#344563", title: "", isSelected: false },
        { id: "l111", color: "#b3bac5", title: "", isSelected: false },
      ],
      isCreate: false,
      newLabelTitle: "",
      selectedLabel: null,
    };
  },
  created() {
    this.aggregateLabels();
  },
  methods: {
    toggleLabel(labelId) {
      this.$emit("addLabelToTask", labelId);
    },
    closeCmp() {
      this.$emit("closeCmp");
    },
    aggregateLabels() {
      this.labels = this.boardLabels.map((label) => {
        if (this.taskLabelIds?.includes(label.id)) {
          label.inTask = true;
        }
        return label;
      });
    },
    openCreate(labelId) {
      this.isCreate = true;
    },
    selectLabel(labelId) {
      this.defaultLabels.forEach((label) => {
        label.isSelected = label.id === labelId ? true : false;
      });
    },
    // addLabelToBoard() {
    //   delete this.selectedLabel.isSelected;
    //   const newLabel = JSON.parse(JSON.stringify(this.selectedLabel));
    //   newLabel.title = this.newLabelTitle;
    // },
  },
  computed: {
    getLabels() {
      const regex = new RegExp(this.filterTxt, "i");
      return this.labels.filter((label) => regex.test(label.title));
    },
    // isSelected(labelId) {},
  },
  watch: {
    taskLabelIds() {
      this.aggregateLabels();
    },
  },
  unmounted() {},
};
</script>

<style>
</style>