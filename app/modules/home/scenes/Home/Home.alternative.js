// import React from 'react';

// var { View, StyleSheet, Alert, TouchableOpacity, Text, Image, ScrollView} = require('react-native');

// import { Button } from 'react-native-elements';
// import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';

// import styles from './styles';

// import { actions as auth, theme } from '../../../auth/index';

// const { signOut } = auth;

// const { color } = theme;

// class Home extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   onSignOut = () => {
//     this.props
//       .signOut()
//       .then(() => Actions.reset('Auth'))
//       .catch(error => {
//         Alert.alert('Oops!', error.message);
//       });
//   };

//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <ScrollView style={styles.container}>
//         <Button
//           raised
//           borderRadius={4}
//           title={'LOG OUT'}
//           containerViewStyle={[styles.containerView]}
//           buttonStyle={[styles.button]}
//           textStyle={styles.buttonText}
//           onPress={this.onSignOut}
//         />

//         <Text style={[styles.headers, { marginTop: 25 }]}>ONGOING SHOWS</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={Actions.Main()}
//         >
//           <Image source={require('../../../../assets/images/the-bachelor-header.png')} />
//         </TouchableOpacity>

//         <Text style={[styles.headers, { marginTop: 50 }]}>UPCOMING SHOWS</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigate('Main')}
//         >
//           <Image source={require('../../../../assets/images/agt-header.png')} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigate('Main')}
//         >
//           <Image
//             source={require('../../../../assets/images/project-runway-header.png')}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigate('Main')}
//         >
//           <Image source={require('../../../../assets/images/drag-race-header.png')} />
//         </TouchableOpacity>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
//   button: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   headers: {
//     textAlign: 'center',
//     fontSize: 20,
//     lineHeight: 40,
//     fontWeight: 'bold',
//     color: 'rgba(2, 1, 5, 1)',
//   },
// });


// // export default connect(
// //   null,
// //   { signOut }
// // )(Home);

// // import React from 'react';
// // import {
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   Image,
// //   TouchableOpacity,
// // } from 'react-native';

// // export default class ShowsLoadingScreen extends React.Component {
// //   static navigationOptions = {
// //     title: 'REALITY BRACKETS',
// //   };

// //   render() {
// //     const { navigate } = this.props.navigation;
// //     return (
// //       <ScrollView style={styles.container}>
// //         <Text style={[styles.headers, {marginTop: 25}]}>ONGOING SHOWS</Text>
// //         <TouchableOpacity
// //           style={styles.button}
// //           onPress={() => navigate('Main')}
// //         >
// //           <Image source={require('../assets/images/the-bachelor-header.png')} />
// //         </TouchableOpacity>

// //         <Text style={[styles.headers, {marginTop: 50}]}>UPCOMING SHOWS</Text>
// //         <TouchableOpacity
// //           style={styles.button}
// //           onPress={() => navigate('Main')}
// //         >
// //           <Image source={require('../assets/images/agt-header.png')} />
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={styles.button}
// //           onPress={() => navigate('Main')}
// //         >
// //           <Image
// //             source={require('../assets/images/project-runway-header.png')}
// //           />
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={styles.button}
// //           onPress={() => navigate('Main')}
// //         >
// //           <Image source={require('../assets/images/drag-race-header.png')} />
// //         </TouchableOpacity>
// //       </ScrollView>
// //     );
// //   }
// // }

