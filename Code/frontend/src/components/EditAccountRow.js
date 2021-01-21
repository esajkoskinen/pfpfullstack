import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditAccountRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:props.item.name,
            depository:props.item.depository,
            balance:props.item.balance
        }
    }
    
    onChange = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }
    
    saveItem = (event) => {
        event.preventDefault();
        let item = {
            id:this.props.item.id,
            name:this.state.name,
            depository:this.state.depository,
            balance:this.state.balance
        }
        this.props.editAccount(item);
    }
    
    render() {
        return(
            <Table.Row>
                <Table.Cell><input type="text"
                                    name="name"
                                    onChange={this.onChange}
                                    value={this.state.name} /></Table.Cell>
                <Table.Cell><input type="text"
                                    name="depository"
                                    onChange={this.onChange}
                                    value={this.state.depository} /></Table.Cell>
                <Table.Cell><input type="number"
                                    step="0.001"
                                    name="balance"
                                    onChange={this.onChange}
                                    value={this.state.balance} /></Table.Cell>
                <Table.Cell><Button color="green" onClick={this.saveItem}>Save</Button></Table.Cell>
                <Table.Cell><Button color="grey" onClick={() => this.props.cancel()}>Cancel</Button></Table.Cell>
            </Table.Row>
        )
    }
}