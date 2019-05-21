import React, { Component } from "react";
import '../../CssComponents/Users/register.css';
//import logo from '../../logo.png';
class Register extends Component {
    constructor() {
        super();
        this.state = {
            alertText: 'Utilizador ou palavra-passe erradas',
            alertisNotVisible: true,
            alertColor: 'danger'
        };
        this.changeStatus = this.changeStatus.bind(this);
    }

    //Altera o estado conforme o Alert
    changeStatus() {
        this.setState({ alertisNotVisible: true });
    }
    logout(){
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }

    handleSubmit = async e => {
        e.preventDefault();
        //Objeto Login
        const registerData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            hashPassword: document.getElementById('password').value

        };

        //Enviar pedidos
        const response = await fetch('http://localhost:8000/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(registerData)
        });
        await response.json().then(resp => {
            console.log(resp);
            //Verificar o estado da resposta da API
            let status = resp.status;
            switch (status) {
                case "Email e/ou username já existe(m) na base de dados":
                  alert("Email e/ou username já existe(m) na base de dados")
                  break;
                case "Erros na validação":
                  alert("Erros na validação")
                  break;
                case "Utilizador Criado com Sucesso":
                  alert("Utilizador criado com sucesso")
                  window.location = '/';
                  break;
                case "Nao está autenticado | token expirou":
                    this.logout();
                  window.location = '/login'
                  
                  break;
                default:
                  console.log(this.state.alertText)
              }
                });
    };

    render() {
        if(sessionStorage.getItem('token') != null)
        return (
            <main class="my-form">
                <div class="cotainer">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header">Criar novo utilizador</div>
                                <div class="card-body">
                                <form onSubmit={this.handleSubmit}>
                                        <div class="form-group row">
                                            <label for="full_name" class="col-md-4 col-form-label text-md-right">Nome</label>
                                            <div class="col-md-6">
                                                <input type="text" id="nome" class="form-control" name="full-name" required></input>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail</label>
                                            <div class="col-md-6">
                                                <input type="text" id="email" class="form-control" name="email-address" required></input>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="user_name" class="col-md-4 col-form-label text-md-right">Username</label>
                                            <div class="col-md-6">
                                                <input type="text" id="username" class="form-control" name="username" required></input>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                            <div class="col-md-6">
                                                <input type="password" id="password" class="form-control" required></input>
                                            </div>
                                        </div>


                                        <div class="col-md-6 offset-md-4">
                                            <button type="submit" class="btn">
                                                Criar Utilizador
                                        </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        );
        else{
            window.location="*";
        }
    }
}

export default Register;