import React, { Component } from "react";
import '../../CssComponents/index.css'
class Index extends Component {

  constructor() {
    super();
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger",
      dataGet: [],
      dataPost: []
    }
  }

  componentDidMount() {
    this.getLastVideos();
  }
  logout(){
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
          this.logout();
          break;
        default:
          console.log(this.state.alertText)
      }
    })
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
          break;
        case "URL já existe na base de dados":
          this.setState({ dataPost: resp.response });
          alert("Já existe na base de dados")
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
              <input type="text" id="urlInput" placeholder=" Introduza o URL " required />
              <div className="input-group-append">
                <button type="submit" className="btn btn-dark"> Classificar </button>
              </div>
            </div>
          </form>

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
                      <h6 className="text-secondary"><i >{data.numLikes}</i> Likes</h6>
                      <h6 className="text-secondary"><i >{data.numDislikes}</i> Dislikes </h6>
                      <br />
                      <h6 className="text-secondary"><i >{data.numViews}</i> Visualizações </h6>
                      <h6 className="text-secondary"> Publicado a <i > {data.dataPublicacao.substring(0,10)}</i></h6>
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
