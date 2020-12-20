import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Settings extends React.Component {
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
                <li style={mmiStyle}><Link to="/accounts" style={lStyle}>Accounts</Link></li>
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

export default connect(mapStateToProps)(Settings);