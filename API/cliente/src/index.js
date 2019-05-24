import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import IndexPage from '../src/MasterComponents/IndexPage';
import LoginPage from '../src/MasterComponents/Users/LoginPage';
import NotFindPage from './Components/Global/NotFindPage';
import RegisterPage from './MasterComponents/Users/RegisterPage';
import PerfilPage from './MasterComponents/Users/PerfilPage'
import IndexPesquisaPage from './MasterComponents/Music/IndexPesquisaPage';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={IndexPage} />
            <Route path="/login"component={LoginPage} />
            <Route path="/registar"component={RegisterPage} />
            <Route path="/utilizador/Perfil" component = {PerfilPage} />
            <Route path="/music/pesquisa" component = {IndexPesquisaPage}/>
            <Route path='*' component={NotFindPage} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root')
);

serviceWorker.unregister();