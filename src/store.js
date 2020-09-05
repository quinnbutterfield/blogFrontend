import { createStore, combineReducers } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer

})

const persistedReducer = persistReducer(persistConfig, reducer)


export const store = createStore(
  persistedReducer,
  composeWithDevTools()
)
export const persistor = persistStore(store)