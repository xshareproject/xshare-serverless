import * as React from 'react';
import { Text, View } from './Themed';
import { StyleSheet, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';


export interface TransactionDetailSchema {
    id: string,
    name: string,
    amount: number,
    date: string,
    image: any,
    status: string 
}

interface TransactionCardState {

}

//props need to define navigator
interface TransactionCardProps {
    transactionDetails : TransactionDetailSchema,
    navigationCallback : () => void
}

export default function TransactionCard(props : TransactionCardProps){    
    return (
        <TouchableHighlight onPress={ () => props.navigationCallback() }>
            <View style={styles.card}> 
                <Image source={props.transactionDetails.image} style={styles.image}></Image>
                <Text> {props.transactionDetails.name} </Text>
                <Text> {props.transactionDetails.amount} </Text>
                <Text> {props.transactionDetails.date} </Text>
                <Text> {props.transactionDetails.status} </Text>
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

