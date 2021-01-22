import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import BudgetRow from './BudgetRow';
import RemoveBudgetRow from './RemoveBudgetRow';
import EditBudgetRow from './EditBudgetRow';
import {connect} from 'react-redux';
import {getBudgets,removeFromBudgets,editBudget} from '../actions/budgetActions';

class BudgetList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            removeIndex:-1,
            editIndex:-1,
            search:""
        }
    }
    
    searchByType = (event) => {
        this.props.dispatch(getBudgets(this.props.token,this.state.search));
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
        this.props.dispatch(removeFromBudgets(id,this.props.token));
        this.cancel();
    }
    
    editItem = (item) => {
        this.props.dispatch(editBudget(item,this.props.token));
        this.cancel();
    }
    
    render() {
        let budgets = "You have no budgets.";
        if(this.props.list.length > 0) {
            budgets = this.props.list.map((item, index) => {
                if(index === this.state.removeIndex) {
                    return(<RemoveBudgetRow item={item} key={item.id} removeFromList={this.removeFromList} cancel={this.cancel} />)
                }
                if(index === this.state.editIndex) {
                    return(<EditBudgetRow item={item} key={item.id} editItem={this.editItem} cancel={this.cancel} />)
                }
                return(
                    <BudgetRow item={item} key={item.id} handleRemoveButton={this.handleRemoveButton} handleEditButton={this.handleEditButton}/>
                )
            });
        }
        return(
            <div>
                <label htmlFor="search">Search by type:</label>
                <input type="text"
                        name="search"
                        onChange={this.onChange}
                        value={this.state.search} />
                <Button onClick={this.searchByType}>Search</Button>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                            <Table.HeaderCell>Opening balance</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {budgets}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token:state.login.token,
        list:state.budget.list
    }
}

export default connect(mapStateToProps)(BudgetList);