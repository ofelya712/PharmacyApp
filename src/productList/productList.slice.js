import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    medicine: [],
    searchMedicine: ''
}

const MedicineSlice = createSlice({
    name: "medicine",
    initialState,
    reducers: {
        medicineData: (state, action) => {
            state.medicine = action.payload

        },
        changeRating: (state, action) => {
            const { id, rating } = action.payload
            const medicine = state.medicine.find(elm => elm.id === id)
            if (medicine) {
                medicine.rating = rating
            }
        },

        searchMedicine: (state, action) => {
            state.searchMedicine = action.payload
        },
    }
})
export const medicineReducer = MedicineSlice.reducer
export const { medicineData } = MedicineSlice.actions
export const { changeRating } = MedicineSlice.actions
export const { searchMedicine } = MedicineSlice.actions