// import React from 'react';
// import { Platform } from 'react-native';
// import {
//   createStackNavigator,
//   createBottomTabNavigator,
// } from 'react-navigation';

// import TabBarIcon from '../components/TabBarIcon';
// import ShowScreen from '../screens/ShowScreen';
// import LeaguesScreen from '../screens/LeaguesScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const ShowStack = createStackNavigator({
//   Show: ShowScreen,
// });

// ShowStack.navigationOptions = {
//   tabBarLabel: 'Show',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
//     />
//   ),
// };

// const LeaguesStack = createStackNavigator({
//   Leagues: LeaguesScreen,
// });

// LeaguesStack.navigationOptions = {
//   tabBarLabel: 'Leagues',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'}
//     />
//   ),
// };

// const ProfileStack = createStackNavigator({
//   Profile: ProfileScreen,
// });

// ProfileStack.navigationOptions = {
//   tabBarLabel: 'Profile',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
//     />
//   ),
// };

// export default createBottomTabNavigator(
//   {
//     ShowStack,
//     LeaguesStack,
//     ProfileStack,
//   },
//   {
//     tabBarOptions: {
//       showLabel: false
//     },
//   }
// );
