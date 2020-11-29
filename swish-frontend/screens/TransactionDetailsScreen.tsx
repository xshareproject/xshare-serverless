import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Route } from 'react-native';
import { Button, Icon, Avatar, Overlay } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { TextInput, ScrollView} from 'react-native-gesture-handler';
import { NavigationProp} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {APP_PRIMARY_COLOR} from '../assets/theme';
import PaymentBreakdown from '../components/PaymentBreakdown';
import * as lodash from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Transaction } from '../redux/types/types.Transaction';
import { updateTransaction, updateTransactionType } from '../redux/transaction/transaction.actions';
import { UPDATE_TRANSACTION } from '../redux/types/types.actions';

interface DispatchProps {
    updateTransaction: Function,
    updateTransactionType: typeof actions.updateTransactionType,    
}

interface TransactionDetailsProps extends DispatchProps {
    navigation: NavigationProp<any>,
    updateTransaction: Function,
    updateTransactionType: typeof actions.updateTransactionType;
    route: Route;
}

interface TransactionDetailsState {
    editedTransaction: Transaction,
    editable: boolean,
    displaySavePrompt: boolean,
    saveChanges: boolean,
    transactionType: TRANSACTION_TYPE
}


const actions = {
    updateTransactionType: (transactionType: TRANSACTION_TYPE, transactionId: Transaction) : any => true,
}


enum TRANSACTION_TYPE{
    STANDARD, MEAL, RECURRING
}

export class TransactionDetailsScreen extends React.Component<TransactionDetailsProps, TransactionDetailsState>{
    constructor (props: TransactionDetailsProps, context: any){
        super(props, context);
        this.state = {
            editedTransaction : lodash.cloneDeep(this.props.route.params),
            editable: false,
            displaySavePrompt: false,
            saveChanges: false,
            transactionType: TRANSACTION_TYPE.STANDARD,
        };
    };

    // updateTransactionType = (transactionType : TRANSACTION_TYPE) => {
    //     this.setState({
    //         transactionType
    //     });
    // }

