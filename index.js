import { createApp } from 'vue'
import { browserAgent, vuePersistentComponent } from '@knowlearning/agents'
import component from './index.vue'

window.Agent = browserAgent()

const root = vuePersistentComponent(component, 'default')
const app = createApp(root)

app.mount('body')