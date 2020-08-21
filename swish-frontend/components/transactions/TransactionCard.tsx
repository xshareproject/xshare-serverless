import * as React from 'react';
import { Text, View } from '../Themed';
import { StyleSheet, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { TransactionSchema } from '../../data_store/Transactions';
import { PaymentStatus, ContactSchema, TransactionContactPair } from "../../data_store/Contacts";
import { Avatar } from 'react-native-elements';
import {ContactsContext} from '../../data_store/Contacts'

interface TransactionCardProps {
    transaction: TransactionSchema,
    navigationCallback: (transaction: TransactionSchema) => void 
}

export default function TransactionCard(props: TransactionCardProps){   
    const contactContext = React.useContext(ContactsContext);

    //getContactByTransactions returns a void[], therefore required casting to ContactSchema[]
    //however as void[] is not comparable to ContactSchema[], it requires casting to unknown
    //TODO: Refactoring
    const contactListVoid = contactContext.getContactsByTransactions(props.transaction.id);
    const contactList = contactListVoid as unknown as ContactSchema[];

    let transactionContactName : string = contactList[0].name;
    if (contactList.length > 1){
        transactionContactName =  contactList[0].name + " & co";
    }

    return (
        <TouchableHighlight onPress={ () => props.navigationCallback(props.transaction)}> 
            <React.Fragment>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <View style={styles.card}> 
                    <Avatar rounded
                    size="medium"
                    source={contactList[0].image}
                    containerStyle={styles.avatar}
                    />
                    <View style={{flexDirection: 'column', flex: 0.4}}>
                        <Text style={styles.text}>{transactionContactName} </Text>
                        <Text style={styles.text}>{props.transaction.transactionName}</Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 0.4}}>
                        <Text style={styles.text}>{"$ " + props.transaction.amount}</Text>
                        <Text style={styles.text}>{props.transaction.paymentDate}</Text>
                    </View>
                    <Text style={styles.text}>{PaymentStatus[0]}</Text>
                </View>
            </React.Fragment>
        </TouchableHighlight>
    );
}

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

