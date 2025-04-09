import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        open: false,
        user: null,
        emails: [],
        selectEmail: null  ,
        searchText:"",
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        setselectEmail: (state, action) => {
            state.selectEmail = action.payload;
        },
        setSearchText:(state, action) => {
            state.searchText = action.payload;
        }
        
    }
});

export const { setOpen, setAuthUser, setEmails, setselectEmail, setSearchText } = appSlice.actions;

export default appSlice.reducer;

