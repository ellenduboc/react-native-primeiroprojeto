import React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import Routes from './routes';
import Main from './pages/Main';

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <Routes />
        </>
    );
};

Main.navigationOptions = {
    title: 'Usuários',
};
