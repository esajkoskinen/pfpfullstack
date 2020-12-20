import React from 'react';
import './App.css';
import {Switch,Route,Redirect} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import {connect} from 'react-redux';

import LogoPic from './images/pfp-logo_outline.png';
import MainMenu from './components/MainMenu';
import Settings from './components/Settings';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';
import BudgetList from './components/BudgetList';
//import StoreList from './components/StoreList';
import RegisterForm from './components/RegisterForm';

class App extends React.Component {
    
    render() {
        let topbarStyle = {
            height:45,
            color:"white",
            backgroundColor:"#116d76"
        }
        let appTextStyle = {
            width:200,
            height:"100%",
            lineHeight:"3",
            align:"left",
            fontWeight:900,
            backgroundColor:"#01545B",
            float:"left"
        }
        let logobarStyle = {
            width:"50%",
            height:"100%",
            float:"right",
            backgroundImage: "url(" + LogoPic + ")",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"right",
            marginRight:10
        }
        let mainStyle = {
            height:"100%"
        }
        let navStyle = {
            position:"relative",
            width:200,
            height:"100%",
            float:"left"
        }
        let contentStyle = {
            position:"relative",
            float:"left",
        }
        return (
            <div className="App">
                <div className="top-bar" style={topbarStyle}>
                    <div style={appTextStyle}>Personal Finance Planner</div>
                    <div style={logobarStyle}></div>
                </div>
                <div className="main" style={mainStyle}>
                    <div className="navDiv" style={navStyle}>
                        <Navbar />
                    </div>
                    <div className="content" style={contentStyle}>
                        <Switch>
                            <Route exact path="/" render={() => this.props.isLogged ?
                                (<Redirect to="/menu" />) :
                                (<LoginForm />)
                            } />
                            <Route path="/registerform" render={() => (<RegisterForm />)
                            } />
                            <Route path="/menu" render={() => this.props.isLogged ?
                                (<MainMenu />) :
                                (<Redirect to="/" />)
                            } />
                            <Route path="/budgets" render={() => this.props.isLogged ?
                                (<BudgetList />) :
                                (<Redirect to="/" />)
                            } />
                            <Route path="/settings" render={() => this.props.isLogged ?
                                (<Settings />) :
                                (<Redirect to="/" />)
                            } />
                            <Route path="/accounts" render={() => this.props.isLogged ?
                                (<AccountList />) :
                                (<Redirect to="/" />)
                            } />
                            <Route path="/accountform" render={() => this.props.isLogged ?
                                (<AccountForm />) :
                                (<Redirect to="/" />)
                            } />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token:state.login.token,
        isLogged:state.login.isLogged
    }
}

export default connect(mapStateToProps)(App);
