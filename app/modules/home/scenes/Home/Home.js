import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';

import { actions as home } from '../../index';
const { getComments } = home;

import styles from './styles';
import Comment from '../../components/Comment';

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
  { getComments }
)(Home);
