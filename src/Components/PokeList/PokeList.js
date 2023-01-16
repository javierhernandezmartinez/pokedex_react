import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/PokeList.css'
import axios from "axios";

export default class PokeList extends React.Component {
    constructor() {
        super();
        this.state = {
            url: "https://pokeapi.co/api/v2",
            ListPokemon: [],
            ListPokemon2: [],
            page: 0,
            count: 0,
            list_full_Pokemons: [],
            buscar: "",
            optionFill: "ver todo"
        }
    }

    componentDidMount() {
        sessionStorage.removeItem('pokemon')
        sessionStorage.setItem("menu", 'ver todo')
        this.getListPokemon()
        this.totalPokemon()
        this.filterMenu()
    }

    getListPokemon = (limit = 500, offset = 0) => {
        axios.get(`${this.state.url}/pokemon?limit=${limit}&offset=${offset}`).then(
            data => {
                let detail = this.getDetailPokemon(data.data.results)
                detail.then(res => {
                    res.data.sort(function (a, b) {
                        if (a.detail?.id > b.detail?.id) {
                            return 1;
                        }
                        if (a.detail?.id < b.detail?.id) {
                            return -1;
                        }
                        return 0;
                    });
                    this.setState({ListPokemon: res.data, ListPokemon2: res.data})
                })
            }
        )
            .catch(error => {
                console.log("error:", error)
            })
    }

    getDetailPokemon = (pokelist) => {
        let newList = []
        return new Promise((resolve, reject) => {
            pokelist.map(
                (item, index) => {
                    axios.get(item?.url)
                        .then(responds => {
                            let res = responds.data
                            axios.get(`${this.state.url}/pokemon-species/${res?.id}`)
                                .then(data => {
                                    item.detail = {
                                        id: res.id,
                                        name: item.name,
                                        url: item.url,
                                        img: res.sprites?.other?.dream_world?.front_default ?
                                            res.sprites?.other?.dream_world?.front_default :
                                            res.sprites?.other?.home?.front_default,
                                        pokemon: res,
                                        species: data,
                                        descripcion: this.es_descrip(data.data.flavor_text_entries),
                                        type: this.tipoPok(res.types)
                                    }
                                    newList.push(item)
                                    if (pokelist.length === (index + 1)) {
                                        resolve({data: newList})
                                    }
                                })
                        })
                }
            )
        })
    }

    tipoPok = (typo) => {
        let tipo = ""
        typo.map(item => {
            tipo += item.type?.name + ","
        })
        return tipo
    }

    es_descrip(array = []) {
        let des = []
        array.map((item) => {
            if (item.language.name === 'es') {
                des.push(item.flavor_text)
            }
        })
        return des[0]
    }

    selectTarget = (pokemon) => {
        sessionStorage.setItem('pokemon', JSON.stringify(pokemon))
    }

    totalPokemon = () => {
        let list
        if (this.state.page <= 50) {
            list = this.getTotalPokemon(this.state.page)
            list.then((item) => {
                let data = item?.data?.data?.results
                if (data.length > 0) {
                    let list = []
                    list = this.state.list_full_Pokemons
                    list.push(data)
                    this.setState(
                        {
                            page: this.state.page + 1,
                            count: this.state.count += data.length,
                            list_full_Pokemons: list
                        })

                    this.totalPokemon()
                } else {
                }
            })
        }

    }
    getTotalPokemon = (page = 0) => {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.url}/pokemon?limit=${20}&offset=${20 * page}`)
                .then((data) => {
                        resolve({data: data})
                    }
                )
        })
    }

    searchPokemon = (e) => {
        let search = e.target.value
        if (search.length > 0) {
            let newlist = []
            this.state.list_full_Pokemons.map((item) => {
                    item.map((row) => {
                        newlist.push(row)
                    })
                }
            )
            let x = newlist.filter((item) => {
                if (item.name.includes(search))
                    return item
            })
            x = x.filter((item, index) => {
                if (index < 20)
                    return item
            })
            let result = []
            x.map(item => {
                if (!result.includes(item)) {
                    result.push(item)
                }
            })

            for (let i = 0; i < result.length; i++) {
                if (i > 0 && result[i].name === result[0].name) {
                    result.splice(i)
                }
            }
            let a = this.getDetailPokemon(result)
            a.then((res) => {
                this.poke_list = []
                let data = res.data
                data.map((item, index) => {
                    this.poke_list.push(item)
                    this.setState({ListPokemon: this.poke_list})
                })
            })
        } else {
            this.setState({ListPokemon: this.state.ListPokemon2})
        }
    }

    filterMenu = () => {
        setTimeout(() => {
            if (sessionStorage.getItem("menu") !== this.state.optionFill) {
                this.setState({optionFill: sessionStorage.getItem("menu").toString()})
                if (sessionStorage.getItem("menu").toString() === 'ver todo') {
                    this.setState({ListPokemon: this.state.ListPokemon2})
                } else {
                    const fill = this.state.ListPokemon2.filter((x) => x.detail.type.includes(sessionStorage.getItem("menu").toString()));
                    this.setState({ListPokemon: fill})
                }
            } else {
            }
            this.filterMenu()
        }, "0")
    }


    render = () => {
        return (
            <div className="panel_left">
                <div className={"row"}>
                    <div className={"col-md-6 "}>
                        <input type={"text"} placeholder={"Buscar..."} onKeyUp={(e) => {
                            this.searchPokemon(e)
                        }}/>
                    </div>
                </div>

                <div className="row panel_target">
                    {
                        this.state.ListPokemon.map(item => (
                            <div className="col-11 col-sm-6 col-md-6 col-lg-4 ng-star-inserted" style={{padding: "1%"}}
                                 onClick={() => {
                                     this.selectTarget(item)
                                 }}
                            >
                                <div className="mat-card mat-focus-indicator card_target">
                                    <div className="row">
                                        <div className="col-4 col-sm-5 col-md-5 img_car_target">
                                            <img src={item?.detail?.img} alt={""}
                                                 onError={({currentTarget}) => {
                                                     currentTarget.onerror = null; // prevents looping
                                                     currentTarget.src = "image_path_here";
                                                 }}
                                            />
                                        </div>
                                        <div className="col-8 col-sm-7 col-md-7" style={{paddingLeft: "0"}}>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <p className="name_poke_l">{item?.name}</p>
                                                <p className="id_poke_l"> #{item?.detail?.id}</p>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                {
                                                    item?.detail?.pokemon?.types.map(row => (
                                                        <p className="type_poke_l ng-star-inserted"> {row.type?.name} </p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}