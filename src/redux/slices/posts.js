import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR, LOADED, LOADING } from '../../utils/consts';
import axios from '../../utils/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

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
    // получение статей
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

    // получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = LOADING;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = LOADED;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = ERROR;
    },

    // удаление статьи
    [fetchRemovePost.pending]: (state, { meta }) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
