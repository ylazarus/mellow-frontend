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
                    v-for="(member, index) in members"
                    :key="index"
                    @click="toggleMemberInTask(member)"
                >
                    <user-avatar :user="member" />
                    <div>{{ member.fullname }}{{ ` (${member.username})` }}</div>
                    <!-- <pre>{{ task }}</pre> -->
                    <!-- <pre>{{ index }}</pre> -->
                    <!-- <pre>{{ isCheck[index] }}</pre> -->
                    <div v-if="member.isCheck" class="member-check"></div>
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
            // isCheck: false
            members: []
        }
    },
    created() {
        this.aggregateMembers()
    },
    methods: {
        closeCmp() {
            this.$emit('closeCmp')
            console.log('closing cmp');
        },
        toggleMemberInTask(member) {
            console.log();
            this.$emit('toggleMemberInTask', member)
        },
        aggregateMembers() {
            this.members = [];
            let taskMembersIds = this.task.members.map((m) => m._id);
            console.log(taskMembersIds);
            this.boardMembers.forEach(member => {
                console.log(member);
                if (taskMembersIds.includes(member._id)) {
                    member.isCheck = true
                }
                this.members.push(JSON.parse(JSON.stringify(member)))
            })
            console.log(this.boardMembers);
            console.log(this.task.members);
            console.log(this.members);
        },
    },
    computed: {
        // isMemberCheck() {
        //     let taskMembersIds = this.task.members.map((m) => m._id);
        //     let isCheck;
        //     const koko = this.boardMembers.map((member, idx) => {
        //         if (taskMembersIds.includes(member._id)) return true
        //         else return false
        //     })
        // }

    },
    watch: {
        task: {
            handler() {
                this.aggregateMembers()
            },
            deep: true
        }
    },
    unmounted() { },

}
</script>

<style>
</style>