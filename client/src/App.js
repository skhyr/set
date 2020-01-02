import React from 'react';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import Rooms from './components/Rooms';
import Game from './components/Game';

const App = () =>(
<Router>
    <Route path='/' exact component={Rooms}/>
    <Route path='/game' exact component={Game}/>
</Router>
);
export default App;