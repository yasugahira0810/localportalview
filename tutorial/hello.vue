<template>
  <div>
    <input v-model="msg"/>
    <p class="message">メッセージ: {{ msg }}</p>
  </div>
</template>

<script>
export default {
    data() {
        return { msg: 'Hello!' }
    }
}
</script>
<style>
.message { color: #42b983; }
</style>