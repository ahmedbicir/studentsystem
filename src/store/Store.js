import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './StudentSlice'


export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
})