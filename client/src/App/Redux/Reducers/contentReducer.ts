import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addMessage, getAllMessage } from '../../../Features/http/messageApi'

export interface IMessages {
  date: string
  message: string
  key: string
}

export interface IMessage {
  friendname: string
  messages: Array<IMessages>
}

export interface IRequestGetAll {
  username: string
  friendname: string
}

export interface IRequestAddMessage {
  username: string
  friendname: string
  message: string
}

export interface IContent {
  isLoading: boolean
  error: string
  hoverSmile: boolean
  valueInputMessage: string
  messager: IMessage
}

const initialState: IContent = {
  isLoading: false,
  error: '',
  hoverSmile: false,
  valueInputMessage: '',
  messager: {
    friendname: '',
    messages: [],
  },
}

export const fetchGetAllMessage = createAsyncThunk<IMessage, IRequestGetAll>(
  'content/message/getall',
  async (req) => {
    const { username, friendname } = req
    return (await getAllMessage(username, friendname)) as IMessage
  }
)

export const fetchAddMessage = createAsyncThunk<IMessage, IRequestAddMessage>(
  'content/message/add',
  async (req) => {
    const { username, friendname, message } = req
    return (await addMessage(username, friendname, message)) as IMessage
  }
)

export const ContentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    hoverSmile: (state, action: PayloadAction<boolean>) => {
      state.hoverSmile = action.payload
    },
    valueInputMessage: (state, action: PayloadAction<string>) => {
      state.valueInputMessage = action.payload
    },
    addInputMessage: (state, action: PayloadAction<string>) => {
      state.valueInputMessage += action.payload
    },
    setMessages: (state, action: PayloadAction<IMessages>) => {
      state.messager.messages.push({
        date: action.payload.date,
        message: action.payload.message,
        key: action.payload.key,
      })
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetAllMessage.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchGetAllMessage.fulfilled, (state, action) => {
      state.isLoading = false
      state.messager.friendname = action.payload.friendname
      state.messager.messages = action.payload.messages
      state.error = ''
    })
    builder.addCase(fetchGetAllMessage.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(fetchAddMessage.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAddMessage.fulfilled, (state, action) => {
      state.isLoading = false
      state.messager.friendname = action.payload.friendname
      state.messager.messages = action.payload.messages
      state.error = ''
    })
    builder.addCase(fetchAddMessage.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export const { hoverSmile, valueInputMessage, addInputMessage, setMessages } =
  ContentSlice.actions

export default ContentSlice.reducer
