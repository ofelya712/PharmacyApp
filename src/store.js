import { configureStore } from "@reduxjs/toolkit";
import { medicineReducer } from "./productList/productList.slice";


export const store = configureStore({
    reducer: medicineReducer

})