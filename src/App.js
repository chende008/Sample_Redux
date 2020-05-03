import React from 'react';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';

import LaunchController from './main/LaunchController';
import MainController from './main/MainController';
import StorageController from './compoments/StorageController';
import WebViewController from './compoments/others/WebViewController';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
    console.disableYellowBox = true;
    return <Provider store={store}>
        <SafeAreaProvider>
            <NavigationContainer>
                <RootSiblingParent>
                    <ScreenList/>
                </RootSiblingParent>
            </NavigationContainer>
        </SafeAreaProvider>
    </Provider>;
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
