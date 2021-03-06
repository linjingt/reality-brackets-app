import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from './styles';

const colors = [
  '#B07574',
  '#F5CCB3',
  '#F3BBAB',
  '#F2ABAD',
  '#EB8685',
  '#D6545C',
  '#CB4A54',
  '#9B4354',
  '#9F5166',
  '#9F5B7D',
  '#60454A',
];

class NewComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.edit ? props.comment.text : '',
      color: props.edit ? props.comment.color : colors[0],
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
  }

  componentDidMount() {
    Actions.refresh({ showButton: false });
  }

  onChangeText(text) {
    const { color } = this.state;

    const showButton = text.trim().length > 0;

    const edit = this.props.edit; //check if in edit mode

    let data = { text, color, edit };

    if (edit) data['comment'] = this.props.comment;

    this.setState({ text });

    Actions.refresh({ showButton, data });
  }

  onSelectColor(color) {
    this.setState({ color });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TextInput
            multiline={true}
            onChangeText={this.onChangeText}
            placeholder='Enter Comment'
            style={[styles.textInput, { backgroundColor: this.state.color }]}
            value={this.state.text}
            autoFocus={true}
            placeholderTextColor='#ccc'
          />
        </View>
        <View style={styles.bottomContainer}>
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {colors.map((color, idx) => {
              return (
                <TouchableHighlight
                  key={idx}
                  underlayColor={'transparent'}
                  onPress={() => this.onSelectColor(color)}
                >
                  <View
                    style={[
                      styles.color,
                      { backgroundColor: color },
                      this.state.color === color && {
                        borderWidth: 3,
                        borderColor: 'white',
                      },
                    ]}
                  />
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

export default connect(
  null,
  {}
)(NewComment);
