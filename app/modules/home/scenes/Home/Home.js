import React from 'react';

import {
  Button,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import styles from './styles';
import Comment from '../../components/Comment';
import { actions as home } from '../../index';
const { getComments } = home;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.getComments(err => alert(err.message));
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
          <Button
            raised
            borderRadius={4}
            title={'LOG OUT'}
            containerViewStyle={[styles.containerView]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
            onPress={this.onSignOut}
          />
          <FlatList
            ref="listRef"
            data={this.props.comments}
            renderItem={this.renderItem}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}

function mapState(state, props){
  return {
    isLoading: state.homeReducer.isLoading,
    comments: state.homeReducer.comments
  }
}

export default connect(
  mapState,
  { getComments }
)(Home);
