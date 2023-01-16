import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/DetailPokemon.css'


export default class DetailPokemon extends React.Component {
    constructor() {
        super();
        this.state = {
            url: "https://pokeapi.co/api/v2",
            pokemon: [],
        }
    }

    componentDidMount() {
        this.getPokemon()
    }

    getPokemon = () => {
        setTimeout(() => {
            if (sessionStorage.getItem("pokemon") !== this.state.pokemon) {
                this.setState({pokemon: JSON.parse(sessionStorage.getItem("pokemon"))})
            }
            this.getPokemon()
        }, "0")
    }

    render = () => {
        return (
            <div className="panel_rigt">
                <div className="row">
                    <div className="col-md-12">
                        <div className="quepokeom">
                            <div>
                                <img
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="p_p_img">
                            <img className="img_poke_selected" src={this.state.pokemon?.detail?.img}/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="poke_details">
                            <p className="poke_id"><span>Pokemon #</span>{this.state.pokemon?.detail?.id}</p>
                            <p className="poke_nom">
                                <img
                                    src="https://github.com/javierhernandezmartinez/pokedex/blob/master/src/assets/images/img3.png?raw=true"
                                    className="pokebola_img_d"/>{this.state.pokemon?.name}</p>
                            <div className="poke_type">
                                <div className="row">
                                    <div className="col-md-12"
                                         style={{display: "flex", justifyContent: "space-between"}}>
                                        {
                                            this.state.pokemon?.detail?.pokemon?.types.map(row => (
                                                <p className="type_poke_l ng-star-inserted"> {row.type?.name} </p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">

                    </div>
                    <div className="col-md-12">
                        <div className="poke_descrip">
                            <p> {this.state.pokemon?.detail?.descripcion}</p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {/*<button  type="button" data-bs-toggle="modal"
                                data-bs-target="#exampleModal" className="button_open_modal"> Ver mas...
                        </button>*/}
                    </div>
                </div>
            </div>
        )
    }
}