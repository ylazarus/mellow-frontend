<template>
    <section v-if="task" class="td-checklist-preview">
        <!-- <div> -->
        <!-- <div v-for="(checklist, index) in task.checklists" :key="index"> -->
        <div v-for="(checklist, index) in task.checklists" :key="index">
            <div class="checklist-title-container">
                <h3 class="checklist-title">{{ checklist.title }}</h3>
                <!-- <pre>{{ checklist.todos }}</pre> -->
                <a class="delete-checklist btn" @click.stop="removeChecklist(checklist.id)">Delete</a>
            </div>
            <div>template for Progress Bar with computed by %</div>

            <div v-for="(todo) in checklist.todos" :key="todo.id">
                <div class="checklist-todo-title">
                    <label class="todo-content-edit pointer" for="todo.id"></label>
                    <input
                        @click.stop="checkboxValue(checklist.id, todo.id, $event)"
                        class="checkbox-input pointer"
                        type="checkbox"
                        name="todo.isDone"
                        id="todo.id"
                        value="todo.isDone"
                        :checked="todo.isDone"
                    />
                    <textarea
                        @click.stop="openUpdateBar(todo.id)"
                        class="todo-clickable-area"
                        @blur="updateTodo(checklist.id, todo.id, $event)"
                        spellcheck="false"
                        cols="100"
                        rows="20"
                        v-model="todo.title"
                        ref="textarea"
                    >{{ todo.title }}</textarea>

                    <div v-if="editingTodoId === todo.id" class="update-todo-btn-container">
                        <div class="update-todo-btn">
                            <a class="update-todo-text btn">Save</a>
                            <span @click.prevent="closeCreateTodo" class="close-update"></span>
                            <span
                                @mousedown="removeTodo(checklist.id, todo.id)"
                                class="pointer"
                            >remove to do</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <p>******THIS AREA IS WHEN CLICKING ON ADD AN ITEM BTN</p> -->
            <div v-if="!addNewTodo" class="add-todo-container">
                <button class="add-an-item btn" @click.stop="createTodo(checklist.id)">Add an item</button>
            </div>
            <div class="add-item-container" v-if="addNewTodo === checklist.id" @blur="createTodo">
                <div>
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
                        <button class="add-todo btn" @click.stop="addTodo(checklist.id)">Add</button>
                        <div class="close-btn-wrapper">
                            <a @click.stop="closeCreateTodo" class="close-add-todo-btn pointer"></a>
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
            // newTodo: '',
            newTodo: [],
            isCheckbox: [],
            isUpdateTodo: false,
            // isUpdateBar: false,
            // checklist: [],
            // todo: {
            //     id: '',
            //     title: '',
            //     isDone: '',
            //     isOpen: '',
            // },
            editingTodoId: '',
            addNewTodo: '',
            // updateTextArea:''

            // isCreateChecklist: false,
            // checklistTitle: '',
            // checklistCount: [],
        }
    },
    created() { },
    mounted() {

    },
    methods: {
        createTodo(checkListId) {
            // console.log(this.isCreateTodo);
            // this.isCreateTodo = !this.isCreateTodo
            this.addNewTodo = checkListId
            console.log('checkListId', checkListId);
            console.log('this.addNewTodo', this.addNewTodo);
            // this.isAddingItem = ''
            // this.isCreateTodo = true
            // this.newTodo = {id: Math.random(), txt: '', isDone: false}
        },
        addTodo(checklistId) {
            console.log(this.newTodo);
            if (!this.newTodo || !this.newTodo.length) return
            // if (!textValue || !textValue.length) return
            this.$emit('addTodo', this.newTodo, checklistId)
            this.newTodo = ''
            // this.addNewTodo = ''
        },
        removeChecklist(checklistId) {
            this.$emit('removeChecklist', checklistId)
        },
        updateTodo(checklistId, todoId, ev) {
            ev.stopPropagation();
            // ev.preventDefault();
            console.log('updating!!!!');
            console.log(todoId);
            // console.log('checklistId', checklistId)
            const textValue = ev.currentTarget.textContent;
            if (!textValue || !textValue.length) {
                this.editingTodoId = ''
                this.addNewTodo = ''
                return
            }
            console.log('updating with good value !!!!');
            // console.log(textValue)
            // this.isUpdateTodo = false
            this.$emit('updateTodo', checklistId, todoId, textValue)
            this.editingTodoId = ''
            this.addNewTodo = ''
        },
        removeTodo(checklistId, todoId) {
            console.log('checklistId', checklistId);
            console.log('todoId', todoId);
        },
        openUpdateBar(todoId) {
            this.editingTodoId = todoId
            this.addNewTodo = ''
        },
        closeCreateTodo() {
            console.log('closing');
            this.editingTodoId = ''
            this.addNewTodo = ''
        },
        checkboxValue(checklistId, todoId, ev) {
            console.log('checklistId', checklistId)
            const checkboxVal = ev.target.checked

            console.log(ev.target.checked);
            this.$emit('updateTodoDone', checklistId, todoId, checkboxVal)
        },
        stam(todo) {
            console.log(todo);
        }

    },
    computed: {
        getTodos() {
            return this.task.checklists.filter(checklist => {

                // console.log(checklist);
            })

        },
        progressBar() {
            console.log(this.$refs.checkbox)
        },
    },
    unmounted() { },

}
</script>

<style>
</style>