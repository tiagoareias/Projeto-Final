import React, { Component } from "react";
import '../../CssComponents/index.css'
import LoadingGif from '../Global/LoadingGif';
class IndexPesquisa extends Component {

  constructor() {
    super();
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger",
      dataGet: [],
      isHidden: false

    }
  }

  componentDidMount() {
    this.pesquisaMusica(this.props.query)
    //teste
    //this.setState({ dataGet: window.history.state.response })
  }

  async pesquisaMusica(pesquisaARealizar) {
    console.log(pesquisaARealizar)
    const response = await fetch(`http://localhost:8000/music/search/result/${pesquisaARealizar}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    //Aguardar API
    await response.json().then(resp => {
      if (resp.response.length !== 0) {
        //Verificar o estado da resposta da API
        this.setState({ dataGet: resp.response })
        this.setState({ isHidden: true })
      }
      else {
        this.setState({ isHidden: true })
        this.setState({ dataGet: "vazio" })
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
              <br />
              <h1 className="display-5 text-center">Resultados da Pesquisa:</h1>
              <hr />
            </div>

            {(this.state.dataGet === "vazio") ? (
            <div className="col-md-12 mb-3">
            <h3 className="display-5 text-center">Não foram encontrados resultados para {this.props.query}</h3>
            
                </div>             
                 ) : (
                <div>
                  {
                    this.state.dataGet.map((data, index) => {
                      return (

                        <div key={index} className="row">
                          <div>
                            <iframe id="frame" src={"https://www.youtube.com/embed/" + data.idVideo}
                              title={data.nome} autoPlay allowFullScreen></iframe>
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
                              <br />
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
              )}

          </div>
          <center>
            <LoadingGif
              loading={this.state.isHidden}
            />
          </center>
          <br />
        </div>
      </div>

    );
  }
}

export default IndexPesquisa;
