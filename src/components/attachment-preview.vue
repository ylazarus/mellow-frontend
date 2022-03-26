<template>
    <section class="attachment-preview">
        <label>
            <input type="file" @change="onAttachImg" hidden />
            <p class="attach-from">Attach from...</p>
            <hr />
            <div class="pointer">Computer</div>
        </label>
        <!-- <div>LOADING...</div> -->

        <hr class="seperate-line" />

        <div class="attach-link-title">Attach a link</div>
        <input
            v-model="input"
            class="attach-input"
            type="text"
            placeholder="Paste any link here..."
        />
        <button class="attach-link-btn" @click="showLink">Attach</button>
        <div class="attach-preview">
            <!-- <p>{{ imgUrls }}</p> -->
            <!-- <img v-for="imgUrl in imgUrls" :key="imgUrl" :src="imgUrl" /> -->
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
            input: null,
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
        },
        showLink() {
            console.log(this.input);
            console.log('not working till we fix img upload on second time');
        }
    },
    computed: {},
    unmounted() { },

}
</script>

<style>
</style>