import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { THE_CAT_API } from '../constants/constants';
import { Breed, CatsState } from '../interfaces/interfaces';

export type AppDispatch = typeof store.dispatch;

const initialState: CatsState = {
    cats: [],
    isLoading: false,
};

export const catsSlice = createSlice({
    name: 'cats',
    initialState: initialState,
    reducers: {
        setCats: (state, action: PayloadAction<Breed[]>) => {
            state.cats = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const catsActions = catsSlice.actions;

const store = configureStore({
    reducer: catsSlice.reducer,
});

export const fetchCatsList = () => async (dispatch: any) => {
    dispatch(catsSlice.actions.setIsLoading(true));

    try {
        const response = await axios.get<Breed[]>(THE_CAT_API);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        dispatch(catsSlice.actions.setCats(response.data));
    } catch (error) {
        console.error('There was a problem with the axios operation:', error);
    } finally {
        dispatch(catsSlice.actions.setIsLoading(false));
    }
};

export default store;