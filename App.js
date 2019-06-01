import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.starter}>React Native Stream Chat Starter</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  starter: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
}