<template>
  <section class="label-preview">
    <input
      type="text"
      @input="onSearchLabel"
      v-model="filterTxt"
      placeholder="Search labels.."
    />
    <p class="attach-from">Label</p>
    <div class="labels-container"></div>
    <ul class="labels-list">
      <li
        class="label-option"
        v-for="label in labels"
        :key="label.id"
        :style="`backgroundColor: ${label.color}`"
      ></li>
    </ul>
  </section>
</template>

<script>
import { utilService } from "@/services/util-service";
export default {
  props: {
    boardLabels: Array,
  },
  components: {},
  data() {
    return {
      isLoading: false,
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
    onSearchLabel() {
      console.log(this.filterTxt);
    },
  },
  computed: {},
  unmounted() {},
};
</script>

<style>
</style>