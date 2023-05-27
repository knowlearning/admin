<template>
  <div>
    <div>
      <button @click="createTable">new table</button>
      <button @click="createComputedScope">new computed scope</button>
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
          <th>updated</th>
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
    <div v-for="_, procedureName in procedures">
      <h1>{{ procedureName }} <button @click="delete procedure[procedureName]">x</button></h1>
      <textarea v-model="procedure[procedureName]" />
    </div>
    <div v-for="_, scopeName in scopes">
      <h1>{{ scopeName }} <button @click="delete scopes[scopeName]">x</button></h1>
      <textarea v-model="scopes[scopeName]" />
    </div>
  </div>
</template>

<script>

const VALID_TYPES = ['integer', 'string', 'boolean']

export default {
  props: {
    domain: String,
    config: Object
  },
  computed: {
    tables() { return this.config.tables },
    scopes() { return this.config.scopes }
  },
  methods: {
    createTable() {
      const name = prompt('Table Name:')
      if (name === null) return
      if (this.tables[name]) return alert(`Table "${name}" already exists.`)

      this.tables[name] = {}
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
    },
    createComputedScope() {
      const name = prompt('Scope Name:')
      if (name === null) return
      if (this.scopes[name]) return alert(`Computed Scope "${name}" already exists.`)

      this.scopes[name] = ''
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
