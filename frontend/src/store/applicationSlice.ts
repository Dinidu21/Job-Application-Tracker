import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import {
  Application,
  CreateApplicationDTO,
  UpdateApplicationDTO,
  ApplicationFilters,
  ApplicationStats,
} from '../types/application';

interface ApplicationState {
  applications: Application[];
  stats: ApplicationStats | null;
  loading: boolean;
  error: string | null;
  filters: ApplicationFilters;
}

const initialState: ApplicationState = {
  applications: [],
  stats: null,
  loading: false,
  error: null,
  filters: {},
};

export const fetchApplications = createAsyncThunk(
  'applications/fetchAll',
  async (filters: ApplicationFilters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.search) params.append('search', filters.search);

      const response = await axiosInstance.get<Application[]>(
        `/applications?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

export const fetchApplication = createAsyncThunk(
  'applications/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Application>(`/applications/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch application');
    }
  }
);

export const createApplication = createAsyncThunk(
  'applications/create',
  async (data: CreateApplicationDTO, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Application>('/applications', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create application');
    }
  }
);

export const updateApplication = createAsyncThunk(
  'applications/update',
  async ({ id, data }: { id: string; data: UpdateApplicationDTO }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<Application>(`/applications/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update application');
    }
  }
);

export const deleteApplication = createAsyncThunk(
  'applications/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/applications/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete application');
    }
  }
);

export const fetchStats = createAsyncThunk(
  'applications/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ApplicationStats>('/applications/stats');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ApplicationFilters>) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action: PayloadAction<Application[]>) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createApplication.fulfilled, (state, action: PayloadAction<Application>) => {
        state.applications.unshift(action.payload);
      })
      .addCase(updateApplication.fulfilled, (state, action: PayloadAction<Application>) => {
        const index = state.applications.findIndex((app) => app._id === action.payload._id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
      })
      .addCase(deleteApplication.fulfilled, (state, action: PayloadAction<string>) => {
        state.applications = state.applications.filter((app) => app._id !== action.payload);
      })
      .addCase(fetchStats.fulfilled, (state, action: PayloadAction<ApplicationStats>) => {
        state.stats = action.payload;
      })
      .addCase(fetchApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplication.fulfilled, (state, action: PayloadAction<Application>) => {
        state.loading = false;
        const index = state.applications.findIndex((app) => app._id === action.payload._id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        } else {
          state.applications.push(action.payload);
        }
      })
      .addCase(fetchApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearError } = applicationSlice.actions;
export default applicationSlice.reducer;

