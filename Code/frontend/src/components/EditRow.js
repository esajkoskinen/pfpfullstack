import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:props.item.type,
            count:props.item.count,
            price:props.item.price
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
            _id:this.props.item._id,
            type:this.state.type,
            count:this.state.count,
            price:this.state.price
        }
        this.props.editItem(item);
    }
    
    render() {
        return(
            <Table.Row>
                <Table.Cell><input type="text"
                                    name="type"
                                    onChange={this.onChange}
                                    value={this.state.type} /></Table.Cell>
                <Table.Cell><input type="number"
                                    name="count"
                                    onChange={this.onChange}
                                    value={this.state.count} /></Table.Cell>
                <Table.Cell><input type="number"
                                    step="0.01"
                                    name="price"
                                    onChange={this.onChange}
                                    value={this.state.price} /></Table.Cell>
                <Table.Cell><Button color="green" onClick={this.saveItem}>Save</Button></Table.Cell>
                <Table.Cell><Button color="grey" onClick={() => this.props.cancel()}>Cancel</Button></Table.Cell>
            </Table.Row>
        )
    }
}