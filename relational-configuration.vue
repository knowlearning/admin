<template>
  <div v-if="config">
    <div>
      <button @click="createTable">Create new table</button>
    </div>
    <div v-for="columnInfo, tableName in config.tables">
      <h1>
        {{ tableName }}
        <button @click="removeTable(tableName)">x</button>
      </h1>
      <table>
        <tr>
          <th>user</th>
          <th>id</th>
          <th v-for="columnType, columnName in columnInfo">
            {{ columnName }} ({{ columnType }})
            <button @click="removeColumn(tableName, columnName)">x</button>
          </th>
          <th>
            <button @click="addColumn(tableName)">+</button>
          </th>
        </tr>
      </table>
    </div>
  </div>
  <div v-else>
    loading config...
  </div>
</template>

<script>

const VALID_TYPES = ['integer', 'string', 'boolean']

export default {
  data() {
    return {
      config: null
    }
  },
  async created() {
    this.config = await Agent.mutate('config')
    if (!this.config.tables) this.config.tables = {}
  },
  methods: {
    createTable() {
      const name = prompt('Table Name:')
      if (name === null) return
      if (this.config.tables[name]) return alert(`Table "${name}" already exists.`)

      this.config.tables[name] = {}
      this.newTableName = ''
    },
    addColumn(table) {
      const name = prompt('Column Name:')
      if (this.config.tables[table][name]) return
      const type = prompt('Column Type:')
      if (!VALID_TYPES.includes(type)) return alert(`"${type}" is invalid. Valid types are: ${VALID_TYPES.join(' ')}`)

      this.config.tables[table][name] = type
    },
    removeTable(table) {
      delete this.config.tables[table]
    },
    removeColumn(table, column) {
      delete this.config.tables[table][column]
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
