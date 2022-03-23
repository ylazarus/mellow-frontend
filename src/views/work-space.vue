<template>
<section>
    <h1>Work Space</h1>
    <article class="saved-boards">
        <div v-for="board in boards" :key="board._id" @click="toBoardDetails(board._id)" class="board-preview">{{board.title}}</div>
    </article>

</section>
</template>

<script>
export default {
    computed: {
        boards(){
            return this.$store.getters.boards
        }
    },
    methods: {
        toBoardDetails(boardId){
            console.log(boardId);
            this.$router.push(`/board/${boardId}`)
        }
    }

}
</script>

<style>
</style>