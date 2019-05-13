import React, { Component } from 'react';
// import Header from '../Components/Globais/Header';
// import Footer from '../Components/Globais/Footer';
import Index from '../Components/Index';
import Footer from '../Components/Global/footer';
import Header from '../Components/Global/header';
class IndexPage extends Component {
    render() {
      return (
        <div>
          <Header/>
          <Index/>
          <Footer/>

        </div>
      );
    }
  }

export default IndexPage;