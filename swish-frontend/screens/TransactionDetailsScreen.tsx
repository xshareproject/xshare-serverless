import * as React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import { TransactionDetailSchema, PaymentStatus } from '../schema/Schema';
import { TextInput } from 'react-native-gesture-handler';
import {TransactionsContext, transactions, updateTransactions} from '../data_store/Context';

interface TransactionDetailsState {
    transaction: TransactionDetailSchema,
}

interface TransactionDetailsProps {
}


export default class TransactionDetailsScreen extends React.Component<TransactionDetailsProps, TransactionDetailsState>{
    constructor (props: any){
        super(props);
        this.state = {
            transaction : this.props.route.params,
        }
    };

    updateName = (name : string) => {
        let transaction = {...this.state.transaction};
        transaction.name = name;
        this.setState({
            transaction
        });
        console.log("Name updated")
    }

    render(){
        return (
            <TransactionsContext.Consumer>
            {({transactions, updateTransactions}) => (
                <React.Fragment>
                    {/* <View style={styles.topBar}>
                    </View> */}
                    <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'position' : 'position'} style={styles.container}>
                        {/* <Image source={this.state.transactionDetails.image}></Image> */}
                        <TextInput style={{backgroundColor: "#ccccdd"}} onSubmitEditing={(event) => this.updateName(event.nativeEvent.text)}>{this.state.transaction.name} </TextInput>
                        <TextInput style={{borderWidth: 1, borderColor: '#12de34'}}> {this.state.transaction.amount} </TextInput>
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

