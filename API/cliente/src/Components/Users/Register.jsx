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
      changeStatus(){
        this.setState({ alertisNotVisible: true });
      }
    
      handleSubmit = async e => {
        e.preventDefault();
    
      
      };
    
  render() {
    return (
<main class="my-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Criar novo utilizador</div>
                        <div class="card-body">
                            <form name="my-form" onsubmit="return validform()" action="success.php" method="">
                                <div class="form-group row">
                                    <label for="full_name" class="col-md-4 col-form-label text-md-right">Nome</label>
                                    <div class="col-md-6">
                                        <input type="text" id="full_name" class="form-control" name="full-name"></input>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail</label>
                                    <div class="col-md-6">
                                        <input type="text" id="email_address" class="form-control" name="email-address"></input>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="user_name" class="col-md-4 col-form-label text-md-right">UserName</label>
                                    <div class="col-md-6">
                                        <input type="text" id="user_name" class="form-control" name="username"></input>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                    <div class="col-md-6">
                                        <input type="password" id="password" class="form-control"></input>
                                    </div>
                                </div>


                                    <div class="col-md-6 offset-md-4">
                                        <button type="submit" class="btn">
                                        Register
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
  }
}

export default Register;