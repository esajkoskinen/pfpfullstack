import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {register} from '../actions/registerActions'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
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
            username:this.state.username,
            useremail:this.state.useremail,
            password:this.state.password
        }
        //if(event.target.name === "register") {
            this.props.dispatch(register(user));
        //}
    }
    
    render() {
        return (
         <div style={{width:500, margin:20, padding:20, backgroundColor:"#16666d"}}>
            <Form>
                <legend className="formLegend" style={{paddingBottom:5, marginBottom:10, color:"#6edfea", borderStyle:"solid", borderWidth:0, borderBottomWidth:2, borderColor:"#18a1ae", width:"100%", textAlign:"left"}}>Register</legend>
                <Form.Field style={{textAlign:"left"}}>
                    <label htmlFor="username">User name:</label>
                    <input type="email"
                            name="username"
                            onChange={this.onChange}
                            value={this.state.username} />
                </Form.Field>
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
                <Button onClick={this.onSubmit} name="register">Register</Button>
            </Form>
         </div>
        )
    }
}

export default connect()(RegisterForm);