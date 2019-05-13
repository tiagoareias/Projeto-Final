import React, { Component } from "react";
import '../../CssComponents/header.css'
class Header extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">MER</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Músicas <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <li class="navbar-text">
                    <a class="nav-link" href="#">Iniciar Sessão</a>
                    </li>
                    <li class="navbar-text">
                    <a class="nav-link" href="#">Registar</a>
                    </li>

                </div>
            </nav>
        );
    }
}

export default Header;
