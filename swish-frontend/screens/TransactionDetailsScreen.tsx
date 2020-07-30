import * as React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import { TransactionDetailSchema } from '../components/transactions/TransactionCard';
import { TextInput } from 'react-native-gesture-handler';

interface TransactionDetailsState {
    transactionDetails : TransactionDetailSchema;
}


export default class TransactionDetailsScreen extends React.Component<{navigator : any, route : any}, TransactionDetailsState>{
    constructor (props : any){
        super(props);
        this.state = {
            transactionDetails: this.props.route.params
        };
    }
    render(){
        return (
            <React.Fragment>
                {/* <View style={styles.topBar}>
                </View> */}
                <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'} style={styles.container}>
                    {/* <Image source={this.state.transactionDetails.image}></Image> */}
                    <TextInput style={{backgroundColor: "#ccccdd"}}> {this.state.transactionDetails.name} </TextInput>
                    <TextInput style={{borderWidth: 1, borderColor: '#12de34'}}> {this.state.transactionDetails.amount} </TextInput>
                    <TextInput> {this.state.transactionDetails.date} </TextInput>
                    <TextInput> {this.state.transactionDetails.status} </TextInput>
                </KeyboardAvoidingView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        // backgroundColor: "#aaaaaa", 
        // flex: 1
    },
    container: {
        flex: 1 ,
    }
});