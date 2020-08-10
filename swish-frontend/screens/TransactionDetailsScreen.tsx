import * as React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Platform, Route } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import {TransactionsContext, TransactionSchema, PaymentStatus, Transactions} from '../data_store/Transactions';
import { NavigationProp} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {APP_PRIMARY_COLOR} from '../assets/theme';

interface TransactionDetailsState {
    currentTransaction: TransactionSchema,
    editedTransaction: TransactionSchema,
    editable: boolean
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
            editedTransaction: this.props.route.params,
            editable: false
        }
    };

    updateEditedTransaction = (propertyName: string, value: any) => {
        let editedTransaction : TransactionSchema = this.state.editedTransaction;
        editedTransaction[propertyName] = value;
        this.setState({
                editedTransaction
            })
        console.log("Edited value: ", this.state.editedTransaction[propertyName]);
    }

    handleButtonClick = () => {
        this.setState({editable: !this.state.editable}, 
            () => {
                if(!this.state.editable){
                    this.context.updateTransaction(this.state.editedTransaction);
                }        
            });    
    }
    
    render() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button   
                icon={
                        <Icon
                        name='pencil'
                        type='entypo'
                        size={20}
                        color="black"
                        />
                    }
                title={this.state.editable? 'Save' : 'Edit'}
                titleStyle={{color: 'black'}}
                type="clear"
                onPress={() => this.handleButtonClick()}
                />
            ),
            title: ""
        });

        return (
                <React.Fragment>
                    <View style={styles.topBar}>
                        <Text style={{fontSize: 20, textAlignVertical: "center"}}>Your transaction with </Text>
                        <Avatar rounded
                        source={this.state.currentTransaction.image}
                        size="medium"
                        avatarStyle={{paddingLeft: 10}}
                        containerStyle={{marginTop: 25}} />
                    </View>
                    <ScrollView style={styles.container}>
                        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'}>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="name" label="Lender" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction} />
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="description" label="Description" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="amount" label="Amount" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="createdDate" label="Created On" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="paymentDate" label="Payment Expected On" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="status" label="Payment Status" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>
                            <FieldInputWithLabel currentTransaction={this.state.currentTransaction} propertyName="recurring" label="Recurring Payment" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </React.Fragment>
        );
    }
}

TransactionDetailsScreen.contextType = TransactionsContext;

interface TextInputWithLabelProps{
    currentTransaction: TransactionSchema,
    propertyName: string,
    label: string,
    editable: boolean,
    updateEditedTransaction: (propertyName: string, value: any) => void
}

function FieldInputWithLabel(props : TextInputWithLabelProps){
    switch (props.propertyName){
        case "status":
            return(
                <View style={styles.inputContainer}>
                    <Text style={{textAlignVertical: "center"}}>{props.label + ": "}</Text>
                    <RNPickerSelect
                    onValueChange={(value) => {
                        if(value !== null){
                            props.updateEditedTransaction(props.propertyName, value)}
                        }
                    }
                    style={pickerStyle}
                    disabled={!props.editable}
                    items={[
                        {label: 'Pending', value: PaymentStatus.Pending},
                        {label: 'Unpaid', value: PaymentStatus.Unpaid},
                        {label: 'Paid', value: PaymentStatus.Paid}
                    ]}
                    placeholder={{label: 'Current: ' + PaymentStatus[props.currentTransaction.status],
                                 value: null }}
                    />
                </View>
            );
        case "recurring": 
            var recurringValueString = props.currentTransaction.recurring ? 'Yes' : 'No';
            var placeholderText = 'Current: ' + recurringValueString;
            return(
                <View style={styles.inputContainer}>
                    <Text style={{textAlignVertical: "center"}}>{props.label + ": "}</Text>
                    <RNPickerSelect
                    onValueChange={(value) => {
                        if(value !== null){
                            props.updateEditedTransaction(props.propertyName, value)}
                        }
                    }
                    style={pickerStyle}
                    disabled={!props.editable}
                    items={[
                        {label: 'No', value: false},
                        {label: 'Yes', value: true}
                    ]}
                    placeholder={{label: placeholderText,
                                 value: null }}
                    />
                </View>
            );

        default:
            var defaultValue = props.currentTransaction[props.propertyName];
            var label : string = props.label + ": ";
            var styling = props.editable ? styles.inputFieldEditable : styles.inputField;
            return (
                <View style={styles.inputContainer}>
                    <Text style={{textAlignVertical: "center"}}>{label}</Text>
                    <TextInput style={styling} 
                    onChangeText={(text) => 
                        props.updateEditedTransaction(props.propertyName, text)}
                    editable={props.editable}>
                    {defaultValue}
                    </TextInput>
                </View> 
            );
    }
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: APP_PRIMARY_COLOR, 
        flex: .2,
        flexDirection: 'row',
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
        backgroundColor: '#ffffff',  
        flex: 1
    },
    inputFieldEditable: {
        paddingLeft: 5, 
        backgroundColor: APP_PRIMARY_COLOR, 
        flex: 1
    }
});

const pickerStyle = StyleSheet.create({
    inputAndroid: {
        paddingLeft: 100,
        width: 200,
        // backgroundColor: APP_MAIN_THEME_COLOR,
    },
    inputIOS: {
        paddingLeft: 100,
        width: 200,
        // backgroundColor: APP_MAIN_THEME_COLOR,
    }
})

