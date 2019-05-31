import React, { Component } from "react";
var jwt = require('jsonwebtoken');

class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      alertText: '',
      alertisNotVisible: true,
      alertColor: 'danger',
      dataGet: [],
      dataPost: []
    };
  }

  componentDidMount() {
    var decoded = jwt.decode(sessionStorage.getItem('token'));
    var username = decoded.username;
    this.getDetails(username);
  }

  async refreshToken() {
    var decoded = jwt.decode(sessionStorage.getItem('token'));
    var nome = decoded.nome;
    var username = decoded.username;
    const dataToken = {
      username,
      nome
    }
    console.log(dataToken);
    const response = await fetch('http://localhost:8000/token/refresh',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToken)    
    });

    await response.json().then(resp => {
      console.log(resp.response)
      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Token Atualizado":
          sessionStorage.clear();
          sessionStorage.setItem('token', resp.response);
          break;
       
        default:
          window.location="/"
      }
    });  
  }

  getDetails = async (username) => {
    const response = await fetch(`http://localhost:8000/user/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      },
    });

    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Utilizador está na base de dados":
          this.setState({ dataGet: resp.response });
          break;
        case "Nao está autenticado | token expirou":
          this.refreshToken();
          this.getDetails(username);
          break;
        default:
          console.log("erro")
          break;
      }
    })
  }


  handleSubmit = async e => {
    e.preventDefault();

    var decoded = jwt.decode(sessionStorage.getItem('token'));
    var usernameURL = decoded.username;
    //const nome = document.getElementById('nome').value;
    //const email = document.getElementById('email').value;
    //const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const dados = { /*'nome': nome, 'email': email, 'username': username, */'hashPassword': password }
    const response = await fetch(`http://localhost:8000/user/${usernameURL}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(dados)
    })

    await response.json().then(resp => {
      let status = resp.status;
      console.log(status)
      switch (status) {
        case "Updated":
          this.setState({ dataPost: resp.response });
          alert("Dados guardados")

          window.location = "/";
          break;
        case "Nao está autenticado | token expirou":
         this.refreshToken();
         this.handleSubmit(e);
          break;
        default:
          console.log("erro")
          break;
      }
    })
  }

  render() {
    if (sessionStorage.getItem('token') != null)

      return (
        <div className="Inicio container">
          <div className="container">
            <br />
            <div className="row">
              <div className="col-md-12 mb-3">
                <h1 className="display-4 ">Perfil</h1>
              </div>
            </div>
            <br />
            <main className="my-form">
              <div className="cotainer">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">Os meus dados</div>
                      <div className="card-body">
                        <form onSubmit={this.handleSubmit}>

                          <div className="form-group row">
                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail</label>
                            <div className="col-md-6">
                              <input type="text" id="email" className="form-control" name="email-address" placeholder={this.state.dataGet.email} readOnly></input>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label htmlFor="username" className="col-md-4 col-form-label text-md-right">Username</label>
                            <div className="col-md-6">
                              <input type="text" id="username" className="form-control" name="username" placeholder={this.state.dataGet.username} readOnly></input>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label htmlFor="nome" className="col-md-4 col-form-label text-md-right">Nome</label>
                            <div className="col-md-6">
                              <input type="text" id="nome" className="form-control" name="full-name" placeholder={this.state.dataGet.nome} readOnly></input>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                            <div className="col-md-6">
                              <input type="password" id="password" className="form-control" placeholder="********" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" title="Introduza pelo menos 8 caracteres, incluindo letras maíusculas, minusculas, algarismos e caracteres especiais" required></input>
                            </div>
                          </div>


                          <div className="col-md-6 offset-md-4">
                            <button type="submit" className="btn"> Alterar password </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </main>
          </div>
        </div>
      );
    else {
      window.location = "*";
    }


  }





}

export default Perfil;