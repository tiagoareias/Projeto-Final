import React, { Component } from "react";
import '../../CssComponents/index.css';
import AlertMsg from '../Global/AlertMsg';
import LoadingGif from '../Global/LoadingGif';

var jwt = require('jsonwebtoken');

class Index extends Component {

  constructor() {
    super();
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "danger",
      dataGet: [],
      dataPost: [],
      isHidden: false
    }
  }

  componentDidMount() {
    this.getLastVideos();

    //this.carregaFeedbacks();
    this.setState({ loading: false })
    
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  }

  async atualizaListaFeedback() {
    var j;
    for (j = 0; j < this.state.dataGet.length; j++) {


      var decoded = jwt.decode(sessionStorage.getItem('token'));
      const dadosEnviar = {
        userFK: decoded.userID,
        musicFK: this.state.dataGet[j].id
      };
      //verificar se já foi feito um feedback à musica pelo utilizador em questão
      const response = await fetch(`http://localhost:8000/feedback/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": sessionStorage.getItem("token")
        },
        body: JSON.stringify(dadosEnviar)
      });

      await response.json().then(resp => {
        if (resp.status === "Nao está autenticado | token expirou") {
          this.refreshToken();
          this.atualizaListaFeedback();
        }
        else{
        if(resp.status !=="Não existe feedback ainda para esta música"){
        //recolher o feedback do utilizador
        var feedback = resp.response.feedback;
        //recolher os botões like e deslike
        var gostar = document.getElementById(resp.response.Music.idVideo);
        var naoGostar = document.getElementById(resp.response.Music.idVideo + "N");
        var textLike = document.getElementById(resp.response.Music.idVideo + "T");
        gostar.style.color = "";
        naoGostar.style.color = "";
        textLike.textContent = "| Gostou desta classificação?"

        if (feedback === true) {
          gostar.style.color = "red"
          textLike.textContent = "| Gostei da classificaçao"
        }
        if (feedback === null) {

          gostar.style.color = "";
          naoGostar.style.color = "";
          textLike.textContent = "| Gostou desta classificação?"

        }
        if (feedback === false) {

          naoGostar.style.color = "red"
          textLike.textContent = "| Não gostei da classificaçao"
        }
      }
    }
      });
    }
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
          this.setState({ isHidden: true });
          if (jwt.decode(sessionStorage.getItem('token'))) {
            this.atualizaListaFeedback();
          }
          break;
        case "Ainda não existem músicas na Base de Dados":
          this.setState({ isHidden: true });
          break;
        case "token expired":
          this.refreshToken();
          this.getLastVideos();
          break;
        default:
          console.log(this.state.alertText)
          break;
      }
    })
  }

  async refreshToken() {
    var decoded = jwt.decode(sessionStorage.getItem('token'));
    var nome = decoded.nome;
    var isAdmin = decoded.isAdmin;
    var userID = decoded.userID;
    var username = decoded.username;
    const dataToken = {
      username,
      nome,
      isAdmin,
      userID
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
    var userFK = null;
    if (sessionStorage.getItem('token') === null) {
      userFK = null;
    }
    else {
      userFK = jwt.decode(sessionStorage.getItem('token')).userID;
    }

    //Objeto Login
    const uploadData = {
      urlInput: urlInput,
      userFK: userFK
    };
    const response = await fetch('http://localhost:8000/music/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData)

    }
    );
    //Aguardar API
    await response.json().then(resp => {
      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Upload":
          this.setState({ dataPost: resp.response });
          this.setState({
            alertText: "A música será classificada. Aguarde pacientemente.",
            alertisNotVisible: false,
            alertColor: "success"
          });
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

  redirecionar() {
    window.location = "/";
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
          this.setState({
            alertText: "  Inicie Sessão por favor.",
            alertisNotVisible: false,
            alertColor: "warning"
          });
          break;
        case "Deleted":
          this.setState({
            alertText: "  O vídeo foi eliminado.",
            alertisNotVisible: false,
            alertColor: "success"
          });
          setTimeout(this.redirecionar, 2000);
          break;
        case "Not Deleted | Música não está na base de dados":
          this.setState({
            alertText: " O vídeo que está a tentar eliminar não existe.",
            alertisNotVisible: false,
            alertColor: "warning"
          });
          setTimeout(this.redirecionar, 2000);
          break;
        default:
          alert(this.state.alertText);
      }
    });
  }

  async createFeedBack(createFeed, idVideo) {
    const response = await fetch(`http://localhost:8000/feedback/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": sessionStorage.getItem("token")
      },
      body: JSON.stringify(createFeed)
    });

    await response.json().then(resp => {
      var iconGosto = document.getElementById(idVideo);
      var iconNaoGosto = document.getElementById(idVideo + "N");
      var textLike = document.getElementById(idVideo + "T");

      iconGosto.style.color = "";
      iconNaoGosto.style.color = "";

      var feedback = resp.response.feedback;
      if (feedback === "true") {
        iconGosto.style.color = "red";
        textLike.textContent = "| Gostei da classificaçao"

      }
      else {
        iconNaoGosto.style.color = "red"
        textLike.textContent = "| Não gostei da classificaçao"

      }
    });
  }


  async atualizaFeedBack(editFeed, idFeed, idVideo) {
    const response = await fetch(`http://localhost:8000/feedback/${idFeed}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": sessionStorage.getItem("token")
      },
      body: JSON.stringify(editFeed)
    });
    await response.json().then(resp => {
      var iconGosto = document.getElementById(idVideo);
      var iconNaoGosto = document.getElementById(idVideo + "N");
      var textLike = document.getElementById(idVideo + "T");

      iconGosto.style.color = "";
      iconNaoGosto.style.color = "";

      if (resp.response.feedback === true) {
        iconGosto.style.color = "red"
        textLike.textContent = "| Gostei da classificaçao"
      }
      if (resp.response.feedback === null) {
        iconGosto.style.color = "";
        iconNaoGosto.style.color = "";
        textLike.textContent = "| Gostou desta classificação?"

      }
      if (resp.response.feedback === false) {
        iconNaoGosto.style.color = "red";
        textLike.textContent = "| Não gostei da classificaçao"

      }
    });
  }

  async adicionaFeedback(valor, id, idVideo) {
    var decoded = jwt.decode(sessionStorage.getItem('token'));
    const dadosEnviar = {
      userFK: decoded.userID,
      musicFK: id
    };
    //verificar se já foi feito um feedback à musica pelo utilizador em questão
    const response = await fetch(`http://localhost:8000/feedback/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": sessionStorage.getItem("token")
      },
      body: JSON.stringify(dadosEnviar)
    });

    await response.json().then(resp => {
      var count = Object.keys(resp.response).length;
      let status = resp.status;
      switch (status) {
        case "Não existe feedback ainda para esta música":
          if (count === 0) {
            //create feedback
            const createFeed = {
              feedback: valor,
              musicFK: id,
              userFK: decoded.userID
            };
            this.createFeedBack(createFeed, idVideo);
          }
          break;
        case "Feedback listado com sucesso":

          if (count !== 0) {
            var valorFeedback = valor;

            if (valor === resp.response.feedback + "") {
              valorFeedback = null;
            }
            var editFeed = {
              feedback: valorFeedback,
              musicFK: id,
              userFK: decoded.userID
            };

            const idFeed = resp.response.id;

            this.atualizaFeedBack(editFeed, idFeed, idVideo)
          }
          break;
        case "Nao está autenticado | token expirou":
          this.refreshToken();
          this.adicionaFeedback(valor, id, idVideo);
          break;
        default: console.log("erro ao listar feedback")
      }


    })


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

          <center>
            <LoadingGif
              loading={this.state.isHidden}
            />
          </center>
          {/* <div className="row">
            <div className="col-md-12 mb-3">
              <h4 className="font-style-underline"> <u>Últimas músicas classificadas: </u></h4>
            </div>
            
            </div> */}
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
                      <h5 className="font-weight-bold ">{data.nome}</h5>
                      <br />
                      <div className="text-secondary" >
                        <h6 id="likes"> <i className="fa fa-thumbs-o-up"></i> <i>{data.numLikes}</i></h6>
                        <h6 id="likes"> <i className="fa fa-thumbs-o-down"></i> <i >{data.numDislikes}</i></h6>
                      </div>
                      <h6 className="text-secondary"><i >{data.numViews}</i> Visualizações </h6>
                      <h6 className="text-secondary"> Publicado a <i > {data.dataPublicacao.substring(0, 10)}</i></h6>
                      {/*EMOCAO*/}
                      <div className="row">
                        <h5 className="font-weight-bold " style={{ marginLeft: "12px" }}> Emoção: <i > {data.emocao} </i></h5>

                        {(sessionStorage.getItem('token') != null) ? (
                          <div className="row">
                            <h6 id={data.idVideo + "T"} style={{ marginLeft: "18px", marginTop: "5px" }}>| Gostou desta classificação?</h6>
                            <i onClick={() => { this.adicionaFeedback("true", data.id, data.idVideo) }} id={data.idVideo} className="fa fa-thumbs-o-up" style={{ fontSize: "25px", marginLeft: "5px", cursor: "pointer" }}></i>
                            <i onClick={() => { this.adicionaFeedback("false", data.id, data.idVideo) }} id={data.idVideo + "N"} className="fa fa-thumbs-o-down" value="false" style={{ fontSize: "25px", marginLeft: "5px", cursor: "pointer" }}></i>
                          </div>
                        ) : (
                            <div></div>
                          )}

                      </div>
                      {/*Botão Eliminar*/}
                      {(sessionStorage.getItem('token') != null) ? (
                        <div className="row">
                          <button id={data.idVideo} type="button" className="btn btn-danger" onClick={this.eliminarMusica} >Eliminar</button>
                          <p></p>
                        </div>
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