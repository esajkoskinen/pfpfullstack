import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class BudgetRow extends React.Component {
    render() {
        return(
            <Table.Row>
                <Table.Cell>{this.props.item.name}</Table.Cell>
                <Table.Cell>{this.props.item.notes}</Table.Cell>
                <Table.Cell>{this.props.item.opening_balance}</Table.Cell>
                <Table.Cell><Button color="red" onClick={() => this.props.handleRemoveButton(this.props.item.id)}>Remove</Button></Table.Cell>
                <Table.Cell><Button color="green" onClick={() => this.props.handleEditButton(this.props.item.id)}>Edit</Button></Table.Cell>
            </Table.Row>
        )
    }
}