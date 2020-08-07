import * as React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, BackHandler, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import {TransactionsContext, TransactionSchema, PaymentStatus} from '../data_store/Transactions';
import { NavigationProp, Route } from '@react-navigation/native';

interface TransactionDetailsState {
    transaction: TransactionSchema,
}

interface TransactionDetailsProps {
    navigation : NavigationProp<any>,
}


export default class TransactionDetailsScreen extends React.Component<TransactionDetailsProps, TransactionDetailsState>{
    constructor (props: any){
        super(props);
        this.state = {
            transaction : this.props.route.params,
        }
    };

    render(){
        return (
            <TransactionsContext.Consumer>
            {(transactions) => (
                <React.Fragment>
                    {/* <View style={styles.topBar}>
                    </View> */}
                    <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'} style={styles.container}>
                        {/* <Image source={this.state.transactionDetails.image}></Image> */}
                        <TextInput style={{backgroundColor: "#ccccdd"}} onSubmitEditing={(event) => transactions.updateTransaction(this.state.transaction.id, event.nativeEvent.text, "name")}>{this.state.transaction.name} </TextInput>
                        <TextInput style={{borderWidth: 1, borderColor: '#12de34'}} onSubmitEditing={(event) => transactions.updateTransaction(this.state.transaction.id, event.nativeEvent.text, "amount")}> {this.state.transaction.amount} </TextInput>
                        <TextInput> {this.state.transaction.createdDate} </TextInput>
                        <TextInput> {PaymentStatus[this.state.transaction.status]} </TextInput>
                    </KeyboardAvoidingView>
                </React.Fragment>
            )}
            </TransactionsContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        // backgroundColor: "#aaaaaa", 
        // flex: 1
    },
    container: {
        flex: 1 ,
    }
});

