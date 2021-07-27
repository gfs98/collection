import { createStore } from 'vuex'

import { user } from './modules/user'
import { menu } from './modules/menu'

export const store = createStore({
    modules: {
        user,
        menu
    },
})

export function setupStore(app) {
    app.use(store);
}