    updateEditedTransaction = (propertyName: string, value: any) => {
        let editedTransaction : Transaction = this.state.editedTransaction;
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
                    this.setState({
                        displaySavePrompt: !this.state.displaySavePrompt
                    })
                }        
            });    
    }

    toggleOverlay = () => {
        this.setState({
            displaySavePrompt: !this.state.displaySavePrompt
        });
    }

    saveChanges = () => {
        this.props.updateTransaction(this.state.editedTransaction);
        this.setState({
            saveChanges: true,
            displaySavePrompt: false
        }); 
    }

    cancelChanges = () => {
        this.setState({
            saveChanges: false,
            displaySavePrompt: false,
            editedTransaction: this.props.route.params
        });
    }
    
    render() {
        // const {updateTransactionType, currentTransaction, editedTransaction, addContactToTransaction, removeContactFromTransaction,editAmount, contactTransactionPair} = this.props;
        let displaySaveOverlay = <Overlay isVisible={this.state.displaySavePrompt} onBackdropPress={() => this.toggleOverlay()}>
            <View>
                <Text>Save changes?</Text>
                <View style={{flexDirection: 'row'}}>
                    <Button title="Save" 
                    onPress={() => this.saveChanges()}/>
                    <Button title="Cancel"
                    onPress={() => this.cancelChanges()}/>
                </View>
            </View>
        </Overlay>

        console.log("Detailed Screen Rendered", TRANSACTION_TYPE[this.state.transactionType]);
        return (
                <React.Fragment>
                    {displaySaveOverlay}
                    <View style={styles.topBar}>
                        <View style={{flexDirection: "row", backgroundColor: APP_PRIMARY_COLOR, alignSelf: 'center'}}>
                            <Text style={{textAlign: 'center'}}>Created by you on {this.state.editedTransaction.createdDate} </Text>
                            <Icon
                                name='pencil'
                                type='entypo'
                                size={20}
                                color="black"
                                onPress={() => this.handleButtonClick()}
                            />  
                        </View>
                        <View style={{flexDirection: "row", backgroundColor: APP_PRIMARY_COLOR, alignSelf: 'center'}}>
                            <Icon
                                name='checkcircleo'
                                type='antdesign'
                                size={20}
                                containerStyle={{alignSelf: 'center', paddingHorizontal: 2}}
                            />
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{this.state.editedTransaction.transactionName}</Text>
                        </View>
                    </View>
                    <RNPickerSelect
                    style={pickerStyle}
                    disabled={!this.state.editable}
                    items={[
                        {label: 'Standard Transaction', value: TRANSACTION_TYPE.STANDARD},
                        {label: 'Meal Transaction', value: TRANSACTION_TYPE.MEAL},
                        {label: 'Recurring Transcation', value: TRANSACTION_TYPE.RECURRING}
                    ]}
                    onValueChange={(value) => {
                        if (value !== null)
                            updateTransactionType(value, this.state.editedTransaction);
                    }}

                    placeholder={{label: 'Choose Transaction Mode', value: null}}
                    />
                    <ScrollView style={styles.container}>
                        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'}>
                            <FieldInputWithLabel currentTransaction={this.state.editedTransaction} propertyName="paymentDate" label="PAYMENT DEADLINE" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>                            
                            <FieldInputWithLabel currentTransaction={this.state.editedTransaction} propertyName="note" label="NOTE" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>                            
                            <PaymentBreakdown currentTransaction={this.state.editedTransaction} editable={this.state.editable} saveChanges={this.state.saveChanges}></PaymentBreakdown>
                            <Text style={this.state.transactionType === TRANSACTION_TYPE.MEAL ? null : {display: 'none'}}>Tax: 12%, Tips: 5%</Text>
                            <Button title={"Recurring Details"} titleStyle={{color: 'black'}} containerStyle={this.state.transactionType === TRANSACTION_TYPE.RECURRING ? null : {display: 'none'}}/>
                            <FieldInputWithLabel currentTransaction={this.state.editedTransaction} propertyName="totalAmount" label="TOTAL AMOUNT" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>                            
                            <Button title={"Complete Payment"} titleStyle={{color: 'black'}} buttonStyle={{backgroundColor: APP_PRIMARY_COLOR}}/>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </React.Fragment>
        );
    }
}

interface TextInputWithLabelProps{
    currentTransaction: Transaction,
    propertyName: string,
    label: string,
    editable: boolean,
    updateEditedTransaction: (propertyName: string, value: any) => void
}

function FieldInputWithLabel(props : TextInputWithLabelProps){
    var defaultValue = props.currentTransaction[props.propertyName];
    var label : string = props.label;
    var styling = props.editable ? styles.inputFieldEditable : styles.inputField;
    return (
        <View>
            <Text style={{borderBottomWidth: 1}}>{label}</Text>
            <TextInput style={styling} 
            onChangeText={(text) => 
                props.updateEditedTransaction(props.propertyName, text)}
            editable={props.editable}>
            {defaultValue}  
            </TextInput>
        </View> 
    );
}


const styles = StyleSheet.create({
    topBar: {
        backgroundColor: APP_PRIMARY_COLOR, 
        flex: .2,
        flexDirection: 'column',
        paddingTop: 50
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
        flex: 1,
        borderBottomWidth: 1
    },
    inputFieldEditable: {
        paddingLeft: 5, 
        backgroundColor: '#ffd700', 
        flex: 1,
        borderBottomWidth: 1
    }
});

const pickerStyle = StyleSheet.create({
    inputAndroid: {
        paddingLeft: 100,
        width: 200,
    },
    inputIOS: {
        paddingLeft: 100,   
        width: 200,
    }
})

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateTransaction: (transaction : Transaction) => dispatch(updateTransaction(transaction)),
        // updateTransactionType: (transactionType, transactionId) => dispatch(updateTransactionType(transactionType, transactionId)),
    }
}

export default connect(null, mapDispatchToProps)(TransactionDetailsScreen);