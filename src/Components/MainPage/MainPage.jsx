import React, {Component} from "react";
import style from "./MainPage.module.css"
import getTop from "../ServerAPI/GitHubAPI"
import {NavLink} from "react-router-dom";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: null
        };
    }

    render() {
        let i = 1;
        const rep_list = this.props.repositories.map((rep) => <RepBlock
            rep={{
                owner: rep.owner.login,
                name: rep.name,
                stars: rep.stargazers_count,
                last_commit: rep.updated_at,
                url: rep.html_url,
                i: i++
            }}/>);
        return (
            <div className={style.wrapper}>
                {rep_list}
            </div>
        )
    }

}

export function RepBlock(props) {
    debugger;
    return (
        <div className={style.rep_block}>
            <NavLink to={"/repository/" + props.rep.owner + "/" + props.rep.name} className={style.link}>
                <div className={style.title}>{props.rep.i}. {props.rep.name}</div>
                <div>{props.rep.stars}</div>
                <div>{props.rep.last_commit}</div>
            </NavLink>
            <a className={style.link} href={props.rep.url}>go to repository</a>
        </div>
    )

}

export default MainPage;