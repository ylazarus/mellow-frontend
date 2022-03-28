<template>
    <section class="delete-task-preview">
        <div class="delete-header flex">
            <span class="cmp-header-title">Delete card?</span>
            <a @click="closeCmp" class="close-delete pointer"></a>
        </div>
        <hr class="thin-hr" />
        <div class="delete-content-container">
            <div>
                <p>All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.</p>
                <a @click="removeTask" class="confirm-delete btn">Delete</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {

    // props: [""],
    components: {},
    data() {
        return {}
    },
    created() { },
    methods: {
        closeCmp() {
            this.$emit('closeCmp')
        },
        removeTask() {
            this.$emit('removeTask')
        }
    },
    computed: {},
    unmounted() { },

}
</script>

<style>
</style>