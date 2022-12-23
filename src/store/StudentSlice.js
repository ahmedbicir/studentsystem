import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  students: [],
  studentToView: {}
};

export const createStudent = createAsyncThunk(
  "students/create",
  async ({firstName, middleName, lastName, phone, nationalId, email, county, message, gender}) => {
    const res = await axios.post('http://127.0.0.1:8000/mini_app/all_students/', {
        firstName,
        middleName,
        lastName,
        phone,
        nationalId,
        email,
        county,
        message,
        gender
      });
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id) => {
     const res = await axios.put(`http://127.0.0.1:8000/mini_app/all_students/${id}/`,{isActive: false});
    return id;
  }
);

export const retrieveStudents = createAsyncThunk(
  "students/retrieve",
  async () => {
    const res = await axios.get('http://127.0.0.1:8000/mini_app/all_students/');
    return res.data;
  }
);

export const viewStudent = createAsyncThunk(
  "students/view",
  async (id) => {
    const res = await axios.get(`http://127.0.0.1:8000/mini_app/all_students/${id}/`);
    return res.data;
  }
); 

const studentsSlice = createSlice({
  name: "students",
  initialState,
  extraReducers: {
    [createStudent.fulfilled]: (state, action) => state.students.push(action.payload),
    // [retrieveStudents.fulfilled]: (state, action) => [...action.payload],
    [retrieveStudents.fulfilled]: (state, action) => {
      return {
        ...state, students: action.payload
      }
    },
    [viewStudent.fulfilled]: (state, action) => {
      return {
        ...state, studentToView: action.payload
      }
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.students.splice(state.students.findIndex( student => student.id===action.payload),1)
    },
  },
});

export default studentsSlice.reducer;