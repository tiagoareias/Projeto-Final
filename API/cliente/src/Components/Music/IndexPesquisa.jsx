import React, { Component } from "react";
import '../../CssComponents/index.css'
class IndexPesquisa extends Component {

  constructor() {
    super();
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger",
      dataGet: window.history.state.response,
      dataPost: []
    }
  }
  componentDidMount(){
    //console.log(window.history.state.response);
   //this.setState({dataGet:window.history.state.response});
    //this.dataGet = window.history.state.response;
    console.log(this.state.dataGet);
  }
  
  handleSubmit = async e => {
    e.preventDefault();


    
  };

 

  render() {
    return (

      <div className="Inicio container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-3">
              <h1 className="display-5 text-center">Resultados da Pesquisa:</h1>
               <p>{this.state.dataGet[0].name}</p> 
            </div>
          </div>
          <br />
        </div>
      </div>

    );
  }
}

export default IndexPesquisa;
