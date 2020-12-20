import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {connect} from 'react-redux';
import {getAccounts,removeFromAccounts,editAccount} from '../actions/accountActions';

class AccountList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            removeIndex:-1,
            editIndex:-1,
            search:""
        }
    }
    
    searcByType = (event) => {
        this.props.dispatch(getAccounts(this.props.token,this.state.search));
        this.setState({
            search:""
        })
    }
    
    onChange = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }
    
    handleRemoveButton = (id) => {
        for(let i=0;i<this.props.list.length;i++) {
            if(id === this.props.list[i]._id) {
                this.setState({
                    removeIndex:i,
                    editIndex:-1
                });
            }
        }
    }
    
    handleEditButton = (id) => {
        for(let i=0;i<this.props.list.length;i++) {
            if(id === this.props.list[i]._id) {
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
        this.props.dispatch(removeFromAccounts(id,this.props.token));
        this.cancel();
    }
    
    editItem = (item) => {
        this.props.dispatch(editAccount(item,this.props.token));
        this.cancel();
    }
    
    render() {
        let accounts = this.props.list.map((item, index) => {
            if(index === this.state.removeIndex) {
                return(<RemoveRow item={item} key={item._id} removeFromList={this.removeFromList} cancel={this.cancel} />)
            }
            if(index === this.state.editIndex) {
                return(<EditRow item={item} key={item._id} editItem={this.editItem} cancel={this.cancel} />)
            }
            return(
                <Row item={item} key={item._id} handleRemoveButton={this.handleRemoveButton} handleEditButton={this.handleEditButton}/>
            )
        });
        return(
            <div>
                <label htmlFor="search">Search by type:</label>
                <input type="text"
                        name="search"
                        onChange={this.onChange}
                        value={this.state.search} />
                <Button onClick={this.searcByType}>Search</Button>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Depository</Table.HeaderCell>
                            <Table.HeaderCell>Balance</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {accounts}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token:state.login.token,
        list:state.account.list
    }
}

export default connect(mapStateToProps)(AccountList);