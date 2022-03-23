<template>
    <section class="all-boards-container">
        <h1>Work Space</h1>

        <article v-if="favoriteBoards"></article>

        <article class="saved-boards">
            <div
                v-for="board in boards"
                :key="board._id"
                @click="toBoardDetails(board._id)"
                class="board-preview"
            >
                {{ board.title }}
                <a @click.stop="toggleFavorite(board._id)">
                    <img v-if="!isFavorite" src="src/assets/icons/empty-star.png" />
                    <img v-else src="src/assets/icons/full-star.png" />
                </a>
                <button @click.stop="removeBoard(board._id)">remove</button>
            </div>
            <button @click="addBoard" class="board-preview justify-center">Create new board</button>
        </article>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isFavorite: false
        }
    },
    methods: {
        toBoardDetails(boardId) {
            // console.log(boardId);
            this.$router.push(`/board/${boardId}`)
        },
        async addBoard() {
            const boardId = await this.$store.dispatch({ type: 'addBoard' })
            // console.log(boardId, 'id back from store');
            this.$router.push(`/board/${boardId}`)
        },
        async toggleFavorite(boardId) {
            this.isFavorite = !this.isFavorite
            // maybe dispatch this.isFavorite
            this.$store.dispatch({ type: 'toggleFavorite', boardId })
        },
        async removeBoard(boardId) {
            this.$store.dispatch({ type: 'removeBoard', boardId })
        },

    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        favoriteBoards() {
            return this.$store.getters.favoriteBoards
        }
    },

}
</script>

<style>
</style>