import React, { Component } from "react";
import '../../CssComponents/header.css';
import logo from '../../logo.png';
class Header extends Component {

    logout(){
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }
    render() {
        if (sessionStorage.getItem('token') == null) {
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                    <a className="navbar-brand" href="/" style={{ paddingLeft: '35px' }}>
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Ícone"
                        />
                        {" "}MER
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link " href="#">Músicas <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <li className="navbar-text">
                            <a className="nav-link" href="/login">Iniciar Sessão</a>
                        </li>
                        <li className="navbar-text">
                            <a className="nav-link" href="#">Registar</a>
                        </li>

                    </div>
                </nav>
            );
        }
        else{
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                    <a className="navbar-brand" href="/" style={{ paddingLeft: '35px' }}>
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Ícone"
                        />
                        {" "}MER
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Músicas <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <li className="navbar-text">
                            <a className="nav-link" > {sessionStorage.getItem('nome')}</a>
                        </li>
                        <li className="navbar-text">
                        <button class="btn btn-sm btn-secondary" type="button" onClick={this.logout}>Terminar Sessão</button>                       
                        </li>

                    </div>
                </nav>
            );
        }
    }
}

export default Header;
