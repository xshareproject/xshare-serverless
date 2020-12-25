import * as React from 'react';
import { Text, View } from '../Themed';
import { StyleSheet, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { Transaction } from '../../redux/types/types.Transaction';
import { Contact } from '../../redux/types/types.Contact';
import {PaymentStatus, ContactTransactionPair} from '../../redux/types/types.ContactTransactionPair';
import {AppState} from '../../redux/root-reducer';
import { connect } from 'react-redux';

interface StateProps {
    transactionContacts: Contact[]
}

interface TransactionCardProps {
    transaction: Transaction,
    transactionContacts: Contact[], 
    navigationCallback: (transaction: Transaction) => void 
}

function TransactionCard(props: TransactionCardProps){   
    const transactionContacts = props.transactionContacts;

    let transactionContactName : string = transactionContacts[0].name;
    if (transactionContacts.length > 1){
        transactionContactName =  transactionContacts[0].name + " & co";
    }
    
    return (
        <TouchableHighlight onPress={ () => props.navigationCallback(props.transaction)}> 
            <React.Fragment>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <View style={styles.card}> 
                    <Avatar rounded
                    size="medium"
                    source={transactionContacts[0].profilePicture}
                    containerStyle={styles.avatar}
                    />
                    <View style={{flexDirection: 'column', flex: 0.4}}>
                        <Text style={styles.text}>{transactionContactName} </Text>
                        <Text style={styles.text}>{props.transaction.transactionName}</Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 0.4}}>
                        <Text style={styles.text}>{"$ " + props.transaction.totalAmount}</Text>
                        <Text style={styles.text}>{props.transaction.paymentDate}</Text>
                    </View>
                    <Text style={styles.text}>{PaymentStatus[0]}</Text>
                </View>
            </React.Fragment>
        </TouchableHighlight>
    );
}


const mapStateToProps = (state: AppState, ownProps : TransactionCardProps): StateProps => {
    let contactTransactionPair = state.contactTransactionPairReducer.filter((contactTransactionPair : ContactTransactionPair) => {return contactTransactionPair.transactionId == ownProps.transaction.id });
    let transactionContacts = contactTransactionPair.map((contactTransactionPair: ContactTransactionPair) => 
        {return state.contactReducer.find((value) => value.id === contactTransactionPair.contactId)});

    return {transactionContacts};
};

export default connect(mapStateToProps)(TransactionCard);


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 80,
        marginVertical: 5,
    },
    avatar: {
        marginLeft: 15, 
        marginRight: 7,
        alignSelf: 'center'    
    },
    text: {
        marginHorizontal: 8,
        flex: 0.3,
    },
    separator: {
        height: 1,
        width: '100%',
    },
})

