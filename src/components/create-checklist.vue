<template>
    <div class="checklist-header flex">
        <span class="cmp-header-title">Add checklist</span>
        <a @click="closeCmp" class="close-checklist pointer">X</a>
    </div>
    <div class="create-checklist-container">
        <div>
            <form @submit.prevent="addChecklist(title)" class="checklist-form">
                <label for="txt">Title</label>
                <input v-model="title" type="text" name="txt" id="txt" v-focus />
                <button>Add</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

    // props: [""],
    components: {},
    data() {
        return {
            title: 'Checklist',
        }
    },
    created() { },
    methods: {
        closeCmp() {
            this.$emit('closeCmp')
        },
        addChecklist() {
            this.$emit('createChecklist', this.title)
        }
    },
    computed: {},
    unmounted() { },

}
</script>

<style>
</style>