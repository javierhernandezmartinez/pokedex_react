import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Home.css'
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";

export default class Home extends React.Component{
    constructor() {
        super();
        this.state={}
    }
    render =()=> {
        return(
            <div className={'home'}>
                <div className={"row"}>
                    <div className={'col-md-12'}>
                        <Menu/>
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
        )
    }
}