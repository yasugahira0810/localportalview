<template>
  <div>
    <input v-model="newUrl"/>
    <button @click="addUrl">Submit</button>
    <h2>localportalview</h2>
    <div v-for="(url, index) in urls" :key='index'>
    <p>
      <span class="url">{{ url }}</span>
      <button @click="removeUrl(index)">Remove</button>
    </p>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
    urls: [],
    newUrl: null
        }
  },
  mounted() {
    if (localStorage.getItem('urls')) {
      try {
        this.urls = JSON.parse(localStorage.getItem('urls'));
        console.log(this.urls)
      } catch(e) {
        localStorage.removeItem('urls');
      }
    }
  },
  methods: {
    addUrl() {
      if (!this.newUrl) {
        return;
      }

      this.urls.push(this.newUrl);
      this.newUrl = '';
      this.saveUrls();
    },
    removeUrl(x) {
      this.urls.splice(x, 1);
      this.saveUrls();
    },
    saveUrls() {
      const parsed = JSON.stringify(this.urls);
      localStorage.setItem('urls', parsed);
    }
  }
}
</script>

<style>
.url { color: #42b983; }
</style>