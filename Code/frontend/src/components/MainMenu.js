import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class MainMenu extends React.Component {
    render() {
        let mmStyle = {
        }
        let mmiStyle = {
            display:"block",
            width:250,
            height:150,
            textAlign:"center",
            position:"relative",
            float:"left",
            backgroundColor:"#116d76",
            margin:10
        }
        let lStyle = {
            lineHeight:"150px",
            width:250,
            display:"inline-block",
            fontSize:25,
            color:"#5fdce9"
        }
        return(
            <ul className="menumain" style={mmStyle}>
                <li style={mmiStyle}><Link to="/budgets" style={lStyle}>Budgets</Link></li>
                <li style={mmiStyle}><Link to="/receipts" style={lStyle}>Receipts</Link></li>
                <li style={mmiStyle}><Link to="/stores" style={lStyle}>Stores</Link></li>
                <li style={mmiStyle}><Link to="/products" style={lStyle}>Products</Link></li>
                <li style={mmiStyle}><Link to="/shoppinglists" style={lStyle}>Shopping lists</Link></li>
                <li style={mmiStyle}><Link to="/recipes" style={lStyle}>Recipes</Link></li>
                <li style={mmiStyle}><Link to="/settings" style={lStyle}>Settings</Link></li>
            </ul>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        token:state.login.token
//        list:state.shopping.list
    }
}

export default connect(mapStateToProps)(MainMenu);