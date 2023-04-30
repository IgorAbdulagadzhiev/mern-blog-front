import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR, LOADED, LOADING } from '../../utils/consts';
import axios from '../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: LOADING,
  },
  tags: {
    items: [],
    status: LOADING,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = LOADING;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = LOADED;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = ERROR;
    },
  },
});

export const postsReducer = postsSlice.reducer;
