import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';

import LaunchController from './Main/Welcome/LaunchController';
import MainController from './Main/Page/MainController';
import StorageController from './Main/Page/Others/StorageController';
import WebViewController from './Main/Page/Others/WebViewController';

export default function App() {
    console.disableYellowBox = true;
    return <SafeAreaProvider>
        <NavigationContainer>
            <RootSiblingParent>
                <ScreenList/>
            </RootSiblingParent>
        </NavigationContainer>
    </SafeAreaProvider>;
}

function ScreenList() {
    global.INSETS = useSafeArea();
    const {Navigator, Screen} = createStackNavigator();
    return <Navigator initialPage={LaunchController} headerMode='none'>
        <Screen name='Launch' component={LaunchController}/>
        <Screen name='Main' component={MainController}/>
        <Screen name='Storage' component={StorageController}/>
        <Screen name='WebView' component={WebViewController}/>
    </Navigator>;
}
