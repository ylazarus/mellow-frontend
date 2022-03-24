<template>
  <section class="label-preview">
    <div class="labels-header flex">
      <h3>labels</h3>
      <button class="add-task-close-cmp-btn btn" @click="closeCmp">X</button>
    </div>
    <hr />
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
          <span class="label-title"> {{ label.title }} </span><a>v</a>
        </div>
        <a>🖋️</a>
      </li>
    </ul>
    <button class="create=label-btn btn">Create a new label</button>
  </section>
</template>

<script>
import { utilService } from "@/services/util-service";
export default {
  props: {
    boardLabels: Array,
    taskLabels: Array,
  },
  components: {},
  data() {
    return {
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
    };
  },
  created() {},
  methods: {
    toggleLabel(labelId) {
      this.$emit("saveLabel", labelId);
    },
    closeCmp() {
      this.$emit("close");
    },
  },
  computed: {
    getLabels() {
      const regex = new RegExp(this.filterTxt, "i");
      return this.boardLabels.filter((label) => regex.test(label.title));
    },
  },
  unmounted() {},
};
</script>

<style>
</style>