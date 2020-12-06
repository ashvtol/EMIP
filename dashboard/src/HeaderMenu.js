import React from 'react';
import './headerStyle.css'
import classNames from 'classnames';

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            lang: Object.keys(this.props.data)[0],
            id: this.props.data["Java"][0],
        }
        // console.log(this.state.data);
        this.changeData = this.changeData.bind(this);
    }

    changeLanguage(value) {
        this.setState((prev, current) => ({
            lang: value,
        }), () => {
            this.changeID(this.state.data[this.state.lang][0])
            console.log("Language changed to :", this.state.lang);
        });
    }

    changeID(value) {
        this.setState((prev, current) => ({
            id: value,
        }), () => {
            console.log("ID changed  to :", this.state.id);
        });
    }

    changeData() {
        let value = {
            "lang": this.state.lang,
            "id": this.state.id,
        }
        this.props.mutateMenu(value);
    }

    selectRandomUser() {
        let langList = Object.keys(this.state.data);
        let randLang = langList[Math.floor(Math.random() * langList.length)];
        let randIndex = Math.floor(Math.random() * this.state.data[randLang].length);
        this.setState((prev, current) => ({
            lang: randLang,
            id: this.props.data[randLang][randIndex]
        }), () => {
            console.log("Random User Selected :", "id:", this.state.id, "lang:", randLang);
            this.changeData();
        });
    }

    render() {
        return (
            <div>
                <div className={"header"}>
                    <div className={classNames("title", "rainbow_text_animated")}>
                        Eye Movement in Programming
                    </div>
                    <div className={"menu"}>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        data-toggle="dropdown"> {this.state.lang}
                                    <span className="caret"/></button>
                                <ul className="dropdown-menu">
                                    {Object.keys(this.state.data).map((value, index) => {
                                        return <li key={value} onClick={() => this.changeLanguage(value)}><a
                                            href={"#"}>{value}</a>
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
                                        return <li key={value} onClick={() => this.changeID(value)}><a
                                            href={"#"}>{value}</a></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        style={{background: "rgb(105 150 85)"}}
                                        data-toggle="dropdown" onClick={() => this.changeData()}> GO
                                </button>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        data-toggle="dropdown" onClick={() => this.selectRandomUser()}>Random User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderMenu;
