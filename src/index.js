import React from 'react';
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import App from './App';
import Kanban from "./components/Kanban"
import EditCard from './components/EditCard'
import NewCard from './components/NewCard'
import './index.css'

render((
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Kanban}>
                <Route path="new" component={NewCard}/>
                <Route path="edit/:card_id" component={EditCard}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));