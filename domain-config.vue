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
    <button v-if="domain" @click="removeDomainConfig">x</button>
    <button @click="claim">claim new domain</button>
    <div v-if="domain ">
      config yaml: <input v-model="config[domain].config" />
    </div>
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
      if (!this.config[domain]) {
        this.config[domain] = {
          config: null
        }
      }
    },
    async removeDomainConfig() {
      if (confirm(`Are you sure you want to remove your configuration for "${this.domain}"`)) {
        delete this.config[this.domain]
        this.domain = null
      }
    }
  }
}

</script>