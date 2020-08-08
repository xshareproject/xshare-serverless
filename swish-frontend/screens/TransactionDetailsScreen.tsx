import * as React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, BackHandler, Platform, Route } from 'react-native';
import { Text, View } from '../components/Themed';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import {TransactionsContext, TransactionSchema, PaymentStatus, Transactions} from '../data_store/Transactions';
import { NavigationProp} from '@react-navigation/native';

interface TransactionDetailsState {
    currentTransaction: TransactionSchema,
}

interface TransactionDetailsProps {
    navigation: NavigationProp<any>,
    route: Route
}

export default class TransactionDetailsScreen extends React.Component<TransactionDetailsProps, TransactionDetailsState>{
    constructor (props: any){
        super(props);
        this.state = {
            currentTransaction : this.props.route.params,
        }
    };

    render(){
        return (
            <TransactionsContext.Consumer>
            {(transactions) => (
                <React.Fragment>
                    <View style={styles.topBar}>
                    </View>
                    <ScrollView style={styles.container}>
                        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'}>
                            {/* <Image source={this.state.transactionDetails.image}></Image> */}
                            <FieldInputWithLabel transactions={transactions} currentTransaction={this.state.currentTransaction} propertyName="name" label="Lender"></FieldInputWithLabel>
                            <FieldInputWithLabel transactions={transactions} currentTransaction={this.state.currentTransaction} propertyName="description" label="Description"></FieldInputWithLabel>
                            <FieldInputWithLabel transactions={transactions} currentTransaction={this.state.currentTransaction} propertyName="amount" label="Amount"></FieldInputWithLabel>
                            <FieldInputWithLabel transactions={transactions} currentTransaction={this.state.currentTransaction} propertyName="createdDate" label="Created On"></FieldInputWithLabel>
                            <FieldInputWithLabel transactions={transactions} currentTransaction={this.state.currentTransaction} propertyName="paymentDate" label="Payment Expected On"></FieldInputWithLabel>
                            <FieldInputWithLabel transactions={transactions} currentTransaction={this.state.currentTransaction} propertyName="status" label="Payment Status"></FieldInputWithLabel>
                            <FieldInputWithLabel transactions={transactions} currentTransaction={this.state.currentTransaction} propertyName="recurring" label="Recurring Payment"></FieldInputWithLabel>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </React.Fragment>
            )}
            </TransactionsContext.Consumer>
        );
    }
}

interface TextInputWithLabelProps{
    transactions: Transactions,
    currentTransaction: TransactionSchema,
    propertyName: string,
    label: string
}

function FieldInputWithLabel(props : TextInputWithLabelProps){
    var defaultValue = props.currentTransaction[props.propertyName];
    switch (props.propertyName){
        case "status":
            defaultValue = PaymentStatus[props.currentTransaction[props.propertyName]];
            return(
                <View style={styles.inputContainer}>
                    <Text style={{textAlignVertical: "center"}}>{props.label + ": "}</Text>
                    <Picker
                     style={{paddingLeft: 200}}
                    // selectedValue={PaymentStatus[props.currentTransaction.status]}  
                    onValueChange={(itemValue, itemIndex) => {
                        console.log("Value", itemValue);
                        props.transactions.updateTransactionByProperty(
                            props.currentTransaction.id,
                            props.propertyName,
                            itemValue
                        );
                    }}>
                        <Picker.Item label="Pending" value={PaymentStatus.Pending}></Picker.Item>
                        <Picker.Item label="Unpaid" value={PaymentStatus.Unpaid}></Picker.Item>
                        <Picker.Item label="Paid" value={PaymentStatus.Paid}></Picker.Item>
                    </Picker>
                </View>

            );
        case "recurring": 
            defaultValue = props.currentTransaction[props.propertyName] ? "Yes" : "No"
    }
    return (
        <View style={styles.inputContainer}>
            <Text style={{textAlignVertical: "center"}}>{props.label + ": "}</Text>
            <TextInput style={styles.inputField} onSubmitEditing={(event) => props.transactions.updateTransactionByProperty(props.currentTransaction.id, props.propertyName, event.nativeEvent.text)}>{defaultValue}</TextInput>
        </View>
    );
}


const styles = StyleSheet.create({
    topBar: {
        backgroundColor: "#61daaa", 
        flex: .2
    },
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 20,
        borderTopWidth: 1,
    },
    inputField: {
        paddingLeft: 5, 
        backgroundColor: "#61daaa", 
        flex: 1
    },
});

