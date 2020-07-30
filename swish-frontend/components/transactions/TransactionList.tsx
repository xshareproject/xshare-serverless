import * as React from 'react';
import { StyleSheet } from 'react-native';
import {FlatList} from 'react-native';
import { Text, View } from '../Themed';
// import 'bootstrap/dist/css/bootstrap.css';
import harold from '../../assets/images/profile_test.webp';
import TransactionCard, {TransactionDetailSchema} from './TransactionCard';


interface TransactionListState {
    transactions : TransactionDetailSchema[]
}

export interface TransactionListProps extends React.ComponentProps<any> {
    navigationCallback : (detailScreenProps : TransactionDetailSchema) => void
}

const transactionData = [{
    "id": "1",
    "name": "User 1",
    "amount": 12.20,
    "date": "July 20",
    "image": harold,
    "status": "unpaid"
},
{
    "id": "2",
    "name": "User 2",
    "amount": 12.30,
    "date": "July 10",
    "image": harold,
    "status": "unpaid"
},
{
    "id": "3",
    "name": "User 3",
    "amount": 12.20,
    "date": "July 18",
    "image": harold,
    "status": "unpaid"
}];

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
            transactions: transactionData
        })
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
 
const styles = StyleSheet.create({
    container: {
        paddingTop: 10, 
        borderRadius: 10
    }
});
