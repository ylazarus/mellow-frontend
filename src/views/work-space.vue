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
                    <!-- <img src="src/assets/icons/empty-star.png" /> -->
                    <img :src="changeImgUrl" />
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
        // changeImgUrl() {
        //     var images = require.context('../assets/', false, /\.png$/)
        //     return images('./' + pet + ".png")
        // },
        async addBoard() {
            const boardId = await this.$store.dispatch({ type: 'addBoard' })
            // console.log(boardId, 'id back from store');
            this.$router.push(`/board/${boardId}`)
        },
        async toggleFavorite(boardId) {
            console.log(boardId);
            this.isFavorite = !this.isFavorite

            this.$store.dispatch({ type: 'toggleFavorite', board: { boardId, status: this.isFavorite } })
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
            // for favorite (like is pinned)
            return this.$store.getters.favoriteBoards
        },
        changeImgUrl() {
            return this.isFavorite ? 'src/assets/icons/full-star.png' : 'src/assets/icons/empty-star.png'
        }
    },

}
</script>

<style>
</style>