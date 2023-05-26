<template>
  <div v-if="config">
    <select v-model="domain">
      <option
        v-for="_, domain in config"
        :key="domain"
      >
        {{ domain }}
      </option>
    </select>
    <button @click="claim">claim new domain</button>
    <RelationalConfiguration
      v-if="domain"
      :domain="domain"
      :config="config[domain]"
    />
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>

import RelationalConfiguration from './relational-configuration.vue'

export default {
  components: {
    RelationalConfiguration
  },
  data() {
    return {
      domain: null,
      config: null
    }
  },
  async created() {
    this.config = await Agent.mutate('config')
  },
  methods: {
    async claim() {
      const domain = prompt('Domain to claim:')
      const { token } = await Agent.claim(domain)
      alert(`Set "${token}" as record at "${domain}" to get admin status.`)
      if (!this.config.domain) this.config[domain] = {
        tables: {},
        authorizations: {},
        scopes: {}
      }
    }
  }
}

</script>