import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Home.css'
import Menu from "../Menu/Menu";
import PokeList from "../PokeList/PokeList";
import img2 from "../../Assets/Images/img2.png"
import img3 from "../../Assets/Images/img3.png"
import img_perfil from "../../Assets/Images/img_perfil.jpg"
import Modal from 'react-bootstrap/Modal';
import {BsFillTelephoneFill, BsGithub, BsLinkedin, BsWhatsapp} from "react-icons/bs"
import {GrMail} from "react-icons/gr"
import {FaMapMarkerAlt} from "react-icons/fa";
import ReactWhatsapp from "react-whatsapp";
import DetailPokemon from "../DetailPokemon/DetailPokemon";


export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            url: "https://pokeapi.co/api/v2",
            ListPokemon: [],
            ModalPerfil: false,
        }
    }

    componentDidMount() {
    }

    togleModalPerfil = () => {
        this.setState({ModalPerfil: !this.state.ModalPerfil})
    }

    render = () => {
        return (
            <div className={'home'}>
                <div className={"row container_center"}>
                    <div className={"col-md-12"} style={{padding: 0}}>
                        <div className={"row header"}>
                            <div className={"col-9 col-md-9"}>
                                <p className={"title"}>
                                    <img src={img3} className={"pokebola_img"} alt={""}/> Pokedex
                                </p>
                            </div>
                            <div className={"col-3 col-md-3"} style={{textAlign: "end"}}>
                                <img src={img2} className={"perfil_img"} alt={""} onClick={this.togleModalPerfil}/>
                            </div>
                        </div>
                    </div>
                    <div className={'col-sm-3 col-md-3'} style={{padding: 0, height: "inherit"}}>
                        <Menu/>
                    </div>
                    <div className={"col-sm-6 col-md-6 col_search"}>
                        <div className={"row"} style={{minHeight: "94%", height: "100%"}}>
                            <div className={"col-md-12"}>
                                <PokeList/>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-3"} style={{padding: "1%", height: "inherit"}}>
                        <div className={"list_right"}>
                            <DetailPokemon/>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal className={"modal_perfil"} show={this.state.ModalPerfil} onHide={this.togleModalPerfil}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div className="mat-dialog-actions head_modal">
                                    <p id="mat-dialog-title-4" className="mat-dialog-title title_perfil">
                                        Entrenador Pokemon
                                    </p>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container_modal">
                                <div className="col-md-12">
                                    <div className="mat-card-content body_modal">
                                        <div className="row card_perfil">
                                            <div className="col-md-4">
                                                <img src={img_perfil} className="img_modal_perfil" alt={""}/>
                                                <p className="nom_perfil"> Javier Hernandez </p>
                                                <p className="nom_perfil_p"> DesarrolladorFull-Stack </p>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="row row_datos_perfil">
                                                    <div className="col-md-12">
                                                        <p><FaMapMarkerAlt/> Edo. México, México </p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p><BsFillTelephoneFill/> 555-185-2695 </p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p><GrMail/> javier_9509@hotmail.com </p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p className="m_link"><BsLinkedin/> /in/javierhernandezmtz/ </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="div_icons">
                                                    <BsGithub
                                                        onClick={() => window.open("https://github.com/javierhernandezmartinez/", "_blank")}/>
                                                    <BsLinkedin
                                                        onClick={() => window.open("https://www.linkedin.com/in/javierhernandezmtz/", "_blank")}/>
                                                    <ReactWhatsapp number="555-185-2695"
                                                                   message="Hola Javier buen día, gusto en saludarte!">
                                                        <BsWhatsapp/>
                                                    </ReactWhatsapp>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}