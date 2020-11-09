import * as React from 'react';
import { StyleSheet } from 'react-native';
import {FlatList} from 'react-native';
import { Text, View } from '../Themed';
import TransactionCard from './TransactionCard';
import {Transaction} from '../../redux/types/types.Transaction';
import { connect } from 'react-redux';
import {AppState} from '../../redux/root-reducer';

interface TransactionListState {
    transactions : Transaction[],
}

export interface TransactionListProps extends React.ComponentProps<any>{
    userId: string,
    navigationCallback : (transaction : Transaction) => void,
    transactionList: Transaction[]
}

class TransactionList extends React.Component<TransactionListProps, TransactionListState>{
    constructor(props : TransactionListProps){
        super(props);
        this.state = {
            transactions: []
        };
    }

    //load in transaction data on component creation
    componentDidMount(){
        this.setState({
            transactions: this.props.transactionList
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
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.transactions} 
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}>
                </FlatList>
            </View>
        );
    }
}

interface StateProps {
    transactionList: Transaction[]
}
  
const mapStateToProps = (state: AppState, ownProps : {userId: string, navigationCallback : any}): StateProps => {
    let transactionList = state.transactionReducer.filter((transaction : Transaction) => {return transaction.lenderId === ownProps.userId});
    return {transactionList};
};
 
const styles = StyleSheet.create({
    container: {
        paddingTop: 10, 
        borderRadius: 10
    }
});

export default connect(mapStateToProps, null)(TransactionList);
