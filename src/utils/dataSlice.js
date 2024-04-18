import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   data: [],
//   // other initial state properties if any
// };
const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    addData(state, action) {
      console.log("adding file data", action.payload);
      return [...action.payload];
    },
    updateData(state, action) {
      const { id, newData } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      );
    },
    updateDataList(state, action) {
      const newData = action.payload;
      console.log("new data:", action.payload);
      return state.map((item) =>
        item.id === newData.id ? { ...item, ...newData } : item
      );
    },
    deleteData(state, action) {
      console.log("delete from state", state, action.payload);
      const itemToRemove = action.payload;
      console.log(itemToRemove);
      return state.filter((item) => item.id !== itemToRemove);
    },
    clearData(state, action) {
      return [];
    },
  },
});

export const { addData, updateData, updateDataList, deleteData, clearData } =
  dataSlice.actions;
export default dataSlice.reducer;
