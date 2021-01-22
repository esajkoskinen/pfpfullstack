import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditBudgetRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:props.item.name,
            notes:props.item.notes,
            opening_balance:props.item.opening_balance
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
            notes:this.state.notes,
            opening_balance:this.state.opening_balance
        }
        this.props.editBudget(item);
    }
    
    render() {
        return(
            <Table.Row>
                <Table.Cell><input type="text"
                                    name="name"
                                    onChange={this.onChange}
                                    value={this.state.name} /></Table.Cell>
                <Table.Cell><input type="text"
                                    name="notes"
                                    onChange={this.onChange}
                                    value={this.state.notes} /></Table.Cell>
                <Table.Cell><input type="number"
                                    step="0.001"
                                    name="opening_balance"
                                    onChange={this.onChange}
                                    value={this.state.opening_balance} /></Table.Cell>
                <Table.Cell><Button color="green" onClick={this.saveItem}>Save</Button></Table.Cell>
                <Table.Cell><Button color="grey" onClick={() => this.props.cancel()}>Cancel</Button></Table.Cell>
            </Table.Row>
        )
    }
}