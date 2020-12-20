import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {addToAccounts} from '../actions/accountActions';

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            depository:"",
            balance:0
        }
    }
    onChange = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        let item = {
            name:this.state.name,
            depository:this.state.depository,
            balance:this.state.balance
        };
        this.props.dispatch(addToAccounts(item,this.props.token));
        this.setState({
            name:"",
            depository:"",
            balance:0
        });
    }
    
    render() {
        return(
            <div style={{width:500, margin:"auto"}}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label htmlFor="name">Account name:</label>
                        <input type="text"
                                name="name"
                                onChange={this.onChange}
                                value={this.state.name} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="depository">Depository:</label>
                        <input type="text"
                                name="depository"
                                onChange={this.onChange}
                                value={this.state.depository} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="balance">Balance:</label>
                        <input type="number"
                                step="0.01"
                                name="balance"
                                onChange={this.onChange}
                                value={this.state.balance} />
                    </Form.Field>
                    <Button type="submit">Add</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token:state.login.token
    }
}

export default connect(mapStateToProps)(AccountForm);