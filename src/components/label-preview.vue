<template>
  <section class="cmp-preview">
    <div class="cmp-header">
      <a
        class="back-to-cmp-btn"
        v-if="isCreate || isChange"
        @click="(isCreate = false), (isChange = false)"
      >
        <span></span>
      </a>
      <p class="cmp-container-title">{{ cmpTitle }}</p>
      <a class="close-cmp-btn" @click="closeCmp">
        <span></span>
      </a>
    </div>
    <hr />
    <section v-if="!isCreate && !isChange" class="select-label-container">
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
            <span class="change-label-btn" @click="openCreate(label.id)">
              <a></a>
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
        <p class="labels-title">Name</p>
        <input
          type="text"
          class="label-input"
          v-model="labelToChange.title"
          v-focus
        />
      </label>
      <p class="labels-title">Select a color</p>
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
      <div class="create-label-buttons-container flex">
        <button
          class="create-label-btn"
          @click.stop="changeBoardLabels('edit')"
        >
          {{ createBtn }}
        </button>
        <button
          v-if="isChange"
          class="delete-label-btn"
          @click.stop="deleteLabelFromBoard()"
        >
          Delete
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import { utilService } from "@/services/util-service";
import { userService } from "../services/user-service";
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
      isChange: false,
      // newLabelTitle: "",
      selectedLabel: null,
      labelToChange: { color: null, title: "" },
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
      if (typeof labelId === "string") {
        this.labelToChange = JSON.parse(
          JSON.stringify(this.boardLabels.find((label) => label.id === labelId))
        );
        const defaultLabel = this.defaultLabels.find(
          (label) => label.color === this.labelToChange.color
        );
        this.selectLabel(defaultLabel.id);
        // this.newLabelTitle = this.labelToChange.title;
        this.isChange = true;
        return;
      }
      this.isCreate = true;
    },
    selectLabel(labelId) {
      this.defaultLabels.forEach((label) => {
        label.isSelected = label.id === labelId ? true : false;
      });
      const defaultLabel = this.defaultLabels.find(
        (label) => label.id === labelId
      );
      this.labelToChange.color = defaultLabel.color;
    },
    // async changeBoardLabels(type) {
    //   const newLabel = JSON.parse(JSON.stringify(this.labelToChange));
    //   newLabel.title = this.newLabelTitle;
    //   // delete newLabel.isSelected;
    //   switch (type) {
    //     case "edit":
    //       if (newLabel.id) {
    //         newLabel.id = "l" + utilService.makeId();
    //       }
    //       break;

    //     default:
    //       break;
    //   }
    //   if (this.isCreate) {
    //     console.log(newLabel);
    //     await this.$emit(
    //       "addLabelToBoard",
    //       JSON.parse(JSON.stringify(newLabel))
    //     );
    //     console.log("await");
    //   } else {
    //     await this.$emit("updateBoardLabels", newLabel);
    //   }
    //   this.isCreate = false;
    //   this.isChange = false;
    // },
  },
  computed: {
    getLabels() {
      const regex = new RegExp(this.filterTxt, "i");
      return this.labels.filter((label) => regex.test(label.title));
    },
    defaultLabelsToDisplay() {
      let unusedLabels = [];
      let usedLabelIds = this.boardLabels.map((l) => l.id);
      this.defaultLabels.forEach((label) => {
        if (!usedLabelIds.includes(label.id)) unusedLabels.push(label);
        // if (this.isChange) {
        //   if (label.isSelected) unusedLabels.push(label);
        // }
      });
      return unusedLabels;
    },
    cmpTitle() {
      if (this.isChange) return "Change label";
      else if (this.isCreate) return "Create label";
      else return "Labels";
    },
    createBtn() {
      if (this.isCreate) return "Create";
      else if (this.isChange) return "Change";
    },
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