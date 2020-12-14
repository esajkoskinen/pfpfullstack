import React from 'react';
import {List,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
    render() {
        let navStyle = {
            backgroundColor:"#eeeeee"
        }
        if(this.props.isLogged) {
            return(
                <div style={navStyle}>
                    <List>
                        <List.Item><Link to="/list">Shopping List</Link></List.Item>
                        <List.Item><Link to="/form">Add to list</Link></List.Item>
                        <List.Item><Link to="/" onClick={() => this.props.logout()}>Logout</Link></List.Item>
                    </List>
                </div>
            )
        } else {
            return (
                <div style={navStyle}>
                </div>
            )
        }
    }
}