import React from 'react';
import {Table} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

export default class ShoppingList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            removeIndex:-1,
            editIndex:-1
        }
    }
    
    handleRemoveButton = (id) => {
        for(let i=0;i<this.props.list.length;i++) {
            if(id === this.props.list[i].id) {
                this.setState({
                    removeIndex:i,
                    editIndex:-1
                });
            }
        }
    }
    
    handleEditButton = (id) => {
        for(let i=0;i<this.props.list.length;i++) {
            if(id === this.props.list[i].id) {
                this.setState({
                    removeIndex:-1,
                    editIndex:i
                });
            }
        }
    }
    
    cancel = () => {
        this.setState({
            removeIndex:-1,
            editIndex:-1
        });
    }
    
    removeFromList = (id) => {
        this.props.removeFromList(id);
        this.cancel();
    }
    
    editItem = (item) => {
        this.props.editItem(item);
        this.cancel();
    }
    
    render() {
        let items = this.props.list.map((item, index) => {
            if(index === this.state.removeIndex) {
                return(<RemoveRow item={item} key={item.id} removeFromList={this.removeFromList} cancel={this.cancel} />)
            }
            if(index === this.state.editIndex) {
                return(<EditRow item={item} key={item.id} editItem={this.editItem} cancel={this.cancel} />)
            }
            return(
                <Row item={item} key={item.id} handleRemoveButton={this.handleRemoveButton} handleEditButton={this.handleEditButton}/>
            )
        });
        return(
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item type</Table.HeaderCell>
                        <Table.HeaderCell>Count</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items}
                </Table.Body>
            </Table>
        )
    }
}