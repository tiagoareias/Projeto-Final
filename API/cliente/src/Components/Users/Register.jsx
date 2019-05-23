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
    logout() {
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
        if (sessionStorage.getItem('token') != null)
            return (
                <main className="my-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">Criar novo utilizador</div>
                                    <div className="card-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">Nome</label>
                                                <div className="col-md-6">
                                                    <input type="text" id="nome" className="form-control" name="full-name" required></input>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail</label>
                                                <div className="col-md-6">
                                                    <input type="text" id="email" className="form-control" name="email-address" required></input>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="user_name" className="col-md-4 col-form-label text-md-right">Username</label>
                                                <div className="col-md-6">
                                                    <input type="text" id="username" className="form-control" name="username" required></input>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                                <div className="col-md-6">
                                                    <input type="password" id="password" className="form-control" required></input>
                                                </div>
                                            </div>


                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn">
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
        else {
            window.location = "*";
        }
    }
}

export default Register;