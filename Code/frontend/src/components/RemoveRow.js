import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class RemoveRow extends React.Component {
    render() {
        return(
            <Table.Row>
                <Table.Cell>{this.props.item.type}</Table.Cell>
                <Table.Cell>{this.props.item.count}</Table.Cell>
                <Table.Cell>{this.props.item.price}</Table.Cell>
                <Table.Cell onClick={() => this.props.cancel()}><Button color="grey">Cancel</Button></Table.Cell>
                <Table.Cell onClick={() => this.props.removeFromList(this.props.item.id)}><Button color="green">Confirm</Button></Table.Cell>
            </Table.Row>
        )
    }
}