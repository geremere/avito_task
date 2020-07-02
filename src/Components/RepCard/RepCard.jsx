import React, {Component} from "react";
import {getContributers, getLanguages, getRep} from "../ServerAPI/GitHubAPI";
import style from "./RepCard.module.css"

class RepCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            isLoadingLanguage: false,
            rep: null,
            isLoading: false
        };
        this.loadRep = this.loadRep.bind(this);
        this.loadLanguage = this.loadLanguage.bind(this);
    }

    loadRep = () => {
        getRep(this.props.match.params.owner, this.props.match.params.rep).then(response => {
            this.setState({
                rep: response,
                isLoading: true
            })
        })
    };

    loadLanguage() {
        getLanguages(this.props.match.params.owner, this.props.match.params.rep).then(response => {
            this.setState({
                languages: response,
                isLoadingLanguage: true
            })
        })
    }

    componentDidMount() {
        this.loadRep();
        this.loadLanguage();
    }

    render() {
        debugger;
        if (this.state.isLoading && this.state.isLoadingLanguage) {
            return (
                <div className={style.wrapper}>
                    <RepInfoBlock rep={this.state.rep}/>
                    <OwnerBlock owner={{
                        img: this.state.rep.owner.avatar_url,
                        login: this.state.rep.owner.login,
                        url: this.state.rep.owner.html_url
                    }} languages={this.state.languages}/>
                </div>
            )
        } else {
            return (
                <div>
                    wait
                    rc
                </div>
            )
        }
    }
}

class RepInfoBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributors: null,
            isLoading: false
        };
        this.loadContributors = this.loadContributors.bind(this);
    }

    loadContributors() {
        getContributers(this.props.rep.owner.login, this.props.rep.name).then(response => {
            this.setState({
                contributors: response,
                isLoading: true
            })
        })
    }

    componentDidMount() {
        this.loadContributors();
    }


    render() {
        if (this.state.isLoading) {
            const contributors = this.state.contributors.map(function (current, index) {
                if (index < 10)
                    return <Contributors owner={current}/>;
            });
            return (
                <div className={style.rep_info}>
                    <div className={style.title}>{this.props.rep.name}</div>
                    <div className={style.description}>Number of stars: {this.props.rep.stargazers_count}</div>
                    <div className={style.description}>{this.props.rep.description}</div>
                    <div className={style.title}>Most popular contributors:</div>
                    <div className={style.wrapper_owners}>
                        {contributors}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    wait
                </div>
            )
        }
    }
}

function Contributors(props) {
    debugger;
    return (
        <a href={props.owner.html_url} className={style.owner_small_info}>
            <img src={props.owner.avatar_url} className={style.owner_small_avatar}/>
            <br/>
            <label>{props.owner.login}</label>
        </a>
    )

}

function Languages(props) {
    return (
        <div>
            {props.language}: {props.percentage.toFixed(2)}%
        </div>
    )
}

function OwnerBlock(props) {
    let sum = 0;
    for (let key in props.languages) {
        sum += props.languages[key];
    }
    const languages = [];
    for (let key in props.languages) {
        languages.push(<Languages language={key} percentage={props.languages[key] / sum * 100}/>)
    }
    return (
        <div className={style.owner_info}>
            <img className={style.owner_avatar} src={props.owner.img}/>
            <br/>
            <label className={style.title}>Author: </label>
            <a href={props.owner.url}>{props.owner.login}</a>
            <br/>
            <div className={style.wrapper_lang}>Number of commits {sum}
                {languages}
            </div>
        </div>
    )
}

export default RepCard;