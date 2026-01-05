import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState= {
  selectedCountryCode: "US",
}

export const countrySlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<{ code: string; label: string }>) => {
      state.selectedCountryCode = action.payload.code
    },
  },
})

export const { setCountry } = countrySlice.actions
export default countrySlice.reducer
