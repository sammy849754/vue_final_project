<template>
      <div class="todoList_list">
        <ul class="todoList_tab">
          <li><a href="#" @click.prevent="filterStatus= 'all'" :class="{active : filterStatus === 'all'}">全部</a></li>
          <li><a href="#" @click.prevent="filterStatus= 'incomplete'" :class="{active : filterStatus === 'incomplete'}">待完成</a></li>
          <li><a href="#" @click.prevent="filterStatus= 'completed'" :class="{active : filterStatus === 'completed'}">已完成</a></li>
        </ul>
        <!-- {{ filterStatus }} -->
        <div class="todoList_items">
          <ul class="todoList_item">
            <TodoItem 
              v-for="todo in filterTodos" 
              :key="todo.id" 
              :todo="todo" 
              @remove-todo="emit('remove-todo', $event)">
            </TodoItem>
            <!-- <TodoItem 
              v-for="todo in todos" 
              :key="todo.id" 
              :todo="todo" 
              @remove-todo="emit('remove-todo', $event)">
            </TodoItem> -->

          </ul>
          <div class="todoList_statistics">
            <p> {{ incompleteTodos }} 個未完成項目</p>
          </div>
        </div>
      </div>
      <!-- {{ todos }}     -->
</template>
<script setup>
import TodoItem from './TodoItem.vue';
import { ref, computed } from 'vue';
const filterStatus = ref('all');
const filterTodos = computed(() => {
  switch (filterStatus.value) {
    case 'incomplete':
      return props.todos.filter(todo => !todo.status);
    case 'completed':
      return props.todos.filter(todo => todo.status);  
    default:
      return props.todos;
  }
})
const props = defineProps({
    todos: {
        type: Array,
        required: true,
    }
})
const emit = defineEmits(['remove-todo'])
const incompleteTodos = computed(()=> {
  return props.todos.filter(todo => !todo.status).length;
})

</script>