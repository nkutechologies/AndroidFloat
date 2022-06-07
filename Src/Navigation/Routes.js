import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Auth/Splash';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import Home from '../Screens/MainFlow/Home';
import MapScreen from '../Screens/MainFlow/MapScreen';
import SelectImage from '../Screens/MainFlow/SelectImage';
import Cleanliness from '../Screens/MainFlow/Cleanliness';
import FeedBackForm from '../Screens/MainFlow/FeedBackForm';
import ConsumerInter from '../Screens/MainFlow/ConsumerInter';
import Stackload from '../Screens/MainFlow/Stackload';
import Foodlist from '../Screens/MainFlow/Foodlist';

const Stack = createNativeStackNavigator();
function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}

        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
          <Stack.Screen
          name="SelectImage"
          component={SelectImage}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
        />
        <Stack.Screen
          name="Cleanliness"
          component={Cleanliness}
        />
        <Stack.Screen
          name="FeedBackForm"
          component={FeedBackForm}
        />
        <Stack.Screen
          name="ConsumerInter"
          component={ConsumerInter}
        />
        <Stack.Screen
          name="Stackload"
          component={Stackload}
        />
        <Stack.Screen
          name="Foodlist"
          component={Foodlist}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
