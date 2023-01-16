import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Menu.css'


export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            url: "https://pokeapi.co/api/v2",
            menu: [],
        }
    }

    componentDidMount() {
        this.menu()
        sessionStorage.setItem("menu", 'ver todo')
    }

    menu = () => {
        let menu = ['ver todo', 'grass', 'poison', 'fire', 'flying', 'water', 'bug', 'normal', 'electric', 'ground',
            'fairy', 'fighting', 'psychic', 'rock', 'steel', 'ice', 'ghost', 'dragon', 'dark']
        this.setState({menu: menu})
    }

    selectMenu = (e) => {
        sessionStorage.setItem("menu", e.target.innerText)
    }

    render = () => {
        return (
            <>
                <div className={'panel_menu'}>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p className={"text_pokemon"}>Pokemon Types</p>
                        </div>
                        <div className={"col-md-12"}>
                            <div className={"row"} style={{padding: "10%"}}>
                                {
                                    this.state.menu.map(item => (
                                        <div className={"col-md-6 panel_item"}>
                                            <a onClick={(e) => {
                                                this.selectMenu(e)
                                            }}>{item}</a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}