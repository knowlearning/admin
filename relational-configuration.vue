<template>
  <div>
    <h1>
      Tables
      <button @click="createTable">+</button>
    </h1>
    <div v-for="columnInfo, tableName in tables">
      <h2>
        {{ tableName }}
        <button @click="removeTable(tableName)">x</button>
      </h2>
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
    <h1>
      Functions
      <button @click="createFunction">+</button>
    </h1>
    <div v-for="_, functionName in functions">
      <h2>
        {{ functionName }}
        <button @click="delete functions[functionName]">x</button>
      </h2>
      <textarea v-model="functions[functionName]" />
    </div>
    <h1>
      Scopes
      <button @click="createComputedScope">+</button>
    </h1>
    <div v-for="_, scopeName in scopes">
      <h2>
        {{ scopeName }}
        <button @click="delete scopes[scopeName]">x</button>
      </h2>
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
    scopes() { return this.config.scopes },
    functions() { return this.config.functions }
  },
  methods: {
    createTable() {
      const name = prompt('Table Name:')
      if (name === null) return
      if (this.tables[name]) return alert(`Table "${name}" already exists.`)

      this.tables[name] = {}
    },
    createFunction() {
      const name = prompt('Function Name:')
      if (name === null) return
      if (this.functions[name]) return alert(`Table "${name}" already exists.`)

      this.functions[name] = ''
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
