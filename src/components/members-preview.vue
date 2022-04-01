<template>
    <section class="members-preview cmp-preview">
        <div class="cmp-header">
      <p class="cmp-container-title">Members</p>
      <a class="close-cmp-btn" @click="closeCmp">
        <span></span>
      </a>
    </div>
        <hr class="thin-hr" />
        <div class="members-container">
            <div class="input-container">
                <input
                    v-focus
                    v-model="filterTxt"
                    class="members-filter"
                    type="text"
                    placeholder="Search Members"
                />
            </div>
            <h4 class="members-preview-title">Board members</h4>
            <ul class="board-members-container">
                <li
                    class="board-member pointer"
                    v-for="(member, index) in getMembers"
                    :key="index"
                    @click="toggleMemberInTask(member)"
                >
                    <user-avatar :user="member" />
                    <div class="member-fullname">{{ member.fullname }}{{ `(${member.username})` }}</div>
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
            members: [],
            filterTxt: '',

        }
    },
    created() {
        this.aggregateMembers()
        // console.log(this.task);
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
            let taskMembersIds = this.task.members?.map((m) => m._id);
            // console.log(taskMembersIds);
            this.boardMembers.forEach(member => {
                // console.log(member);
                if (taskMembersIds?.includes(member._id)) {
                    member.isCheck = true
                }
                this.members.push(JSON.parse(JSON.stringify(member)))
            })
            // console.log(this.boardMembers);
            // console.log(this.task.members);
            // console.log(this.members);
        },
    },
    computed: {
        getMembers() {
            const regex = new RegExp(this.filterTxt, "i");
            return this.members.filter((member) => regex.test(member.fullname))
        },
        // isMemberCheck() {
        //     let taskMembersIds = this.task.members.map((m) => m._id);
        //     let isCheck;
        //     const koko = this.boardMembers.map((member, idx) => {
        //         if (taskMembersIds.includes(member._id)) return true
        //         else return false
        //     })
        // }
        // {{ doubleNum(2) // 4 }}

        // doubleNum() {
        //     return (num) => num * 2
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