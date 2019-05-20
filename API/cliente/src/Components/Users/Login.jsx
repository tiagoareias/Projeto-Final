import React, { Component } from "react";
import '../../CssComponents/Users/login.css';
import logo from '../../logo.png';
class Login extends Component {
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
      changeStatus(){
        this.setState({ alertisNotVisible: true });
      }
    
      handleSubmit = async e => {
        e.preventDefault();
    
        //Objeto Login
        const loginData = {
          username: document.getElementById('username').value,
          hashPassword: document.getElementById('password').value
        };
       
        //Enviar pedidos
        const response = await fetch('http://localhost:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData)
        });
        //Aguardar API
        await response.json().then(resp => {
          //Verificar o estado da resposta da API
          let status = resp.status;
          if(status == 'Username ou password errados'){
            alert("Utilizador Não Autenticado")
          }
          
          if(status == 'Autenticado'){
            //console.log(resp);
            sessionStorage.setItem('token', resp.token);
            sessionStorage.setItem('nome', resp.response.nome);
            window.location = '/';
          }
            
              //sessionStorage.setItem('nome', resp.resposta.username);
              //sessionStorage.setItem('id', resp.resposta.userID);
        });
      };
    
  render() {
    return (
      
        <div class="container h-100">
        <h1 className="titleLogin">Efetue login:</h1>
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src={logo} class="brand_logo" alt="Logo"></img>
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form onSubmit={this.handleSubmit}>
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fa fa-user"></i></span>
							</div>
							<input id="username"type="text" name="" class="form-control input_user"  placeholder="username"></input>
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fa fa-key"></i></span>
							</div>
							<input id="password" type="password" name="" class="form-control input_pass" placeholder="password"></input>
						</div>
						<div class="form-group">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customControlInline"></input>
								<label class="custom-control-label" for="customControlInline">Remember me</label>
							</div>
						</div>
                        <div class="d-flex justify-content-center mt-3 login_container">
					<button type="submit" name="button" class="btn login_btn">Login</button>
				</div>

					</form>
				</div>
				<div class="mt-4">
					<div class="d-flex justify-content-center links">
						Ainda não tem conta? <a href="#" class="ml-2">Registar</a>
					</div>
					<div class="d-flex justify-content-center links">
						<a href="#">Esqueceu-se da password?</a>
					</div>
				</div>
			</div>
		</div>
	</div>
      );
  }
}

export default Login;
