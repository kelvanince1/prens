import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { Button, Form, FormField, TextField, Loader } from '../components/UI';
import HomeScreen from './HomeScreen';
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from '../config';

class AuthScreen extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    auth: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL: databaseURL,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          auth: true
        })
      } else {
        this.setState({
          auth: false
        })
      }
    });
  }

  onLoginPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess.bind(this))
      .catch(this.onAuthFailure.bind(this))
  }

  onSignUpPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess.bind(this))
      .catch(this.onAuthFailure.bind(this))
  }

  onAuthSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
      auth: true
    });
  }

  renderContent() {
    switch(this.state.auth) {
      case true:
        return (
          <View>
            <HomeScreen />
            <FormField>
              <Button style={{ position: 'absolute', bottom: 0}} onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </FormField>
          </View>
        );

      case false:
        return (
          <Form>
            <FormField>
              <TextField
                placeholder='user@prenetics.com'
                label='Email'
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </FormField>

            <FormField>
              <TextField
                placeholder='Password'
                label='Password'
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </FormField>

            <Text style={styles.errorText}>{this.state.error}</Text>
            {this.renderFeature()}
          </Form>
        )
      default:
        return (
          <View style={{ marginTop: 40 }}>
            <Loader size='large' />
          </View>
        )
    }
  }

  onAuthFailure() {
    this.setState({
      error: 'Username or password is incorrect',
      loading: false
    })
  }

  renderFeature() {
    if(this.state.loading) {
      return (
        <FormField>
          <Loader size='small' />
        </FormField>
      )
    }
    return (
      <FormField>
        <Button onPress={this.onLoginPress.bind(this)}>
          Login
        </Button>

        <Button onPress={this.onSignUpPress.bind(this)}>
          Sign Up
        </Button>
      </FormField>
    )
  };

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  };
};

const styles = {
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default AuthScreen;
