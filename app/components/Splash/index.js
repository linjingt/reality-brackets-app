import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image style={styles.image} source={require('../../assets/images/tvemoji.png')} />
          <Text style={styles.title}>Reality Brackets</Text>
        </View>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} />
        </View>
      </View>
    );
  }
}
