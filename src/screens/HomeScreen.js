import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';

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
    var date = new Date();
    var month = date.getUTCMonth() + 1; // January starts at 0
    var day = date.getUTCDate();
    var year = date.getFullYear();

    var date = month + '/' + day + '/' + year;
    console.log('Date ', date);

    this.props.createGenetic({ heartRate, date });

  };

  render() {
    const { currentUser } = firebase.auth();
    return (
      <View>
        <Header headerText='Add your heart rate' />
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
              label='Todays heart rate'
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
