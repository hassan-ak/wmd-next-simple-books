import type { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  value: string;
}

// Define the initial state using that type
const initialState: UserState = {
  value: '', // Production
  // value: 'a16934ebfce082ef5023c17ac14ab0c9958ce0a424763786c6126cae6759b0d2', // Development
};

// User Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectedUser = (state: RootState) => state.user.value;
export default userSlice.reducer;
