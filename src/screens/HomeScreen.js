import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import moment from 'moment';

import { TextField, FormField, Form, Button, Header } from '../components/UI';
import { geneticUpdate, createGenetic, fetchGenetics } from '../actions';
import ListItem from '../components/ListItem';

class HomeScreen extends Component {
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

  renderRow(customerGenetic) {
    return <ListItem customerGenetic={customerGenetic} />
  }

  onButtonPress() {
    const { heartRate } = this.props;
    var date = moment().format('MMM do YY');

    this.props.createGenetic({ heartRate, date });

  };

  render() {
    console.log('Props', this.props);
    const { currentUser } = firebase.auth();
    return (
      <View>
        <Header headerText='Genetic Results' />
        <Form style={{ flex: 1 }}>
          <Text>{currentUser.email}</Text>

          <ListView
            enableEmptySections
            automaticallyAdjustContentInsets={false}
            initialListSize={4}
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />

          <FormField>
            <TextField
              placeholder='Enter heart rate'
              value={this.props.heartRate}
              onChangeText={text => this.props.geneticUpdate({ prop: 'heartRate', value: text })}
            />
          </FormField>

          <FormField>
            <Button onPress={this.onButtonPress.bind(this)}>
              Add
            </Button>
          </FormField>
        </Form>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const heartRate = state.genetic;
  const customerGenetics  = _.map(state.customerGenetics, (val, uid) => {
    return {...val, uid};
  });
  return { customerGenetics, heartRate };
};

export default connect(mapStateToProps, {geneticUpdate, createGenetic, fetchGenetics})(HomeScreen);
