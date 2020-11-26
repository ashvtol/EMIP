import React from 'react';
import './style.css'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            lang: Object.keys(this.props.data)[0],
            id: this.props.data["Java"][0],
            index: 0
        }
        console.log(this.state.data);
    }

    changeLanguage(value) {
        this.setState((prev, current) => ({
            lang: value,
        }), () => {
            this.changeID(this.state.data[this.state.lang][0])
            console.log("Languaged  to :", this.state.lang);
        });
    }

    changeID(value) {
        this.setState((prev, current) => ({
            id: value,
        }), () => {
            console.log("ID changed  to :", this.state.id);
        });
    }

    changeData(value) {
        this.setState((prev, current) => ({
            index: value,
        }), () => {
            console.log("index changed  to :", this.state.id);
        });
    }

    render() {
        return (
            <div>
                <div className={"header"}>
                    <div className={"menu"}>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        data-toggle="dropdown"> {this.state.lang}
                                    <span className="caret"/></button>
                                <ul className="dropdown-menu">
                                    {Object.keys(this.state.data).map((value, index) => {
                                        return <li onClick={() => this.changeLanguage(value)}><a href={"#"}>{value}</a>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        data-toggle="dropdown"> {this.state.id}
                                    <span className="caret"/></button>
                                <ul className="dropdown-menu">
                                    {this.props.data[this.state.lang].map((value) => {
                                        return <li onClick={() => this.changeID(value)}><a href={"#"}>{value}</a></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        data-toggle="dropdown" onClick={() => this.changeData()}> GO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;
