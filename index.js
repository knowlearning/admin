import { browserAgent, vuePersistentComponent } from '@knowlearning/agents'
import component from './index.vue'

window.Agent = browserAgent()

vuePersistentComponent(component)
