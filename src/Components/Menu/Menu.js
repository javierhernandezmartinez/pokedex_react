import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Menu.css'
import axios from "axios";
import tex_pokemon from "../../Assets/Images/text_pokemon.png"

export default class Menu extends React.Component{
    constructor() {
        super();
        this.state={
            url:"https://pokeapi.co/api/v2",
            menu:[]
        }
    }
    componentDidMount() {
        this.menu()
        this.getPokemon()
    }


    getPokemon =()=>{
        axios.get(this.state.url + '/pokemon/1').then(
            response => {
                console.log(response)
            }
        )
    }
    menu =()=> {
        let menu = [
            {item:"Ver todo"},
            {item:"Agua"},
            {item:"Fuego"},
            {item:"Tierra"},
            {item:"Normal"},
            {item:"Planta"},
            {item:"Electrico"},
            {item:"Lucha"},
            {item:"Veneno"},
        ]
        this.setState({menu:menu})
    }
    render =()=> {
        return(
            <div className={'panel_menu'}>
                <div className={"log_pokemon"}>
                    <img className={"text_pokemon"} src={tex_pokemon}/>
                </div>
                {
                    this.state.menu.map(item => (
                        <div className={"panel_item"}>
                            <p>{item.item}</p>
                        </div>
                    ))
                }

            </div>
        )
    }
}