import React, { Component } from "react";
import '../../CssComponents/index.css';
import AlertMsg from '../Global/AlertMsg';
var jwt = require('jsonwebtoken');

class Index extends Component {

  constructor() {
    super();
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "danger",
      dataGet: [],
      dataPost: []
    }
  }

  componentDidMount() {
    this.getLastVideos();
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  }


  async getLastVideos() {
    const response = await fetch('http://localhost:8000/music', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      }
    });

    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Últimas músicas classificadas":
          this.setState({ dataGet: resp.response });
          break;
        case "token expired":
          this.refreshToken();
          this.getLastVideos();
          break;
        default:
          console.log(this.state.alertText)
      }
    })
  }

  async refreshToken() {
    var decoded = jwt.decode(sessionStorage.getItem('token'));
    var nome = decoded.nome;
    var username = decoded.username;
    const dataToken = {
      username,
      nome
    }
    const response = await fetch('http://localhost:8000/token/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToken)
    });

    await response.json().then(resp => {
      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Token Atualizado":
          sessionStorage.clear();
          sessionStorage.setItem('token', resp.response);
          break;

        default:
          window.location = "/"
      }
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    //Objeto URL
    const urlInput = document.getElementById("urlInput").value;

    const response = await fetch('http://localhost:8000/music/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "url": urlInput })

    }
    );
    //Aguardar API
    await response.json().then(resp => {
      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Upload":
          this.setState({ dataPost: resp.response });
          alert("Adicionada")
          window.location = "/";
          break;
        case "URL já existe na base de dados":
          this.setState({ dataPost: resp.response });
          this.setState({
            alertText: "URL já existe na base de dados",
            alertisNotVisible: false,
            alertColor: "warning"
          });
          break;
        case "Foram feitos demasiados uploads nos últimos minutos! Volte a tentar mais tarde":
            this.setState({
              alertText: "Excedeu o número de uploads permitidos nos últimos minutos",
              alertisNotVisible: false,
              alertColor: "warning"
            });
            break;
          default:
          alert(this.state.alertText);
      }
    });
  }

  eliminarMusica = async e => {
    const id = e.target.id;
    const response = await fetch(`http://localhost:8000/music/${id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": sessionStorage.getItem("token")
      }
    }
    );
    //Aguardar API
    await response.json().then(resp => {

      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Failed to authenticate token.":
          alert("Inicie sessão");
          break;
        case "Deleted":
          alert("Vídeo Apagado")
          window.location = "/";
          break;
        case "Not Deleted | Música não está na base de dados":
          alert("Música não está na base de dados")
          break;
        default:
          alert(this.state.alertText);
      }
    });
  }


  render() {
    return (

      <div className="Inicio container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-3">
              <h1 className="display-3 text-center">MER - PÁGINA PRINCIPAL</h1>
            </div>
          </div>
          <br />

          {/*URL*/}
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3 d-flex justify-content-center">
              <div className="input-group-prepend ">
                <span className="input-group-text font-weight-bold" >URL</span>
              </div>
              <input type="text" id="urlInput" pattern="^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+" placeholder=" Introduza o URL " required />
              <div className="input-group-append">
                <button type="submit" className="btn btn-dark"> Classificar </button>
              </div>
            </div>
          </form>
          <AlertMsg
                  text={this.state.alertText}
                  isNotVisible={this.state.alertisNotVisible}
                  alertColor={this.state.alertColor}
                />
          <br />
          <div className="row">
            <div className="col-md-12 mb-3">
              <h4 className="font-style-underline"> <u>Últimas músicas classificadas: </u></h4>
            </div>
          </div>

          {
            this.state.dataGet.map((data, index) => {
              return (
                <div key={index} className="row">
                  <div>
                    <iframe id="frame" src={"https://www.youtube.com/embed/" + data.idVideo}
                      title={data.name} autoPlay allowFullScreen></iframe>
                  </div>
                  <div>
                    <div className="col-md-12 mb-3" id="frame">
                      <h4><u>Autor</u>: {data.autor}</h4>
                      <br />
                      <h5 className="font-weight-bold ">{data.name}</h5>
                      <br />
                      <div className="text-secondary" >
                        <h6 id="likes"> <i className="fa fa-thumbs-o-up"></i> <i>{data.numLikes}</i></h6>
                        <h6 id="likes"> <i className="fa fa-thumbs-o-down"></i> <i >{data.numDislikes}</i></h6>
                      </div>
                      <h6 className="text-secondary"><i >{data.numViews}</i> Visualizações </h6>
                      <h6 className="text-secondary"> Publicado a <i > {data.dataPublicacao.substring(0, 10)}</i></h6>
                      {/*EMOCAO*/}
                      {/*<h5 className="font-weight-bold "> Emoção: <i > {data.emocao} </i></h5>*/}
                      <h5 className="font-weight-bold "> Emoção: <i className="text-secondary"> Emotion </i></h5>
                      {/*Botão Eliminar*/}
                      {(sessionStorage.getItem('token') != null) ? (
                        <button id={data.idVideo} type="button" className="btn btn-danger" onClick={this.eliminarMusica} >Eliminar</button>
                      ) : (<p></p>)}
                    </div>
                  </div>
                </div>
              )
            })
          }


        </div>
      </div>

    );
  }
}

export default Index;