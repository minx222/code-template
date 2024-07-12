import { createSlice } from '@reduxjs/toolkit';
const userStore = createSlice({
  name: 'counter',
  initialState: {
    count: 1,
  },
  reducers: {
    add(state) {
      state.count++;
    },
  },
});
const { add } = userStore.actions;
const reducer = userStore.reducer;

export { add };
// 导出reducer
export default reducer;
