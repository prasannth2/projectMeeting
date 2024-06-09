import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// List projects
export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (params, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/projects/list");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update project by id
export const updateProject = createAsyncThunk(
  "standup/updateProject",
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/api/projects/update/${id}`, {
        name: title,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update projectBulk by id
export const updateProjectBulk = createAsyncThunk(
  "standup/updateProjectBulk",
  async ({ id, bulkData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/api/projects/update/${id}`,
        bulkData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// create project
export const createProject = createAsyncThunk(
  "standup/createProject",
  async (bulkData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/api/projects/create`, bulkData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// create project
export const fetchMembers = createAsyncThunk(
  "standup/fetchMembers",
  async (value, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/users`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Reset state responses
export const resetResponses = createAsyncThunk(
  "project/resetResponses",
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
  projectList: [],
  userList: [],
  projectCreateStatus: undefined,
  projectUpdateStatus: undefined,
  projectBulkUpdateStatus: undefined,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetResponses.fulfilled, (state) => {
        state.projectCreateStatus = undefined;
        state.projectUpdateStatus = undefined;
        state.loading = false;
        state.error = null;
      })
      // Handle fetchProjects actions
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createProject actions
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectCreateStatus = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateProject actions
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectUpdateStatus = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateProjectBulk actions
      .addCase(updateProjectBulk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectBulk.fulfilled, (state, action) => {
        state.loading = false;
        state.projectBulkUpdateStatus = action.payload;
      })
      .addCase(updateProjectBulk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchMembers
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
