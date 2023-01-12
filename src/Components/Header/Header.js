import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Header.css'
import axios from "axios";
export default class Header extends React.Component{
    constructor() {
        super();
        this.state={
            menu:[]
        }
    }
    componentDidMount() {
        this.Menu()
    }

    Menu =()=> {
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