import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatsList } from './_redux';
import { AppDispatch } from './_redux';
import { CatsState } from './interfaces/interfaces';
import Slider from './components/slider/Slider';
import Layout from './UI/layout/Layout';

function App() {
    const cats = useSelector((state: CatsState) => state.cats);
    const isLoading = useSelector((state: CatsState) => state.isLoading);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCatsList());
    }, []);

    return (
        <Layout>
            <Slider cards={cats} isLoading={isLoading} />
        </Layout>
    );
}

export default App;