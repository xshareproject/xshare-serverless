import * as React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

export default class NewTransaction extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>New Transaction</Text>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.8, 
        width: Dimensions.get('window').width * 0.8
    },
});
