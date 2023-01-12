import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Home.css'
import Header from "../Header/Header";

export default class Home extends React.Component{
    constructor() {
        super();
        this.state={}
    }
    render =()=> {
        return(
            <div className={'row panel'}>
                <div className={'col-md-12'}>
                    <Header/>
                </div>
            </div>
        )
    }
}