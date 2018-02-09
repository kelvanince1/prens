import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { TextField, FormField, Form, Button, Header } from '../components/UI';
import { fetchGenetics } from '../actions';

class GeneticScreen extends Component {
  componentWillMount() {
    this.props.fetchGenetics();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ customerGenetics }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(customerGenetics);
  }

  render() {
    console.log('PROPS', this.props);
    return (
      <View>
        <Header headerText='Genetic Results' />
        <Form>
          <Text>test@test.com</Text>

          <FormField>
            <Text>Heart rate info</Text>
          </FormField>
        </Form>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const customerGenetics  = _.map(state.customerGenetics, (val, uid) => {
    return {...val, uid};
  });
  return { customerGenetics };
};

export default connect(mapStateToProps, {fetchGenetics})(GeneticScreen);
