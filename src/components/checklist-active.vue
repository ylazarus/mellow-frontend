<template>
    <section v-if="task" class="td-checklist">
        <!-- <div> -->
        <!-- <div v-for="(checklist, index) in task.checklists" :key="index"> -->
        <div v-for="(checklist, index) in task.checklists" :key="index">
            <h3>{{ checklist.title }}</h3>

            <!-- <pre>{{ checklist.todos }}</pre> -->
            <a class="btn" @click="removeChecklist(checklist.id)">Delete</a>
            <div>template for Progress Bar with computed by %</div>

            <div v-for="(todo) in checklist.todos" :key="todo.id">
                <label for="todo.id">
                    <input type="checkbox" />
                    <div
                        @blur="updateTodo(checklist.id, todo.id, $event)"
                        contenteditable="true"
                    >{{ todo.title }}</div>
                </label>
                <div>
                    <a class="btn" @click="updateTodo(checklist.id, todo.id, $event)">save</a>
                    <span>X</span>
                </div>
            </div>
            <button v-if="!isCreateTodo" @click="createTodo">Add an item</button>
            <div v-if="isCreateTodo" @blur="createTodo">
                <div>
                    <input v-focus placeholder="add an item" type="text" v-model="newTodo" />
                    <button @click="addTodo(checklist.id)">Add</button>
                </div>
                <a @click="closeCreateTodo" class="pointer">X</a>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam neque veritatis sit delectus facere culpa est atque ut ab ullam?</p>
        </div>
    </section>
</template>

<script>

export default {

    props: {
        // checklistTitle: String,
        task: Object,

    },
    components: {},
    data() {
        return {
            isCreateTodo: false,
            newTodo: '',
            isUpdateTodo: false,
            // isCreateChecklist: false,
            // checklistTitle: '',
            // checklistCount: [],
        }
    },
    created() { },
    methods: {
        createTodo() {
            console.log(this.isCreateTodo);
            this.isCreateTodo = !this.isCreateTodo
            // this.isCreateTodo = true
        },
        addTodo(checklistId) {
            console.log(this.newTodo);
            this.$emit('addTodo', this.newTodo, checklistId)
            this.newTodo = ''
        },
        removeChecklist(checklistId) {
            this.$emit('removeChecklist', checklistId)
        },
        updateTodo(checklistId, todoId, ev) {
            console.log(todoId);
            // console.log('checklistId', checklistId)
            const textValue = ev.currentTarget.textContent;
            // console.log(textValue)
            // this.isUpdateTodo = false
            this.$emit('updateTodo', checklistId, todoId, textValue)
        },
        removeTodo() {

        },
        closeCreateTodo() {
            this.isCreateTodo = false
        }

    },
    computed: {
        getTodos() {
            return this.task.checklists.filter(checklist => {

                // console.log(checklist);
            })

            // todos.forEach(todo => ...todo)

            // return todos

            // todos.map(todo => console.log(todo.id))
        },
        stam() {
            console.log(this.task);
        }
    },
    unmounted() { },

}
</script>

<style>
</style>