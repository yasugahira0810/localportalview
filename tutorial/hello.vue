<template>
    <div>
        名前：<input v-model="newItemName" /> URL：
        <input v-model="newItemUrl" /> タグ：
        <input v-model="newItemTag" />
        <button @click="addItem">Submit</button>
        <button @click="truncateItems">Truncate</button>
        <h2>localportalview</h2>
        <vue-good-table :columns="columns" :rows="items" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'click'">
                                                      <button @click="jumpToUrl(props.row.url)">Click</button>
                                                    </span>
                <span v-else-if="props.column.field == 'delete'">
                                                      <button @click="removeItem(props.row.originalIndex)">Delete</button>
                                                    </span>
                <span v-else>
                                                      <div v-if="!isEditable" v-on:dblclick="isEditable = true">{{ props.formattedRow[props.column.field] }}</div>
                                                      <div v-else><input type="text" v-model="props.formattedRow[props.column.field]" v-on:blur="updateItem(props)"></div>
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
                    label: 'リンク',
                    field: 'click',
                },
                {
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
                    filterOptions: {
                        enabled: true, // enable filter for this column
                        placeholder: '🔍　絞り込み検索'
                    },
                },
                {
                    label: '削除',
                    field: 'delete'
                }
            ],
            items: [],
            index: "",

            newItemName: null,
            newItemUrl: null,
            newItemTag: null,
            isEditable: false,
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
        removeItem(index) {
            this.items.splice(index, 1);
            this.saveItems();
        },
        saveItems() {
            const parsed = JSON.stringify(this.items);
            localStorage.setItem('items', parsed);
        },
        updateItem(editItem) {
            this.items.splice(editItem.row.originalIndex, 1, editItem.formattedRow);
            this.saveItems();
            this.isEditable = false;
        },
        truncateItems() {
            this.items = [{ name: 'localportal', url: 'https://yasugahira0810.github.io/localportal/#/', tag: 'ポータル' },
                { name: 'vue-good-table', url: 'https://xaksis.github.io/vue-good-table/', tag: 'Vue' }
            ];
            this.saveItems();
        },
        jumpToUrl(url) {
            window.open(url, '_blank');
        },
    }
}
</script>

<style>
.item {
    color: #42b983;
}
</style>