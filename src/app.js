import React from 'react';
import Routes from './Routes';
import {
    BrowserRouter as Router
  } from 'react-router-dom';
import UseRouter from './common/hoc/useRouter';

const App = (props) => {
    return UseRouter(Routes)
};

export default App;