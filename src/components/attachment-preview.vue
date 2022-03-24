<template>
    <section class="attachment-preview">
        <label v-if="!isLoading">
            <input type="file" @change="onAttachImg" hidden />
            <p class="attach-from">Attach from...</p>
            <hr />
            <div class="pointer">Computer</div>
        </label>
        <div v-else>LOADING...</div>

        <hr />

        <p>Attach a link</p>
        <input type="text" placeholder="Paste any link here..." />
        <div class="attach-preview">
            <img v-for="imgUrl in imgUrls" :key="imgUrl" :src="imgUrl" />
        </div>
    </section>
</template>

<script>
export default {
    props: {
        imgUrls: Array
    },
    components: {},
    data() {
        return {
            isLoading: false,
        }
    },
    created() { },
    methods: {
        onAttachImg(ev) {
            //how do i use the async await here???
            // cant see loading
            this.isLoading = true
            this.$emit('attachImg', ev)
            this.isLoading = false
        }
    },
    computed: {},
    unmounted() { },

}
</script>

<style>
</style>