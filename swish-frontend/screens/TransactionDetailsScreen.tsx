import * as React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Button, Platform, Route } from 'react-native';
import { Text, View } from '../components/Themed';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import {TransactionsContext, TransactionSchema, PaymentStatus, Transactions} from '../data_store/Transactions';
import { NavigationProp} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

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
        
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button              
                    onPress={() => alert('This is a button!')}
                    title=""
                    color="#61daaa"
                />
            )
        })
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
            console.log('Props status: ', props.currentTransaction.status);
            return(
                <View style={styles.inputContainer}>
                    <Text style={{textAlignVertical: "center"}}>{props.label + ": "}</Text>
                    <RNPickerSelect
                    onValueChange={(value) => {
                        console.log("New value: ", value);
                        if(value !== null){
                            props.transactions.updateTransactionByProperty(
                                props.currentTransaction.id,
                                props.propertyName,
                                value
                            );
                        }

                    }}
                    style={pickerStyle}
                    items={[
                        {label: 'Pending', value: PaymentStatus.Pending},
                        {label: 'Unpaid', value: PaymentStatus.Unpaid},
                        {label: 'Paid', value: PaymentStatus.Paid}
                    ]}
                    />
                </View>
            );
        case "recurring": 
            return(
                <View style={styles.inputContainer}>
                    <Text style={{textAlignVertical: "center"}}>{props.label + ": "}</Text>
                    <RNPickerSelect
                    onValueChange={(value) => {
                        console.log("New value Recurring: ", value);
                        if(value !== null){
                            props.transactions.updateTransactionByProperty(
                                props.currentTransaction.id,
                                props.propertyName,
                                value
                            );
                        }

                    }}
                    style={pickerStyle}
                    items={[
                        {label: 'No', value: false},
                        {label: 'Yes', value: true}
                    ]}
                    />
                </View>
            );

        default:
            return (
                <View style={styles.inputContainer}>
                    <Text style={{textAlignVertical: "center"}}>{props.label + ": "}</Text>
                    <TextInput style={styles.inputField} onSubmitEditing={(event) => props.transactions.updateTransactionByProperty(props.currentTransaction.id, props.propertyName, event.nativeEvent.text)}>{defaultValue}</TextInput>
                </View>
            );
    }
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
        paddingVertical: 15,
        borderTopWidth: 1,
    },
    inputField: {
        paddingLeft: 5, 
        backgroundColor: "#61daaa", 
        flex: 1
    },
});

const pickerStyle = StyleSheet.create({
    inputAndroid: {
        paddingLeft: 100,
        borderColor: "#61daaa",
        width: 200
    },
    inputIOS: {
        paddingLeft: 100,
        borderColor: "#61daaa",
        width: 200
    }
})

