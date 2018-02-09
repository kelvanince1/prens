import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { Header } from './src/components/UI';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import GeneticScreen from './src/screens/GeneticScreen';
import reducers from './src/reducers';

class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View>
          <Header headerText='Prenetics' />
          <AuthScreen />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   paddingTop:25,
   backgroundColor: "#fff",
   justifyContent: "center"
  }
});

export default App;
