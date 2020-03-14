import React from 'react';
import {WebView} from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

function Routes() {
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: '#7159c1'
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#FFF'
                }}
            >
                <Stack.Screen 
                    name="Main" 
                    component={Main}
                    options={{title: 'Usuários'}}
                />
                <Stack.Screen
                    name="User"
                    component={User} 
                    options={({route}) => ({title: route.params.user.name})}
                />
                <Stack.Screen
                    name="Preview"
                    component={({route}) => <WebView style={{flex: 1}} source={{uri: route.params.url}}/>}
                >
                    {/* <Preview/> */}

                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
)}

Preview = ({route}) => {
    return <WebView style={{flex: 1}} source={{uri: route.params.url}} />
}

export default Routes;