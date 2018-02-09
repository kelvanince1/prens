import React from 'react';
import { View } from 'react-native';

const Form = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

// I'm not exporting as default since I am exporting all UI components from the inex.js file withing the UI folder.
// ES6 allows the key/value to be reduced to one Form value. It is the same as export { Form: Form }
export { Form };
