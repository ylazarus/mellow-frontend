<template>
    <section class="members-preview">
        <div class="members-preview-header flex">
            <span class="cmp-header-title">Members</span>
            <a @click="closeCmp" class="close-members-preview pointer">X</a>
        </div>
        <hr />
        <div class="members-container">
            <div class="input-container">
                <input class="members-filter" type="text" placeholder="Search Members" />
            </div>
            <h4 class="members-preview-title">Board members</h4>
            <ul class="board-members-container">
                <li
                    class="board-member pointer"
                    v-for="member in boardMembers"
                    :key="member._id"
                    @click="toggleMemberInTask(member)"
                >
                    <user-avatar :user="member" />
                    <div>{{ member.fullname }}{{ ` (${member.username})` }}</div>
                    <!-- <pre>{{ task }}</pre> -->
                    <!-- <div v-if="member.isCheck" class="member-check"></div> -->
                </li>
                <div></div>
            </ul>
        </div>
    </section>
</template>

<script>
import userAvatar from "./user-avatar.vue";

export default {
    props: {
        boardMembers: Object,
        task: Object
    },
    components: {
        userAvatar
    },
    data() {
        return {
            isCheck: false
        }
    },
    created() { },
    methods: {
        closeCmp() {
            this.$emit('closeCmp')
            console.log('closing cmp');
        },
        toggleMemberInTask(member) {
            // console.log(' from members-preview', member);
            this.isCheck = !this.isCheck
            console.log();
            this.$emit('toggleMemberInTask', member)
        }
    },
    computed: {},
    unmounted() { },

}
</script>

<style>
</style>