import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  checkAuth,
  login,
  logout,
  registration,
} from '../../../Features/http/userApi'
import { addFriendReq } from '../../../Features/http/friendsApi'

export interface IUser {
  username: string
  profilePicture: string
  followers: any[]
  iat: any
  exp: any
}
export interface IFriendAdd {
  username: string
  friendname: string
}
export interface ILogin {
  username: string
  password: string
}
export interface UserState {
  user: IUser
  isLoading: boolean
  error: any
}

const initialUserState: UserState = {
  user: {
    username: '',
    profilePicture: '',
    followers: [],
    iat: null,
    exp: null,
  },
  isLoading: false,
  error: null,
}

export const fetchCheckAuth = createAsyncThunk('user/check', async () => {
  return (await checkAuth()) as IUser
})

export const fetchLogin = createAsyncThunk<IUser, ILogin>(
  'user/login',
  async (req) => {
    const { username, password } = req
    return (await login(username, password)) as IUser
  }
)

export const fetchLogout = createAsyncThunk('user/logout', async () => {
  return await logout()
})

export const fetchRegistration = createAsyncThunk<IUser, ILogin>(
  'user/registration',
  async (req) => {
    const { username, password } = req
    return (await registration(username, password)) as IUser
  }
)

export const friendAdd = createAsyncThunk<IUser, IFriendAdd>(
  'user/add',
  async (req) => {
    const { username, friendname } = req
    return (await addFriendReq(username, friendname)) as IUser
  }
)

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    // setUser(state, action: PayloadAction<UserState>) {
    //   state = action.payload
    // },
    // username(state, action: PayloadAction<string>) {
    //   state.username = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCheckAuth.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCheckAuth.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = ''
    })
    builder.addCase(fetchCheckAuth.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(friendAdd.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(friendAdd.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = ''
    })
    builder.addCase(friendAdd.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = ''
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(fetchRegistration.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = ''
    })
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(fetchLogout.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = initialUserState.user
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export default UserSlice.reducer
