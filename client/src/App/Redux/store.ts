import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReduser from './Reducers/userReducer'
import contentReduser from './Reducers/contentReducer'

const rootRedusers = combineReducers({
  userReduser,
  contentReduser,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootRedusers,
  })
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootRedusers>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
