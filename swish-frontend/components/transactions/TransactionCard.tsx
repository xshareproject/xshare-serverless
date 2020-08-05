import * as React from 'react';
import { Text, View } from '../Themed';
import { StyleSheet, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {TransactionDetailSchema, PaymentStatus} from '../../schema/Schema';
import { TransactionsContext } from '../../data_store/Context';

//props need to define navigator
interface TransactionCardProps {
    transaction: TransactionDetailSchema,
    navigationCallback: (transaction : TransactionDetailSchema) => void 
}

export default function TransactionCard(props: TransactionCardProps){   
    // console.log("Transaction Card: ", props.transaction) 
    return (
        <TouchableHighlight onPress={ () => props.navigationCallback(props.transaction)}> 
            <View style={styles.card}> 
                <Image source={props.transaction.image} style={styles.image}></Image>
                <Text> {props.transaction.name} </Text>
                <Text> {props.transaction.amount} </Text>
                <Text> {props.transaction.createdDate} </Text>
                <Text> {PaymentStatus[props.transaction.status]} </Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 60,
        borderTopColor: '#ae123d',
        borderBottomWidth: 2,
        paddingTop: 5,
    },
    image: {
        transform: [
            {scale: 0.5},
            {translateY: -50}
        ],
        height: 100,
        width: 100
    }
})

