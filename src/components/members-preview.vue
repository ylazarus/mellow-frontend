<template>
    <section class="members-preview">
        <div>
            <span>Members</span>
            <a @click="closeCmp" class="pointer">X</a>
        </div>
        <div>
            <div>
                <input type="text" placeholder="Search Members" />
            </div>
            <h4>Board members</h4>
            <ul v-for="member in boardMembers" :key="member._id">
                <li>
                    <!-- <div class="board-members-container flex">
                        <user-avatar
                            :v-if="task.members"
                            v-for="member in task.member"
                            :key="member._id"
                            :user="member"
                        />
                    </div>-->
                    <!-- <pre>{{ member }}</pre> -->
                    <div
                        @click="toggleMemberInTask(member)"
                        class="pointer"
                    >{{ member.fullname }}{{ ` (${member.username})` }}</div>
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
        return {}
    },
    created() { },
    methods: {
        closeCmp() {
            this.$emit('closeCmp')
            console.log('closing cmp');
        },
        toggleMemberInTask(member) {
            // console.log(' from members-preview', member);
            this.$emit('toggleMemberInTask', member)
        }
    },
    computed: {},
    unmounted() { },

}
</script>

<style>
</style>