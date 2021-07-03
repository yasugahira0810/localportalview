<template>
  <div>
    名前：<input v-model="newItemName"/>
    URL：<input v-model="newItemUrl"/>
    タグ：<input v-model="newItemTag"/>
    <button @click="addItem">Submit</button>
    <h2>localportalview</h2>
    <div v-for="(item, index) in items" :key=index>
    <p>
      <span class="item">{{ item }}</span>
      <button @click="removeItem(index)">Remove</button>
    </p>
    </div>
    <p> {{ items }}</p>
  </div>
</template>

<script>
export default {
    data () {
        return {
    items: [
      { name: 'localportal', url: 'https://yasugahira0810.github.io/localportal/#/', tag: 'ポータル'}
    ],
    newItemName: null,
    newItemUrl: null,
    newItemTag: null,
        }
  },
  mounted() {
    if (localStorage.getItem('items')) {
      try {
        this.items = JSON.parse(localStorage.getItem('items'));
        console.log(this.items)
      } catch(e) {
        localStorage.removeItem('items');
      }
    }
  },
  methods: {
    addItem() {
      if (!this.newItemName || !this.newItemUrl || !this.newItemTag) {
        return;
      }

      this.items.push({name: this.newItemName, url: this.newItemUrl, tag: this.newItemTag});
      this.newItemName = '';
      this.newItemUrl = '';
      this.newItemTag = '';
      this.saveItems();
    },
    removeItem(x) {
      this.items.splice(x, 1);
      this.saveItems();
    },
    saveItems() {
      const parsed = JSON.stringify(this.items);
      localStorage.setItem('items', parsed);
    }
  }
}
</script>

<style>
.item { color: #42b983; }
</style>