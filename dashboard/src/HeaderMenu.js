import React from 'react';
import './headerStyle.css'
import classNames from 'classnames';

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.menuData,
            lang: Object.keys(this.props.data.menuData)[0],
            id: 200,
            benchmarkToggle: this.props.data.benchmarkToggle,
            benchmarkIndex: 200,
        }
        // console.log(this.state.data);
        this.changeData = this.changeData.bind(this);
    }

    toggleBenchMark() {
        this.setState((prev, current) => ({
            benchmarkToggle: !this.state.benchmarkToggle,
        }), () => {
            console.log("BenchMark :", this.state.benchmarkToggle);
            this.changeData();
        });
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

    changeBenchmark(value) {
        this.setState((prev, current) => ({
            benchmarkIndex: value,
        }), () => {
            console.log("Benchmark Index changed :", this.state.benchmarkIndex);
            this.changeData();
        });
    }

    changeData() {
        let value = {
            "lang": this.state.lang,
            "id": this.state.id,
            "benchmarkToggle": this.state.benchmarkToggle,
            "benchmarkIndex": this.state.benchmarkIndex
        }
        this.props.mutateMenu(value);
    }

    getToggleBg() {
        return !this.state.benchmarkToggle ? "#9a1111" : "rgb(105 150 85)";
    }

    selectRandomUser() {
        let langList = Object.keys(this.state.data);
        let randLang = langList[Math.floor(Math.random() * langList.length)];
        let randIndex = Math.floor(Math.random() * this.state.data[randLang].length);
        let randBenchmarkIndex = Math.floor(Math.random() * this.state.data[randLang].length);
        while (randBenchmarkIndex === randIndex) {
            randBenchmarkIndex = Math.floor(Math.random() * this.state.data[randLang].length);
        }
        this.setState((prev, current) => ({
            lang: randLang,
            id: this.props.data.menuData[randLang][randIndex],
            benchmarkIndex: this.props.data.menuData[randLang][randBenchmarkIndex]
        }), () => {
            console.log("Random User Selected :", "id:", this.state.id, "lang:", randLang, "Benchmark Index:", this.state.benchmarkIndex);
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
                                <button className="btn btn-primary dropdown-toggle newbtn" type="button"
                                        data-toggle="dropdown"> {this.state.lang}
                                    </button>
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
                                <button className="btn btn-primary dropdown-toggle newbtn" type="button"
                                        data-toggle="dropdown"> {this.state.id}
                                    </button>
                                <ul className="dropdown-menu">
                                    {this.props.data.menuData[this.state.lang].map((value) => {
                                        return <li key={value} onClick={() => this.changeID(value)}><a
                                            href={"#"}>{value}</a></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle newbtn" type="button"
                                        style={{background: "rgb(105 150 85)"}}
                                        data-toggle="dropdown" onClick={() => this.changeData()}> GO
                                </button>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary" type="button"
                                        data-toggle="dropdown" onClick={() => this.selectRandomUser()}>Random User
                                </button>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary newbtn" type="button"
                                        data-toggle="dropdown"
                                        style={{background: this.getToggleBg()}}
                                        onClick={() => this.toggleBenchMark()}>Benchmark Toggle
                                </button>
                            </div>
                        </div>
                        <div id={"menuItems"}>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle newbtn" type="button"
                                        data-toggle="dropdown"> {this.state.benchmarkIndex}
                                    </button>
                                <ul className="dropdown-menu">
                                    {this.props.data.menuData[this.state.lang].map((value) => {
                                        return <li key={value} onClick={() => this.changeBenchmark(value)}><a
                                            href={"#"}>{value}</a></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderMenu;
