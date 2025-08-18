import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Priority, Status, Task, User } from '../../@types/types';

type ApplicationsState = {
  applications: Task[];
  statuses: Status[];
  priorities: Priority[];
  users: User[];
};

const initialState: ApplicationsState = {
  applications: [],
  statuses: [],
  priorities: [],
  users: [],
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action: PayloadAction<Task[]>) => {
      state.applications = action.payload;
    },
    setStatuses: (state, action: PayloadAction<Status[]>) => {
      state.statuses = action.payload;
    },
    setPriorities: (state, action: PayloadAction<Priority[]>) => {
      state.priorities = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setApplications, setStatuses, setPriorities, setUsers } = applicationsSlice.actions;
export default applicationsSlice.reducer;
