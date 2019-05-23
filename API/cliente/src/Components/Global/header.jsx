import React, { Component } from "react";
import '../../CssComponents/header.css';
import logo from '../../logo.png';
var jwt = require('jsonwebtoken');
class Header extends Component {


    getName() {
        var decoded = jwt.decode(sessionStorage.getItem('token'));
        var name = decoded.nome;
        console.log(name)
        return name;
    }
    logout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }

    handleSubmit = async e => {
        e.preventDefault();

        const pesquisaMusica = document.getElementById('searchMusicas').value;
        

        const response = await fetch(`http://localhost:8000/music/search/${pesquisaMusica}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    //Aguardar API
    await response.json().then(resp => {
        console.log(resp.status);
      //Verificar o estado da resposta da API
      let status = resp.response.length;
      console.log(resp.response.length);
      switch (status) {
       case 0:
           alert("sem resultados")
           break;
        case undefined:
            alert("não inseriu nada na barra")
            break;
        default:
            alert("existem " + status+" correspondências")
      }

    });

    }
    render() {

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
                        {(sessionStorage.getItem('token') == null) ? (
                            <li className="nav-item active">
                                <a className="nav-link " href="#">Músicas <span className="sr-only">(current)</span></a>
                            </li>

                        ) : (
                                <li className="nav-item active">
                                    <a className="nav-link" href="/register">Criar novos utilizadores <span className="sr-only">(current)</span></a>
                                </li>

                            )}
                    </ul>
                    <form class="form-inline my-2 my-lg-0" onChange={this.handleSubmit} onSubmit={this.handleSubmit}>
                        <input id="searchMusicas" class="form-control mr-sm-2" type="search" placeholder="Pesquisa Músicas" aria-label="Search" list="musics"></input>
                        <button class="btn btn-outline-danger my-2 my-sm-0" type="search">Search</button>
                    </form>
                    {(sessionStorage.getItem('token') == null) ? (
                        <li className="navbar-text">
                            <a className="nav-link" href="/login">Iniciar Sessão</a>
                        </li>
                    ) : ([
                        <div>
                            <li className="navbar-text">
                                <a className="nav-link" > {this.getName()}</a>
                            </li>
                            <li className="navbar-text">
                                <button class="btn btn-sm btn-secondary" type="button" onClick={this.logout}>Terminar Sessão</button>
                            </li>
                            </div>
                    ]
                        )}

                    {/* <li className="navbar-text">
                            <a className="nav-link" href="#">Registar</a>
                        </li> */}

                </div>
            </nav>
        );
    }
}


//{condição ?(

//):(

//)}


export default Header;