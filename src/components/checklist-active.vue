<template>
    <section v-if="task" class="td-checklist-preview">
        <!-- <div> -->
        <!-- <div v-for="(checklist, index) in task.checklists" :key="index"> -->
        <div v-for="(checklist, index) in task.checklists" :key="index">
            <div class="checklist-title-container">
                <h3 class="checklist-title">{{ checklist.title }}</h3>
                <!-- <pre>{{ checklist.todos }}</pre> -->
                <a class="delete-checklist btn" @click="removeChecklist(checklist.id)">Delete</a>
            </div>
            <div>template for Progress Bar with computed by %</div>

            <div v-for="(todo) in checklist.todos" :key="todo.id">
                <div class="checklist-todo-title">
                    <label class="todo-content-edit pointer" for="todo.id">
                        <input class="checkbox-input" type="checkbox" />
                        <!-- <div
                            class="todo-content-edit"
                            @blur="updateTodo(checklist.id, todo.id, $event)"
                            contenteditable="true"
                        >{{ todo.title }}</div>-->
                        <textarea spellcheck="false" cols="100" rows="20">{{ todo.title }}</textarea>
                    </label>
                    <div class="update-todo-btn-container">
                        <div class="update-todo-btn">
                            <!-- <a
                                class="update-todo-text btn"
                                @click="updateTodo(checklist.id, todo.id,)"
                            >Save</a>
                            <span class="close-update"></span>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-todo-container">
                <button class="add-an-item btn" v-if="!isCreateTodo" @click="createTodo">Add an item</button>
            </div>
            <div class="add-item-container" v-if="isCreateTodo" @blur="createTodo">
                <div>
                    <!-- <input
                        class="add-item-input"
                        v-focus
                        placeholder="add an item"
                        type="text"
                        v-model="newTodo"
                    />-->
                    <textarea
                        class="add-item-input"
                        v-focus
                        placeholder="Add an item"
                        type="text"
                        v-model="newTodo"
                        cols="30"
                        rows="10"
                    ></textarea>
                    <div class="todo-btn-container">
                        <button class="add-todo btn" @click="addTodo(checklist.id)">Add</button>
                        <div class="close-btn-wrapper">
                            <a @click="closeCreateTodo" class="close-add-todo-btn pointer"></a>
                        </div>
                    </div>
                </div>
            </div>
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