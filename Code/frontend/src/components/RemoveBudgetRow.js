import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class RemoveBudgetRow extends React.Component {
    render() {
        return(
            <Table.Row>
                <Table.Cell>{this.props.item.name}</Table.Cell>
                <Table.Cell>{this.props.item.notes}</Table.Cell>
                <Table.Cell>{this.props.item.opening_balance}</Table.Cell>
                <Table.Cell onClick={() => this.props.cancel()}><Button color="grey">Cancel</Button></Table.Cell>
                <Table.Cell onClick={() => this.props.removeFromBudgets(this.props.item.id)}><Button color="green">Confirm</Button></Table.Cell>
            </Table.Row>
        )
    }
}