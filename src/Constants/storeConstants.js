

import { store } from ".."

const InitializeWindowStore = () => {
    window.store = store
    window.state = store.getState()
    console.log('Store initialized', window.state)
}

export default InitializeWindowStore