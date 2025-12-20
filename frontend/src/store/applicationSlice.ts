import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationService } from '../api';
import { handleApiError } from '../utils/errorHandler';
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
      const applications = await ApplicationService.getApplications(filters);
      return applications;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error, 'Failed to fetch applications'));
    }
  }
);

export const fetchApplication = createAsyncThunk(
  'applications/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const application = await ApplicationService.getApplication(id);
      return application;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error, 'Failed to fetch application'));
    }
  }
);

export const createApplication = createAsyncThunk(
  'applications/create',
  async (data: CreateApplicationDTO, { rejectWithValue }) => {
    try {
      const application = await ApplicationService.createApplication(data);
      return application;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error, 'Failed to create application'));
    }
  }
);

export const updateApplication = createAsyncThunk(
  'applications/update',
  async ({ id, data }: { id: string; data: UpdateApplicationDTO }, { rejectWithValue }) => {
    try {
      const application = await ApplicationService.updateApplication(id, data);
      return application;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error, 'Failed to update application'));
    }
  }
);

export const deleteApplication = createAsyncThunk(
  'applications/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await ApplicationService.deleteApplication(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error, 'Failed to delete application'));
    }
  }
);

export const fetchStats = createAsyncThunk(
  'applications/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await ApplicationService.getStats();
      return stats;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error, 'Failed to fetch stats'));
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

