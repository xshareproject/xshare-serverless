import * as React from 'react';
import { Text, View } from '../Themed';
import { StyleSheet, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { TransactionSchema, PaymentStatus } from '../../data_store/Transactions';
import { Avatar } from 'react-native-elements';

//props need to define navigator
interface TransactionCardProps {
    transaction: TransactionSchema,
    navigationCallback: (transaction : TransactionSchema) => void 
}

export default function TransactionCard(props: TransactionCardProps){   
    return (
        <TouchableHighlight onPress={ () => props.navigationCallback(props.transaction)}> 
            <React.Fragment>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <View style={styles.card}> 
                    <Avatar rounded
                    size="medium"
                    source={props.transaction.image}
                    containerStyle={styles.avatar}
                    />
                    <Text style={styles.text}>{props.transaction.name}</Text>
                    <Text style={styles.text}>{"$ " + props.transaction.amount}</Text>
                    <Text style={styles.text}>{props.transaction.paymentDate}</Text>
                    <Text style={styles.text}>{PaymentStatus[props.transaction.status]}</Text>
                </View>
            </React.Fragment>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 60,
        // borderBottomWidth: 1,
        marginVertical: 5,
    },
    avatar: {
        marginLeft: 15, 
        marginRight: 7    
    },
    text: {
        margin: 10,
        flex: 0.5
    },
    separator: {
        height: 1,
        width: '100%',
    },
})

