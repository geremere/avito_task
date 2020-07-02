import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import {Switch, Route, withRouter} from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import {getTop} from "./Components/ServerAPI/GitHubAPI";
import RepCard from "./Components/RepCard/RepCard";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: null
        };
        this.loadTop = this.loadTop.bind(this);
    }

    loadTop() {
        getTop(1).then(response => {
            this.setState({
                isLoading: true,
                data: response.items
            });
        });
    };

    componentDidMount() {
        this.loadTop();
    }


    render() {
        if (this.state.isLoading) {
            return (
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route path="/mainpage" render={() => <MainPage repositories={this.state.data}/>}/>
                        <Route path="/repository/:owner/:rep" component={RepCard}/>
                        <Route exact path="/" render={() => <MainPage repositories={this.state.data}/>}/>
                        <Route path="/seacrh/:input_value" render={() => <MainPage repositories={this.state.data}/>}/>

                    </Switch>
                </div>
            );
        } else {
            return (
                <div>wait</div>
            );
        }
    }


}

export default withRouter(App);
