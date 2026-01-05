import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Recruitment } from "@/types/types";;

const initialState: Recruitment[] = [];

const recruitmentsSlice = createSlice({
  name: "recruitments",
  initialState,
  reducers: {
    setRecruitments: (_, action: PayloadAction<Recruitment[]>) => {
      return action.payload;
    },

    changeStatus: (
      state,
      action: PayloadAction<{ id: string; status: Recruitment["status"] }>
    ) => {
      const item = state.find((r) => r.id === action.payload.id);
      if (item) item.status = action.payload.status;
    },

    archiveRecruitment: (state, action: PayloadAction<string>) => {
      const item = state.find((r) => r.id === action.payload);
      if (item) item.status = "Archived";
    },

    deleteRecruitment: (state, action: PayloadAction<string>) => {
      return state.filter((r) => r.id !== action.payload);
    },
  },
});

export const {
  setRecruitments,
  changeStatus,
  archiveRecruitment,
  deleteRecruitment,
} = recruitmentsSlice.actions;

export default recruitmentsSlice.reducer;
