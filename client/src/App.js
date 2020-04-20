import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {InfoProvider} from './components/contexts/InfoContext';
import {ScoreProvider} from './components/contexts/ScoreContext';
import {FunctionProvider} from './components/contexts/FunctionContext';
import Rooms from './components/Rooms';
import Game from './components/Game';

function App() {
return(
<InfoProvider>
    <ScoreProvider>
        <FunctionProvider>
            <Router>
                <Route path='/' exact component={Rooms}/>
                <Route path='/game' exact component={Game}/>
            </Router>
        </FunctionProvider>
    </ScoreProvider>
</InfoProvider>
);
}
export default App;