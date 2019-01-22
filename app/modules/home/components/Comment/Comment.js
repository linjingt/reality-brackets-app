import React from 'react';
import { Text, View, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';

import styles from './styles';

import { actions, theme } from '../../index';
import { Actions } from 'react-native-router-flux';

const { deleteComment, toggleLove } = actions;
const { normalize } = theme;

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.onOption = this.onOption.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onToggleLove = this.onToggleLove.bind(this);
    this.renderLoveButton = this.renderLoveButton.bind(this);
  }

  onOption() {
    const { comments, index } = this.props;
    const comment = comments[index];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Edit', 'Delete', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) Actions.NewComment({ edit: true, comment });
        else if (buttonIndex === 1) this.onDelete();
      }
    );
  }

  onDelete() {
    const { comments, index } = this.props;
    const comment = comments[index];

    this.props.deleteComment(comment, error => alert(error.message));
  }

  onToggleLove() {
    const { user, comments, index } = this.props;
    const comment = comments[index];

    const data = { comment, uid: user.uid };

    this.props.toggleLove(data, error => alert(error.message));
  }

  renderOptionButton() {
    return (
      <View style={styles.right}>
        <TouchableOpacity onPress={this.onOption}>
          <View style={styles.buttonContainer}>
            <Icon
              name={'md-more'}
              type="ionicon"
              color="#fff"
              size={normalize(20)}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderLoveButton() {
    const { user, comments, index } = this.props;
    const comment = comments[index];
    const { loves } = comment;

    return (
      <TouchableOpacity onPress={this.onToggleLove}>
        <View style={styles.buttonContainer}>
          <Icon
            name={loves && loves[user.uid] ? 'md-heart' : 'md-heart-outline'}
            type="ionicon"
            color="#fff"
            iconStyle={{ height: normalize(20) }}
            size={normalize(20)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { user, comments, index } = this.props;
    const comment = comments[index];
    const { text, author, time, color, userId } = comment;

    return (
      <View style={[styles.container]}>
        <View
          style={[
            styles.wrapper,
            { backgroundColor: color, borderColor: color },
          ]}
        >
          <View style={[styles.comment]}>
            <Text style={[styles.text]}>{text}</Text>
            {user.uid === userId && this.renderOptionButton()}
          </View>

          <View style={styles.bottom}>
            <View style={styles.left}>
              <Text style={[styles.author]}>{author.name}</Text>
              <Text style={[styles.publishedAt]}>{moment(time).fromNow()}</Text>
            </View>
            <View style={styles.right}>{this.renderLoveButton()}</View>
          </View>
        </View>
      </View>
    );
  }
}

function mapState(state, props) {
  return {
    user: state.authReducer.user,
    comments: state.homeReducer.comments,
  };
}

export default connect(
  mapState,
  { deleteComment, toggleLove }
)(Comment);
