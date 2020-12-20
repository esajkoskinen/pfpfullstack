import React from 'react';
import {List,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/loginActions';

class Navbar extends React.Component {
    render() {
        let header = <Header>{this.props.stage}</Header>
//        if(this.props.loading) {
//            header = <Header>Loading...</Header>
//        }
        if(this.props.error) {
            header = <Header>{this.props.error}</Header>
        }
        let navStyle = {
            position:"relative",
            backgroundColor:"#eeeeee",
            paddingLeft:40,
            paddingTop:20,
            paddingBottom:20,
            textAlign:"left",
            display:"block"
        }
        let linkStyle = {
            color:"#5fdce9",
            lineHeight:2
        }
        if(this.props.isLogged) {
            return(
                <div style={navStyle}>
                    {header}
                    <List>
                        <List.Item><Link to="/" onClick={() => this.props.dispatch(logout(this.props.token))} style={linkStyle}>Logout</Link></List.Item>
                    </List>
                </div>
            )
        } else {
            return (
                <div style={navStyle}>
                    {header}
                    <List>
                        <List.Item><Link to="/" style={linkStyle}>Login</Link></List.Item>
                        <List.Item><Link to="/registerform" style={linkStyle}>Register</Link></List.Item>
                    </List>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    let error = "";
//    if(state.shopping.error) {
//        error = state.shopping.error
//    }
    if(state.login.error) {
        error = state.login.error
    }
    return {
        isLogged:state.login.isLogged,
        token:state.login.token,
        loading:state.login.loading,
        stage:state.login.stage,
        error:error
    }
}

export default connect(mapStateToProps)(Navbar);