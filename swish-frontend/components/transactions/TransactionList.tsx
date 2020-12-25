import * as React from 'react';
import { StyleSheet } from 'react-native';
import {FlatList} from 'react-native';
import { View } from '../Themed';
import TransactionCard from './TransactionCard';
import {Transaction} from '../../redux/types/types.Transaction';
import { connect } from 'react-redux';
import {AppState} from '../../redux/root-reducer';

interface TransactionListState {
    transactions : Transaction[],
}

interface StateProps {
    transactions: Transaction[],
}

export interface TransactionListProps extends React.ComponentProps<any>{
    userId: string,
    navigationCallback : (transaction : Transaction) => void,
    transactions: Transaction[],
}

class TransactionList extends React.Component<TransactionListProps, TransactionListState>{
    constructor(props : TransactionListProps){
        super(props);
        this.state = {
            transactions: this.props.transactions,
        };
    }
    
    //this might ignore changes in contacts
    static getDerivedStateFromProps = (nextProps : TransactionListProps, prevState : TransactionListState) => {
        if(nextProps.transactions !== prevState.transactions)
            return ({transactions: nextProps.transactions});
        return null;
    }

    //load in transaction data on component creation
    componentDidMount(){
        this.setState({
            transactions: this.props.transactions
        });
    }

    //dynamically render transaction cards based on data
    renderItem = ({ item }) =>
    {
        return(
            <TransactionCard 
                transaction={item}
                navigationCallback = {this.props.navigationCallback}
            />
        );
    }
    
    render(){
            // console.log("List: ", this.state.transactions);
            return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.transactions} 
                    renderItem={this.renderItem}
                    keyExtractor={(item) => JSON.stringify(item)}>
                </FlatList>
            </View>
           );
    }
}
 
const mapStateToProps = (state: AppState, ownProps : {userId: string, navigationCallback : any}): StateProps => {
    let transactions = state.transactionReducer.filter((transaction : Transaction) => {return transaction.lenderId === ownProps.userId});
    return {transactions: transactions};
};
 
const styles = StyleSheet.create({
    container: {    
        paddingTop: 10, 
        borderRadius: 10
    }
});

export default connect(mapStateToProps, null)(TransactionList);
