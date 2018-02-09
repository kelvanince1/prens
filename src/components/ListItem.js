import React, { Component } from 'react';
import { Text } from 'react-native';
import { FormField } from './UI';

class ListItem extends Component {
  render() {
    const { heartRate } = this.props.customerGenetic.heartRate;
    return (
      <FormField>
        <Text style={styles.listStyle}>{heartRate}</Text>
      </FormField>
    )
  }
}

const styles = {
  listStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
}

export default ListItem;
