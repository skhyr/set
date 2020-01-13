import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {InfoProvider} from './components/InfoContext'
import Rooms from './components/Rooms';
import Game from './components/Game';

const App = () =>(
<InfoProvider>
<Router>
    <Route path='/' exact component={Rooms}/>
    <Route path='/game' exact component={Game}/>
</Router>
</InfoProvider>
);
export default App;