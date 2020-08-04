import * as React from 'react';
import { StyleSheet } from 'react-native';
import {FlatList} from 'react-native';
import { Text, View } from '../Themed';
// import 'bootstrap/dist/css/bootstrap.css';
import TransactionCard from './TransactionCard';
import {TransactionDetailSchema} from '../../schema/Schema';
import { TransactionDataContext } from '../../data_store/Context';

interface TransactionListState {
    transactions : TransactionDetailSchema[]
}

export interface TransactionListProps extends React.ComponentProps<any> {
    navigationCallback : (detailScreenProps : TransactionDetailSchema) => void,
}

export default class TransactionList extends React.Component<TransactionListProps, TransactionListState>{
    constructor(props : TransactionListProps){
        super(props);
        this.state = {
            transactions: []
        }
    }

    //load in transaction data on component creation
    componentDidMount(){
        this.setState({
            transactions: this.context.transactions
        });
    }

    //dynamically render transaction cards based on data
    renderItem = ({ item }) =>
    {
        return(
            <TransactionCard 
                transactionDetails={item}
                navigationCallback={this.props.navigationCallback}
            />
        );
    }

    //rendering function
    render(){
        console.log("Transaction List", this.state.transactions);
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

TransactionList.contextType = TransactionDataContext;
 
const styles = StyleSheet.create({
    container: {
        paddingTop: 10, 
        borderRadius: 10
    }
});

