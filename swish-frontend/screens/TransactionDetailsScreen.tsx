import * as React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Platform, Route } from 'react-native';
import { Button, Icon, Avatar, Overlay } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { TextInput, ScrollView, State } from 'react-native-gesture-handler';
import {TransactionsContext, TransactionSchema, Transactions} from '../data_store/Transactions';
import { NavigationProp} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {APP_PRIMARY_COLOR} from '../assets/theme';
import { PaymentBreakdown } from '../components/PaymentBreakdown';
import * as lodash from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updateTransactionType } from '../redux/transaction/transaction.actions';
import { Transaction } from '../redux/types/types.transaction';
import { update } from 'lodash';
import {AppState} from '../redux/root-reducer';
import { Contact } from '../redux/types/types.contact';
import { addContactToTransaction, editAmount, removeContactFromTransaction } from '../redux/contactTransactionPair/contactTransactionPair.action';
import { ContactTransactionPair } from '../redux/types/types.ContactTransactionPair';

interface TransactionDetailsState {
    editedTransaction: TransactionSchema,
    editable: boolean,
    displaySavePrompt: boolean,
    saveChanges: boolean,
    transactionType: TRANSACTION_TYPE
}

interface TransactionDetailsProps {
    navigation: NavigationProp<any>,
    route: Route
}

const actions = {
    updateTransactionType: (transactionType: TRANSACTION_TYPE, transactionId: Transaction) : any => true,
    
}

interface Props extends StateProps, DispatchProps {
    updateTransactionType: typeof actions.updateTransactionType;
    route: Route;
    editedTransaction: Transaction[];
}

enum TRANSACTION_TYPE{
    STANDARD, MEAL, RECURRING
}


export class TransactionDetailsScreen extends React.Component<Props, TransactionDetailsState>{
    constructor (props: Props, context: any){
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
        this.context.updateTransaction(this.state.editedTransaction); 
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
        const {updateTransactionType, currentTransaction, editedTransaction, addContactToTransaction, removeContactFromTransaction,editAmount, contactTransactionPair} = this.props;
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
                            updateTransactionType(value, currentTransaction[0]);
                    }}

                    placeholder={{label: 'Choose Transaction Mode', value: null}}
                    />
                    <ScrollView style={styles.container}>
                        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'}>
                            <FieldInputWithLabel currentTransaction={this.state.editedTransaction} propertyName="paymentDate" label="PAYMENT DEADLINE" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>                            
                            <FieldInputWithLabel currentTransaction={this.state.editedTransaction} propertyName="note" label="NOTE" editable={this.state.editable} updateEditedTransaction={this.updateEditedTransaction}/>                            
                            <PaymentBreakdown contactTransactionPair = {contactTransactionPair} editAmount = {editAmount} removeContactFromTransaction = {removeContactFromTransaction} addContactToTransaction = {addContactToTransaction} currentTransaction={editedTransaction} editable={this.state.editable} saveChanges={this.state.saveChanges}></PaymentBreakdown>
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
    currentTransaction: TransactionSchema,
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

TransactionDetailsScreen.contextType = TransactionsContext;

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

interface StateProps {
    currentTransaction: Transaction[];
    contactTransactionPair: ContactTransactionPair[];
}

const mapStateToProps = (state: AppState): StateProps => ({
    currentTransaction: state.transactionReducer,
    contactTransactionPair: state.contactTransactionPairReducer
})

interface DispatchProps {
    updateTransactionType: typeof actions.updateTransactionType,
    addContactToTransaction: Function,
    removeContactFromTransaction: Function,
    editAmount: Function    
}

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    updateTransactionType: (transactionType, transactionId) => dispatch(updateTransactionType(transactionType, transactionId)),
    addContactToTransaction: (contact: Contact, transaction: Transaction) => dispatch(addContactToTransaction(contact,transaction)),
    removeContactFromTransaction: (contactId : string) => dispatch(removeContactFromTransaction(contactId)),
    editAmount: (contactId: string, amount: number) => dispatch(editAmount(contactId,amount)),
})



export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsScreen)