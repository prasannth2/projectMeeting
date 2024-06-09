import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// List users for specific project
export const fetchMembers = createAsyncThunk(
  "standup/fetchMembers",
  async ({projectId}, thunkAPI) => {
    console.log(projectId)
    try {
      const response = await axiosInstance.get(`/api/projects/${projectId}/members`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// List Reponse points for specific project, data, questionID, members
export const fetchQuestionResponse = createAsyncThunk(
  "standup/fetchQuestionResponse",
  async ({ projectId, date, questionId, memberId }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/standups/responses/${projectId}/${date}?questionId=${questionId}&memberId=${memberId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// create standupresponse
export const createStandupData = createAsyncThunk(
  "standup/createStandupData",
  async (value, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/api/standups/responses`,
        value
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update standupresponse by id
export const updateStandupData = createAsyncThunk(
  "standup/updateStandupData",
  async ({ id, value }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/api/standups/responses/${id}`,
        {
          response: value,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Reset state responses
export const resetResponses = createAsyncThunk(
  "standup/resetResponses",
  async (_, thunkAPI) => {
    try {
      // Simulate an async operation (could be any API call or delay)
      return Promise.resolve();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: [],
  qsResponses: [],
  updateStandupResonse: null,
  createStandupResonse: null,
  loading: false,
  error: null,
};

const sampleSlice = createSlice({
  name: "standup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetResponses.fulfilled, (state) => {
        state.createStandupResonse = null;
        state.updateStandupResonse = null;
        state.loading = false;
        state.error = null;
      })
      // Handle fetchMembers actions
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchQuestionResponse actions
      .addCase(fetchQuestionResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.qsResponses = action.payload;
      })
      .addCase(fetchQuestionResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createStandupData
      .addCase(createStandupData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStandupData.fulfilled, (state, action) => {
        state.loading = false;
        state.createStandupResonse = action.payload;
      })
      .addCase(createStandupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateStandupData
      .addCase(updateStandupData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStandupData.fulfilled, (state, action) => {
        state.loading = false;
        state.updateStandupResonse = action.payload;
      })
      .addCase(updateStandupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sampleSlice.reducer;
