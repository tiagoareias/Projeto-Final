import React, { Component } from "react";
import "../../CssComponents/Users/index.css"


class Index extends Component {
    constructor() {
        super();
        this.state = {
            alertText: 'Ocorreu um erro técnico. Tente novamente mais tarde',
            alertisNotVisible: true,
            alertColor: 'danger',
            data: [],
        };
    }

    componentDidMount() {
        this.getUsers();
    }

    async getUsers() {
        const response = await fetch(`http://localhost:8000/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            },
        });
        //Aguardar API
        await response.json().then(resp => {
            let status = resp.status;
            switch (status) {
                case "Failed to authenticate token.":
                    alert("Inicie sessão");
                    break;
                case "Utilizadores na Base de Dados":
                    this.setState({ data: resp.response });
                    console.log(this.state.data)
                    break;
                default:
                    console.log(this.state.alertText)
                    break;
            }

        });

    }

    render() {
        //Verifica se existe o token
        if (sessionStorage.getItem("token") == null) {
            window.location = "/";
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <h2 className="py-3 mb-3 text-center">
                                Lista de Utilizadores
                            </h2>
                        </div>
                    </div>
                    <table className="table table-sm table-hover">
                        <thead >
                            <tr id="cabecalho">
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Nome</th>
                                {/*<th scope="col"></th>*/}
                            </tr>
                        </thead>
                        <tbody id="corpo">
                            {this.state.data.map(function (obj) {
                                //let href = "/utilizadores/" + obj.userID;
                                return (
                                    <tr className="align-middle" key={obj.userID} >
                                        <td className="align-middle">{obj.email}</td>
                                        <td className="align-middle" >{obj.username}</td>
                                        <td className="align-middle"> {obj.nome}</td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
export default Index;
