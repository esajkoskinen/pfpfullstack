import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {login} from '../actions/loginActions'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail:"",
            password:""
        }
    }
    onChange = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }
    onSubmit = (event) => {
        event.preventDefault();
        let user = {
            useremail:this.state.useremail,
            password:this.state.password
        }
        //if(event.target.name === "register") {
        //    this.props.dispatch(register(user));
        //} else {
            this.props.dispatch(login(user));
        //}
    }
    
    render() {
        return (
         <div style={{width:500, margin:20, padding:20}}>
            <Form>
                <legend className="formLegend" style={{paddingBottom:5, marginBottom:10, color:"#6edfea", borderStyle:"solid", borderWidth:0, borderBottomWidth:2, borderColor:"#18a1ae", width:"100%", textAlign:"left"}}>Login</legend>
                <Form.Field style={{textAlign:"left"}}>
                    <label htmlFor="useremail">User email:</label>
                    <input type="email"
                            name="useremail"
                            onChange={this.onChange}
                            value={this.state.useremail} />
                </Form.Field>
                <Form.Field style={{textAlign:"left"}}>
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                            name="password"
                            onChange={this.onChange}
                            value={this.state.password} />
                </Form.Field>
                <Button onClick={this.onSubmit} name="login">Login</Button>
            </Form>
         </div>
        )
    }
}

export default connect()(LoginForm);