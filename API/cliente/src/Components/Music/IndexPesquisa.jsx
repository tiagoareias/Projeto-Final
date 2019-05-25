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
            <br/>
              <h1 className="display-5 text-center">Resultados da Pesquisa:</h1>
              <hr/>
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
          <br />
        </div>
      </div>

    );
  }
}

export default IndexPesquisa;
