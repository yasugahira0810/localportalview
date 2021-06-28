<template>
  <div>
    <input v-model="msg"/>
    <p class="message">メッセージ: {{ msg }}</p>
    <input v-model="url"/>
    <p class="url">URL: {{ url }}</p>
    <p>
      <button @click="persist">Save</button>
    </p>
  </div>
</template>

<script>
export default {
    data () {
        return {
    msg: 'こんにちは！',
    url: 0
        }
  },
  mounted() {
    if (localStorage.msg) {
      this.msg = localStorage.msg;
    }
    if (localStorage.url) {   
      this.url = localStorage.url;
    }
  },
  methods: {
    persist() {
      localStorage.msg = this.msg;
      localStorage.url = this.url;
      console.log('now pretend I did more stuff...');
    }
  }
}
</script>

<style>
.message { color: #42b983; }
</style>