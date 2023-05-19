<template>
  <div v-if="config">
    <div v-for="columns, tableName in config.tables" :key="tableName">
      <h1>{{ tableName }}</h1>
      <table>
        <tr>
          <th>column</th>
          <th>type</th>
          <th>pattern</th>
          <th></th>
        </tr>
        <tr v-for="{ pattern, type }, columnName in columns">
          <td>{{ columnName }}</td>
          <td>{{ type }}</td>
          <td>{{ pattern }}</td>
          <td>
            <button @click="removeColumn(tableName, columnName)">remove</button>
          </td>
        </tr>
      </table>
    </div>
    <h3>New SQL Mapping</h3>
    <h4>table</h4>
    <input v-model="newMapping.table" />
    <h4>column</h4>
    <input v-model="newMapping.column" />
    <h4>type</h4>
    <select v-model="newMapping.type">
      <option>boolean</option>
      <option>integer</option>
      <option>string</option>
    </select>
    <h4>pattern</h4>
    <input v-model="newMapping.pattern" />
    <button @click="createNewMapping">Create</button>
  </div>
  <div v-else>
    loading config...
  </div>
</template>

<script>

const copy = x => JSON.parse(JSON.stringify(x))

const DEFAULT_NEW_MAPPING = {
  pattern: '',
  table: '',
  column: '',
  type: 'boolean'
}

export default {
  data() {
    return {
      newMapping: copy(DEFAULT_NEW_MAPPING),
      config: null
    }
  },
  async created() {
    this.config = await Agent.mutate('config')
    if (!this.config.tables) this.config.tables = {}
  },
  methods: {
    createNewMapping() {
      const { pattern, table, column, type } = this.newMapping
      this.newMapping = copy(DEFAULT_NEW_MAPPING)
      const { tables } = this.config

      if (!tables[table]) tables[table] = {}
      if (!tables[table][column]) tables[table][column] = {}
      tables[table][column] = { pattern, type }
    },
    removeColumn(table, column) {
      delete this.config.tables[table][column]
      if (Object.keys(this.config.tables[table]).length === 0) delete this.config.tables[table]
    }
  }
}

</script>

<style scoped>


th, td {
  text-align: left;
  padding: 4px 16px;
}

</style>
