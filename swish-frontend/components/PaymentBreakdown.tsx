import * as React from 'react';
import { SearchBar, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import {View} from './Themed';
import {StyleSheet, Text, FlatList} from 'react-native';
import { ContactSchema, Contacts, ContactsContext, TransactionContactPair} from '../data_store/Contacts';
import { State, TextInput } from 'react-native-gesture-handler';
import { connect} from 'react-redux';
import { ContactTransactionPairs, PaymentStatus } from '../redux/types/types.ContactTransactionPair';
import {AppState} from '../redux/root-reducer';
import {Dispatch} from 'redux';
import {Contact} from '../redux/types/types.Contact';
import {AppActions} from '../redux/types/types.actions';
import { Transaction } from '../redux/types/types.Transaction';
import { addContactToTransaction, editAmount, removeContactFromTransaction } from '../redux/contactTransactionPair/contactTransactionPair.action';


interface PaymentBreakdownState{
    search: string,
    searchResultList: ContactSchema[],
    contactTransactionPairs: (TransactionContactPair)[],
    contactTransactionPairsInitial: (TransactionContactPair)[],
    contactViewVisible: boolean,
    editable: boolean,
    saveChanges: boolean,
}

const actions = {
    addContactToTransaction: (contact: Contact, transaction: Transaction): any => true,
    removeContactFromTransaction: (contactId: string): any => true,
    editAmount: (contactId: string, amount: number): any => true
}

// interface PaymentBreakdownProps{
//     currentTransaction: TransactionSchema,
//     // onSubmitCallback: (TransactionContactList : TransactionContactPair[]) => void,

//     editable: boolean,
//     saveChanges: boolean
// }


interface Props extends StateProps, DispatchProps {
    editable: boolean,
    saveChanges: boolean
}


export class PaymentBreakdown extends React.Component<Props, PaymentBreakdownState> {
    constructor(props : Props){
        super(props);
        this.state = {
          search: "",
          searchResultList: [],
          contactTransactionPairs: [],
          contactTransactionPairsInitial: [],
          contactViewVisible: false,
          editable: this.props.editable,
          saveChanges: this.props.saveChanges,
        };
    }

    updateSearch = (search : string) => {
        this.setState({ search }, () => {
            this.setState({
                searchResultList: this.state.search === "" ? [] : this.context.getContactByName(search)
            })
        });
    }

    // addContactToTransaction = (contact : ContactSchema) => {
    //     let transactionId = this.props.currentTransaction.id;
    //     let newContactTransactionPair : TransactionContactPair = {
    //         id: "",
    //         transactionId,
    //         contactId: contact.id,
    //         paymentStatus: PaymentStatus.Pending,
    //         amountOwned: 0
    //     };
    //     let contactTransactionPairList = this.state.contactTransactionPairs;
    //     contactTransactionPairList.push(newContactTransactionPair);
    //     this.setState({
    //         contactTransactionPairs: contactTransactionPairList
    //     }); 
    // }

    // removeContactFromTransaction = (contactId: string) => {
    //     let contactTransactionPairList = this.state.contactTransactionPairs;
    //     let indexToRemove = contactTransactionPairList.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === contactId});
    //     contactTransactionPairList.splice(indexToRemove, 1);
    //     this.setState({
    //         contactTransactionPairs: contactTransactionPairList
    //     });
    // }

    // editAmount = (contactId : string, amount: string) => {
    //     let amountNum = parseFloat(amount);
    //     console.log("AMOUNT ", amountNum);
    //     let indexToModify = this.state.contactTransactionPairs.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === contactId});
    //     let contactTransactionPairList = this.state.contactTransactionPairs;
    //     contactTransactionPairList[indexToModify]["amountOwned"] = amountNum;
    //     this.setState({
    //         contactTransactionPairs: contactTransactionPairList
    //     });
    // }

    toggleContactView = () => {
        this.setState({
            contactViewVisible: !this.state.contactViewVisible
        });
    }

    componentDidMount = () => {              
        let contactTransactionPairs : TransactionContactPair[] = this.context.getTransactionContactPairs(this.props.currentTransaction[0].id);
        this.setState({
            contactTransactionPairs
        }, () => {
            this.setState({
                contactTransactionPairsInitial: this.state.contactTransactionPairs
            });
        });
    }

    componentDidUpdate = () => {
        if(this.state.saveChanges){
            let contactContext = this.context as Contacts;          //need a way to find the proper index for current transaction, this.props.currentTransaction
            contactContext.deleteContactsByTransactions(this.props.currentTransaction[0].id);
            contactContext.updateContactsByTransactions(this.state.contactTransactionPairs!);
        }
    }

    static getDerivedStateFromProps = (nextProps : Props, prevState : PaymentBreakdownState) => {
        if(nextProps.editable !== prevState.editable){
            return ({editable: nextProps.editable})
        }
        if(nextProps.saveChanges !== prevState.saveChanges){
            return ({saveChanges: nextProps.saveChanges}); 
        }
        return null;
    }

    render(){
        const {addContactToTransaction, removeContactFromTransaction, editAmount, currentTransaction, contactTransactionPair } = this.props;
        let contactContext = this.context as Contacts;
        const search = this.state.search;
        let displayResultElement = <FlatList 
                data={this.state.searchResultList} 
                renderItem={ ({item: contact}) => {
                    return(
                    <ListItem   
                    title={contact.name}
                    onPress={() => addContactToTransaction(contact, currentTransaction[0])}  //expecting second argument of currentTransaction
                    key={contact.id}/>
                    )} 
                }
                keyExtractor={(item) => item.id}/>
        return(
            <View>
                <Text style={{borderBottomWidth: 1}}>PAYMENT BREAKDOWN</Text>
                <Overlay isVisible={this.state.contactViewVisible} onBackdropPress={() => this.toggleContactView()}
                    overlayStyle={{height: "80%", width: "90%"}}>
                    <React.Fragment>
                        <SearchBar placeholder="Search for contact"
                            onChangeText={this.updateSearch}
                            value={search}/>
                        {displayResultElement}
                    </React.Fragment>
                </Overlay>
                
                <View>
                    <ListItem
                        title={"Add Contact"}
                        onPress={ () => this.toggleContactView() }
                        containerStyle={this.state.editable? {backgroundColor: "#000000", flex: 0.9} : styles.displayHide}
                        titleStyle={{color: "#ffffff"}}
                    />
                    {this.state.contactTransactionPairs.map((contactTransactionPair) => (
                    <View style={{flexDirection: 'row', borderBottomWidth: 1}}>
                        <ListItem
                            title={contactContext.getContactsById(contactTransactionPair!.contactId)!.name}
                            onPress={ () => console.log("Contact Pressed")}
                            style={{flex: 0.8}}
                            titleStyle={{fontSize: 14}}
                        />
                        <Text style={{textAlignVertical: 'center'}}>$</Text>    
                        <TextInput
                            defaultValue={contactTransactionPair!.amountOwned.toString()}
                            onSubmitEditing={ ({nativeEvent}) => editAmount(contactTransactionPair.contactId, parseFloat(nativeEvent.text))}
                            key={contactTransactionPair!.id}
                            style={{flex: 0.8, fontSize: 14}}
                            keyboardType='number-pad'
                            editable={this.state.editable}
                        />
                        <Button 
                        icon={
                            <Icon
                            name='circle-with-minus'
                            type='entypo'
                            size={18}
                            color="black"
                            />
                        }
                        type="clear"
                        containerStyle={this.state.editable? styles.removeContactButton : styles.displayHide}
                        onPress={() => {removeContactFromTransaction(contactTransactionPair!.contactId)}}
                        /> 
                    </View>))} 
                </View>      
            </View>
        );
    }
}

const styles = StyleSheet.create({
    displayShow: {
        flex: 1,
    },
    displayHide: {
        display: "none"
    },
    removeContactButton: {
        alignSelf: 'center',
    }
});

PaymentBreakdown.contextType = ContactsContext;

interface StateProps {
    currentTransaction: Transaction[];
    contactTransactionPair: ContactTransactionPairs[];
}


const mapStateToProps = (state: AppState): StateProps => ({
    contactTransactionPair: state.contactTransactionPairReducer,
    currentTransaction: state.transactionReducer,
        
});

interface DispatchProps {
    addContactToTransaction: Function,
    removeContactFromTransaction: Function,
    editAmount: Function 
}

//actions
const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
        addContactToTransaction: (contact: Contact, transaction: Transaction) => dispatch(addContactToTransaction(contact,transaction)),
        removeContactFromTransaction: (contactId : string) => dispatch(removeContactFromTransaction(contactId)),
        editAmount: (contactId: string, amount: number) => dispatch(editAmount(contactId,amount)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PaymentBreakdown)