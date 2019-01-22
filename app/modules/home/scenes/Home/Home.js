import React from 'react';
import { View, FlatList, ActivityIndicator, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as home } from '../../index';
const { getComments } = home;

import styles from './styles';
import Comment from '../../components/Comment';

import { actions as auth } from '../../../auth/index';
const { signOut } = auth;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.getComments(error => alert(error.message));
  }

  renderItem({ item, index }) {
    return <Comment index={index} />;
  }

  onSignOut = () => {
    this.props
      .signOut()
      .then(() => Actions.reset('Auth'))
      .catch(error => {
        Alert.alert('Oops!', error.message);
      });
  };

  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator animating={true} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            ref="listRef"
            data={this.props.comments}
            renderItem={this.renderItem}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button
            raised
            borderRadius={4}
            title={'LOG OUT'}
            containerViewStyle={[styles.containerView]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
            onPress={this.onSignOut}
          />
        </View>
      );
    }
  }
}

function mapStateToProps(state, props) {
  return {
    isLoading: state.homeReducer.isLoading,
    comments: state.homeReducer.comments,
  };
}

export default connect(
  mapStateToProps,
  { getComments, signOut }
)(Home);
