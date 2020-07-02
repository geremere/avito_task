import React, {Component} from "react";
import style from "./SearchPage.module.css"
import getTop from "../ServerAPI/GitHubAPI"
import {NavLink} from "react-router-dom";
import {RepBlock} from "../MainPage/MainPage";

class SearchPage extends Component {
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


export default SearchPage;