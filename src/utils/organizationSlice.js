import { createSlice } from "@reduxjs/toolkit";

const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    organizationData: {},
    tokens: {},
    isOrganizationLoggedIn: false,
    isActivePlan: false,
  },

  reducers: {
    addUser: (state, action) => {
      console.log("first>>>>>>><<<<<<<<<", action);
      return {
        ...state,
        organizationData: action.payload,
        tokens: action.payload.tokens,
        isOrganizationLoggedIn: action.payload.isOrganizationLoggedIn,
      };
    },
    updateUser: (state, action) => {
      return {
        ...state,
        organizationData: {
          ...state.organizationData,
          ...action.payload.organizationData,
        },
      };
    },
    updateActivePlan: (state, action) => {
      console.log("??????????????????????", action.payload);

      return { ...state, isActivePlan: action.payload.isActivePlan };
    },
    removeUser: (state, action) => {
      console.log("removing");
      state.organizationData = {}; // Reset organizationData to an empty object
      state.tokens = {};
      state.isOrganizationLoggedIn = false; // Reset tokens to an empty object
      return state;
    },
  },
});

export default organizationSlice.reducer;
export const { addUser, removeUser, updateUser, updateActivePlan } =
  organizationSlice.actions;
