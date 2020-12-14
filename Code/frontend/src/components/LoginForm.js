import React from 'react';
import {Form,Button} from 'semantic-ui-react';

export default class LoginForm extends React.Component {
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
        if(event.target.name === "register") {
            this.props.register(user);
        } else {
            this.props.login(user);
        }
    }
    
    render() {
        return (
         <div style={{width:500, margin:"auto"}}>
            <Form>
                <Form.Field>
                    <label htmlFor="useremail">User email:</label>
                    <input type="email"
                            name="useremail"
                            onChange={this.onChange}
                            value={this.state.useremail} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                            name="password"
                            onChange={this.onChange}
                            value={this.state.password} />
                </Form.Field>
                <Button onClick={this.onSubmit} name="register">Register</Button>
                <Button onClick={this.onSubmit} name="login">Login</Button>
            </Form>
         </div>
        )
    }
}