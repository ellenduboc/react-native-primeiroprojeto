import React from 'react';

import './config/ReactotronConfig';

import Routes from './routes';
import Main from './pages/Main';

export default function App() {
    return (
        <Routes />
    );
};

Main.navigationOptions = {
    title: 'Usuários',
};
