import React from 'react';
import { View } from 'react-native';

const FormField = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

// I'm not exporting as default since I am exporting all UI components from the inex.js file withing the UI folder.
// ES6 allows the key/value to be reduced to one FormField value. It is the same as export { FormField: FormField }
export { FormField };
