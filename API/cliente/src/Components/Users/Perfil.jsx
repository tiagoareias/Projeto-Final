import React, { Component } from "react";

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

  render() {
    if(sessionStorage.getItem('token') != null)

    return (
      <div className="Inicio container">
        <div className="container">
          <br/>
          <div className="row">
            <div className="col-md-12 mb-3">
              <h1 className="display-4 ">Perfil</h1>
            </div>
          </div>
          <br />

        </div>
      </div>
    );
    else{
      window.location="*";
  }


  }





}

export default Perfil;