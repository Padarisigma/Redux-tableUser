import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todolist',
  initialState : {
    data: [
      {
        id: 3,
        name: 'Azizbek Rahmonov',
        desc: 'age*',
        email: 'azizbekr@mail.com',
        phone: '111-222-3333',
        city: 'Khujand',
        status: 'Active',
        done: false,
      },
      {
        id: 4,
        name: 'Nigina Karimova',
        desc: 'age*',
        email: 'niginak@mail.com',
        phone: '444-555-6666',
        city: 'Bokhtar',
        status: 'Active',
        done: true,
      },
      {
        id: 5,
        name: 'Umar Ismoilov',
        desc: 'age*',
        email: 'umarism@mail.com',
        phone: '777-888-9999',
        city: 'Istaravshan',
        status: 'Inactive',
        done: false,
      },
      {
        id: 6,
        name: 'Sabina Nasriddinova',
        desc: 'age*',
        email: 'sabina.n@mail.com',
        phone: '159-753-4862',
        city: 'Panjakent',
        status: 'Active',
        done: true,
      },
      {
        id: 7,
        name: 'Jamshed Qodirov',
        desc: 'age*',
        email: 'jamshedq@mail.com',
        phone: '951-357-2648',
        city: 'Tursunzoda',
        status: 'Inactive',
        done: false,
      },
      {
        id: 8,
        name: 'Zarina Abdullaeva',
        desc: 'age*',
        email: 'zarinaa@mail.com',
        phone: '369-258-1470',
        city: 'Rudaki',
        status: 'Active',
        done: true,
      },
      {
        id: 9,
        name: 'Muhammad Safarov',
        desc: 'age*',
        email: 'muhammad.s@mail.com',
        phone: '753-951-8524',
        city: 'Gissar',
        status: 'Active',
        done: false,
      },
      {
        id: 10,
        name: 'Farzona Saidova',
        desc: 'age*',
        email: 'farzona.s@mail.com',
        phone: '852-159-3576',
        city: 'Norak',
        status: 'Inactive',
        done: true,
      },
      {
        id: 11,
        name: 'Shavkat Rahimov',
        desc: 'age*',
        email: 'shavkat.r@mail.com',
        phone: '147-258-3690',
        city: 'Isfara',
        status: 'Active',
        done: false,
      },
      {
        id: 12,
        name: 'Malika Hamidova',
        desc: 'age*',
        email: 'malika.h@mail.com',
        phone: '456-789-1230',
        city: 'Kulob',
        status: 'Inactive',
        done: true,
      },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.data.push({
        id: Date.now(),
        name: action.payload.name,
        desc: action.payload.desc,
        email: action.payload.email,
        phone: action.payload.phone,
        city: action.payload.city,
        status: action.payload.status,
        done: false,
      });
    },
    del: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
    edit: (state, action) => {
      const { id, newName, newDesc, newEmail, newPhone, newCity, newStatus } = action.payload;
      const todo = state.data.find((todo) => todo.id === id);
      if (todo) {
        todo.name = newName;
        todo.desc = newDesc;
        todo.email = newEmail;
        todo.phone = newPhone;
        todo.city = newCity;
        todo.status = newStatus;
      }
    },
    toggleStatus: (state, action) => {
      const todo = state.data.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { add, del, edit, toggleStatus, setData } = todoSlice.actions;
