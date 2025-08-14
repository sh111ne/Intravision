import { createSlice } from '@reduxjs/toolkit';
import type { Task } from '../../@types/types';

type ApplicationsState = {
  applications: Task[];
};

const initialState: ApplicationsState = {
  applications: [],
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
  },
});

export const { setApplications } = applicationsSlice.actions;
export default applicationsSlice.reducer;
