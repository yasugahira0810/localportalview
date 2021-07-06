<template>
    <div>
        名前：<input v-model="newItemName" /> URL：
        <input v-model="newItemUrl" /> タグ：
        <input v-model="newItemTag" />
        <button @click="addItem">Submit</button>
        <h2>localportalview</h2>
        <vue-good-table :columns="columns" :rows="items" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'delete'">
                    <button @click="removeItem(props.row.originalIndex)">Delete</button>
                  </span>
                  <span v-else>
                    {{props.formattedRow[props.column.field]}}
                  </span>
</template>
    
  </vue-good-table>

            <pre> {{ items | pretty }}</pre>
    </div>
</template>

<script>
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
    data() {
        return {
            columns: [{
                    label: '名前',
                    field: 'name',
                },
                {
                    label: 'URL',
                    field: 'url',
                },
                {
                    label: 'タグ',
                    field: 'tag',
                },
                {
                    label: '削除',
                    field: 'delete'
                }
            ],
            items: [
                { name: 'localportal', url: 'https://yasugahira0810.github.io/localportal/#/', tag: 'ポータル' }
            ],
            index: "",
            newItemName: null,
            newItemUrl: null,
            newItemTag: null,
        }
    },
    // add to component
    components: {
        VueGoodTable,
    },
    filters: {
        pretty: function(value) {
            return JSON.stringify(value, null, 2);
        }
    },
    mounted() {
        if (localStorage.getItem('items')) {
            try {
                this.items = JSON.parse(localStorage.getItem('items'));
                console.log(this.items)
            } catch (e) {
                localStorage.removeItem('items');
            }
        }
    },
    methods: {
        addItem() {
            if (!this.newItemName || !this.newItemUrl || !this.newItemTag) {
                return;
            }

            this.items.push({ name: this.newItemName, url: this.newItemUrl, tag: this.newItemTag });
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
.item {
    color: #42b983;
}
</style>