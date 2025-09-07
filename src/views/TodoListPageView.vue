<template>
<div id="todoListPage" class="bg-half">
  <nav>
    <h1><a href="#">ONLINE TODO LIST</a></h1>
    <ul>
      <li class="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
      <li><a href="#loginPage">登出</a></li>
    </ul>
  </nav>
  <div class="conatiner todoListPage vhContainer">
    <div class="todoList_Content">
      <TodoForm @add-todo="addTodo"></TodoForm>
      <TodoList v-if="todos.length" :todos="todos" @remove-todo="removeTodo"></TodoList>
      <p v-else>目前尚無待辦事項</p>      
    </div>
  </div>
</div>

</template>

<script setup>
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';
import { checkout } from '@/utils/api.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 響應式資料
const todos = ref([
  { id: 1, content: "把冰箱發霉的檸檬拿去丟", status: false },
  { id: 2, content: "打電話叫媽媽匯款給我", status: true },
])


const addTodo = (newTodo) => {
  if (newTodo.trim() !== '') {
    todos.value.push({
      id: Date.now(),
      content: newTodo,
      status: false,
    });
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
}

// 驗證登入
// const user = ref({
//   nickname: '',
//   uid: ''
// })
onMounted(async() => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)vue3-todolist-token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // console.log("token", token);
  if (!token) {
    // 未登入顯示未登入，跳轉登入畫面
    alert('請先登入');
    router.push('/')
    return;
  }

  try {
      const res = await checkout(token);
      // console.log("res", res);
      if (res.data.status !== true) {
        // 未登入顯示未登入，跳轉登入畫面
        alert('請先登入');
        router.push('/')
        return;
      }
      // user.value = res.data;
  } catch (err) {
    console.error("驗證失敗", err);
    alert("請先登入");
    router.push("/");
  }

});
</script>