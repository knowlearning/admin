<template>
  <div v-if="tables">
    <div>
      <button @click="createTable">Create new table</button>
    </div>
    <div v-for="columnInfo, tableName in tables">
      <h1>
        {{ tableName }}
        <button @click="removeTable(tableName)">x</button>
      </h1>
      <table>
        <tr>
          <th>owner</th>
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
    loading...
  </div>
</template>

<script>

const VALID_TYPES = ['integer', 'string', 'boolean']

export default {
  data() {
    return {
      tables: null
    }
  },
  async created() {
    this.tables = await Agent.mutate('tables')
  },
  methods: {
    createTable() {
      const name = prompt('Table Name:')
      if (name === null) return
      if (this.tables[name]) return alert(`Table "${name}" already exists.`)

      this.tables[name] = {}
      this.newTableName = ''
    },
    addColumn(table) {
      const name = prompt('Column Name:')
      if (!name) return
      if (this.tables[table][name]) return alert(`Column "${name}" already exists`)
      const type = prompt('Column Type:')
      if (!type) return
      if (!VALID_TYPES.includes(type)) return alert(`"${type}" is invalid. Valid types are: ${VALID_TYPES.join(' ')}`)

      this.tables[table][name] = type
    },
    removeTable(table) {
      delete this.tables[table]
    },
    removeColumn(table, column) {
      delete this.tables[table][column]
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
