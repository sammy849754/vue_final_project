<template>
<div id="signUpPage" class="bg-yellow">
  <div class="conatiner signUpPage vhContainer">
    <div class="side">
      <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
      <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">註冊帳號</h2>

        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="text" id="email" name="email" 
                placeholder="請輸入 email" v-model="email" required>

        <label class="formControls_label" for="name">您的暱稱</label>
        <input class="formControls_input" type="text" name="name" id="name" 
                placeholder="請輸入您的暱稱" v-model="nickname">

        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" name="pwd" id="pwd" 
                placeholder="請輸入密碼" v-model="password" required>

        <label class="formControls_label" for="pwd">再次輸入密碼</label>
        <input class="formControls_input" type="password" name="pwd" id="pwd" 
                placeholder="請再次輸入密碼" v-model="confirmPassword" required>

        <input class="formControls_btnSubmit" type="button" 
        @click.prevent="handleRegister" value="註冊帳號">
        <!-- {{ email }}
        {{ nickname }}
        {{ password }}
        {{ confirmPassword }} -->
        
        <!-- <a class="formControls_btnLink" href="#loginPage"></a> -->
        <RouterLink class="formControls_btnLink" to="/">登入</RouterLink>
      </form>
    </div>
  </div>
</div>
</template>
<script setup>
import { register } from '@/utils/api'
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// 表單資料
const email = ref('test123@gamil.com')
const nickname = ref('test')
const password = ref('')
const confirmPassword = ref('')

const router = useRouter();
const handleRegister = async () => {
  try {
    await register(email.value, password.value, nickname.value);
    alert('註冊成功，請重新登入');
    router.push('/');
  } catch (error) {
    const msg = error.response.data.message;
    //重複帳號註冊時，API   回傳錯誤時，需提醒用戶
    if (msg === '用戶已存在') {
      alert('此帳號已被註冊');
    }
    console.error('註冊失敗:', msg);
    return;
  }
}

</script>