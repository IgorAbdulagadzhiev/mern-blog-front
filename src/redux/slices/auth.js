import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR, LOADED, LOADING } from '../../utils/consts';
import axios from '../../utils/axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async (params) => {
    const { data } = await axios.get('/auth/me', params);
    return data;
  }
);


const initialState = {
  data: null,
  status: LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = LOADING;
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = LOADED;
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = ERROR;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = LOADING;
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = LOADED;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = ERROR;
    },
    [fetchRegister.pending]: (state) => {
      state.status = LOADING;
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = LOADED;
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = ERROR;
    },
  },
});

export const selectIsAuth = (state) => state.auth.data

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;