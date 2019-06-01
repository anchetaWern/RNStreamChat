import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import StringHash from 'string-hash';
import Config from 'react-native-config';

const CHAT_SERVER = 'YOUR NGROK HTTPS URL';

class Login extends Component {
  static navigationOptions = {
    title: "Login"
  }


  state = {
    username: "",
    is_loading: false
  }
  //

  render() {
    const { username, is_loading } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>

          <View style={styles.main}>
            <View style={styles.field_container}>
              <Text style={styles.label}>Enter your username</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={username => this.setState({ username })}
                value={username}
              />
            </View>

            {!is_loading && (
              <Button title="Login" color="#0064e1" onPress={this.login} />
            )}

            {is_loading && (
              <Text style={styles.loading_text}>Loading...</Text>
            )}
          </View>
        </View>
      </View>
    );
  }


login = async () => {
  const username = this.state.username;
  this.setState({
    is_loading: true
  });

  if (username) {
    try {
      const user_id = StringHash(username).toString();
      const response = await axios.post(`${CHAT_SERVER}/auth`, {
        user_id
      });

      this.props.navigation.navigate("Chat", {
        user_id,
        username,
        user_token: response.data.token
      });

    } catch (err) {
      console.log("error: ", err);
    }
  }
}

}

export default Login;

const styles = {
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF"
  },
  field_container: {
    marginTop: 20
  },
  label: {
    fontSize: 16
  },
  text_input: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5
  },
  loading_text: {
    alignSelf: "center"
  }
}