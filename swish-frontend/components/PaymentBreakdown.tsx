import * as React from 'react';
import { SearchBar, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import {View} from './Themed';
import {StyleSheet, Text, FlatList} from 'react-native';
import { TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Contact} from '../redux/types/types.Contact';
import { ContactTransactionPair, PaymentStatus } from '../redux/types/types.ContactTransactionPair';
import {AppState} from '../redux/root-reducer';
import {Dispatch} from 'redux';
import { Transaction } from '../redux/types/types.Transaction';
import { addMultipleContactTransactionPairs, editAmount, removeContactFromTransaction, removeContactsByTransactionId } from '../redux/contactTransactionPair/contactTransactionPair.action';
import * as lodash from 'lodash';


interface StateProps {
    contactTransactionPairs: ContactTransactionPair[],
    contacts: Contact[]
}

interface DispatchProps {
    addMultipleContactTransactionPairs: Function,
    removeContactFromTransaction: Function,
    removeContactsByTransactionId: Function,
    editAmount: Function 
}

interface ParentComponentProps {
    currentTransaction: Transaction,
    editable: boolean,
    saveChanges: boolean,
}

interface PaymentBreakdownProps extends StateProps, DispatchProps, ParentComponentProps {}

interface PaymentBreakdownState{
    search: string,
    searchResultList: Contact[],
    contactTransactionPairs: (ContactTransactionPair)[],
    contactViewVisible: boolean,
    editable: boolean,
    saveChanges: boolean,
}

// const actions = {
//     addContactToTransaction: (contact: Contact, transaction: Transaction): any => true,
//     removeContactFromTransaction: (contactId: string): any => true,
//     removeContactsByTransactionId: (transactionIdl: string) : any => true,
//     editAmount: (contactId: string, amount: number): any => true
// }

class PaymentBreakdown extends React.Component<PaymentBreakdownProps, PaymentBreakdownState> {
    constructor(props : PaymentBreakdownProps){
        super(props);
        this.state = {
          search: "",
          searchResultList: [], 
          contactTransactionPairs: [],
          contactViewVisible: false,
          editable: this.props.editable,
          saveChanges: this.props.saveChanges,
        };
    }

    componentDidMount(){
        this.setState({
            contactTransactionPairs: lodash.cloneDeep(this.props.contactTransactionPairs)
        })
    }

    updateSearch = (search : string) => {
        this.setState({ search }, () => {
            this.setState({
                searchResultList: this.state.search === "" ? [] : this.getContactByName(search)
            })
        });
    }

    getContactByName = (name: string) => {
        console.log ("Contacts: ", this.props.contacts);
        return this.props.contacts.filter((contact : Contact) => {return contact.name.includes(name)} );
    }

    addContactToTransaction = (contact : Contact) => {
        let transactionId = this.props.currentTransaction.id;
        let newContactTransactionPair : ContactTransactionPair = {
            id: "",
            transactionId,
            contactId: contact.id,
            paymentStatus: PaymentStatus.Pending,
            amountOwned: 0
        };
        let contactTransactionPairList = this.state.contactTransactionPairs;
        contactTransactionPairList.push(newContactTransactionPair);
        this.setState({
            contactTransactionPairs: contactTransactionPairList
        }); 
    }

    removeContactFromTransaction = (contactId: string) => {
        let contactTransactionPairList = this.state.contactTransactionPairs;
        let indexToRemove = contactTransactionPairList.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === contactId});
        contactTransactionPairList.splice(indexToRemove, 1);
        this.setState({
            contactTransactionPairs: contactTransactionPairList
        });
    }

    editAmount = (contactId : string, amount: string) => {
        let amountNum = parseFloat(amount);
        console.log("AMOUNT ", amountNum);
        let indexToModify = this.state.contactTransactionPairs.findIndex((contactTransactionPair) => {return contactTransactionPair?.contactId === contactId});
        let contactTransactionPairList = this.state.contactTransactionPairs;
        contactTransactionPairList[indexToModify]["amountOwned"] = amountNum;
        this.setState({
            contactTransactionPairs: contactTransactionPairList
        });
    }

    toggleContactView = () => {
        this.setState({
            contactViewVisible: !this.state.contactViewVisible
        });
    }

    componentDidUpdate = () => {
        if(this.state.saveChanges){
            this.updateContactsByTransactions();
        }
    }

    updateContactsByTransactions = () => {
        let changeHappened = !lodash.isEqual(this.props.contactTransactionPairs, this.state.contactTransactionPairs);
        if (changeHappened){
            this.props.removeContactsByTransactionId(this.props.currentTransaction);
            this.props.addMultipleContactTransactionPairs(this.state.contactTransactionPairs);
        }        
    }


    static getDerivedStateFromProps = (nextProps : PaymentBreakdownProps, prevState : PaymentBreakdownState) => {
        if(nextProps.editable !== prevState.editable){
            return ({editable: nextProps.editable})
        }
        if(nextProps.saveChanges !== prevState.saveChanges){
            return ({saveChanges: nextProps.saveChanges}); 
        }
        return null;
    }

    getContactById = (contactId: string) => {
        return this.props.contacts.find((contact : Contact) => {return contactId === contact.id});
    }

    render(){
        const search = this.state.search;

        //Display results of searching for contacts
        let displayResultElement = <FlatList 
                data={this.state.searchResultList} 
                renderItem={ ({item: contact}) => {
                    return(
                    <ListItem
                    onPress={() => {this.addContactToTransaction(contact); this.setState({contactViewVisible: false});} } 
                    key={contact.id}>
                        <ListItem.Title>
                            {contact.name}
                        </ListItem.Title>
                    </ListItem>
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
                {/* Add contact to current transaction */}
                <View>
                    <ListItem
                    onPress={ () => this.toggleContactView() }
                    containerStyle={this.state.editable? {backgroundColor: "#000000", flex: 0.9} : styles.displayHide}>
                        <ListItem.Content>
                            <ListItem.Title style={{color: "#ffffff"}}>
                                {"Add Contact"}
                            </ListItem.Title>
                            {this.state.contactTransactionPairs.map((contactTransactionPair) => (
                                <View style={{flexDirection: 'row', borderBottomWidth: 1}} key={contactTransactionPair.id}>
                                    <ListItem
                                        onPress={ () => console.log("Contact Pressed")}
                                        style={{flex: 0.8}}>
                                        <ListItem.Title style={{fontSize: 14}}>
                                            {this.getContactById(contactTransactionPair!.contactId)!.name}
                                        </ListItem.Title>
                                    </ListItem>
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
                                </View>
                            ))}
                        </ListItem.Content>
                    </ListItem>
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

const mapStateToProps = (state: AppState, ownProps : ParentComponentProps): StateProps => {
    const contactTransactionPairs : ContactTransactionPair[] = state.contactTransactionPairReducer;
    const contacts : Contact[] = state.contactReducer;

    const currentTransactionId = ownProps.currentTransaction.id;
    let filteredContactTransactionPairs = contactTransactionPairs.filter((contactTransactionPair) => {
        return contactTransactionPair.transactionId == currentTransactionId;
    });
    
    return {contactTransactionPairs: filteredContactTransactionPairs, contacts};
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    addMultipleContactTransactionPairs: (contactTransactionPairs: ContactTransactionPair[]) => dispatch(addMultipleContactTransactionPairs(contactTransactionPairs)),
    removeContactFromTransaction: (contactId : string) => dispatch(removeContactFromTransaction(contactId)),
    removeContactsByTransactionId: (transactionId: string) => dispatch(removeContactsByTransactionId(transactionId)),
    editAmount: (contactId: string, amount: number) => dispatch(editAmount(contactId,amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBreakdown);