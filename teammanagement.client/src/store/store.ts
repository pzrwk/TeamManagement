import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { MemberData } from "../App";

export type Sort = {
  key: keyof MemberData;
  order: "asc" | "desc";
};

export type TeamManagementState = {
  membersData: MemberData[];
  sort: Sort;
};

const initialState: TeamManagementState = {
  membersData: [],
  sort: {
    key: "name",
    order: "asc",
  },
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    initialLoad: (
      state: TeamManagementState,
      action: PayloadAction<MemberData[]>
    ) => {
      state.membersData = action.payload;
    },
    addMember: (
      state: TeamManagementState,
      action: PayloadAction<MemberData>
    ) => {
      state.membersData.push(action.payload);
    },
    updateMember: (
      state: TeamManagementState,
      action: PayloadAction<MemberData>
    ) => {
      const index = state.membersData.findIndex(
        (member) => member.id === action.payload.id
      );
      if (index !== -1) {
        state.membersData[index] = action.payload;
      }
    },
    sortMembers: (
      state: TeamManagementState,
      action: PayloadAction<keyof MemberData>
    ) => {
      if (state.sort.key === action.payload) {
        state.sort.order = state.sort.order === "asc" ? "desc" : "asc";
      } else {
        state.sort.key = action.payload;
        state.sort.order = "asc";
      }
    },
  },
});

export const { initialLoad, addMember, updateMember, sortMembers } =
  memberSlice.actions;

export const store = configureStore({
  reducer: memberSlice.reducer,
});
