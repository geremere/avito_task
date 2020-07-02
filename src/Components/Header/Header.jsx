import React, {Component} from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_value: null
        };
        this.search = this.search.bind(this)
    }


    search = () => {
        if (this.state.input_value != null)
            window.location.assign("search/" + this.state.input_value);
    };

    onChange = (event) => {
        this.setState({input_value: event.target.value});
    };


    render() {
        return (
            <div className={style.Wrapper}>
                <div className={style.input_wrapper}>
                    <input type="search" placeholder="input here searched text" onChange={this.onChange}
                           className={style.input}/>
                    <button className={style.input_button} onClick={this.search}>search</button>
                </div>
                <NavLink to="/mainpage" className={style.title}>
                    GitHub Search
                </NavLink>
            </div>
        );
    }
}

export default Header;