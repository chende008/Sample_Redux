import React, {PureComponent} from 'react';
import {BackHandler, Alert} from 'react-native';

import {DebugManager} from 'react-native-debug-tool';
import {showToast} from '../Common/widgets/Loading';
import {Manager} from 'react-native-root-toast';
import DeviceInfo from 'react-native-device-info';
import {Notify} from '../Common/events/Notify';
import {RFImage, RFText, RFWidget} from 'react-native-fast-app';
import {Colors} from '../Common/storage/Const';
import HomeController from './Tabs/HomeController';
import DisCoverController from './Tabs/DisCoverController';
import MineController from './Tabs/MineController';
import {Assets} from '../Common/http/Api';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HttpConfig from '../Common/http/HttpConfig';

let lastClickTime = (new Date()).valueOf();
const {Navigator, Screen} = createBottomTabNavigator();

export default class MainController extends PureComponent {

    constructor(props) {
        super(props);
        this.initConfig();
        RFWidget.initResource(Assets);
        global.tabNavigator = props.navigation;
    }

    render() {
        return <Navigator>
            <Screen name='Home'
                    options={this.tabItemOption('首页', 'home_sel.png', 'home_dis.png')}
                    component={HomeController}/>
            <Screen name='Order'
                    options={this.tabItemOption('发现', 'discover_sel.png', 'discover_dis.png')}
                    component={DisCoverController}/>
            <Screen name='Mine'
                    options={this.tabItemOption('我的', 'mine_sel.png', 'mine_dis.png')}
                    component={MineController}/>
        </Navigator>;
    }

    tabItemOption = (title, iconChecked, iconUnChecked) => {
        return {
            tabBarLabel: ({focused}) => {
                return <RFText text={title} style={{fontSize: 10, marginBottom: 3, fontWeight: focused ? 'bold' : 'normal', color: focused ? Colors.text_light : Colors.text_disable}}/>;
            },
            tabBarIcon: ({focused}) => {
                return <RFImage iconSize={24} icon={focused ? iconChecked : iconUnChecked}/>;
            },
        };
    };

    componentDidMount(): void {
        this.listener = this.backListener();
        Notify.TOKEN_EXPIRED.register(this.tokenExpired);
    }

    componentWillUnmount(): void {
        this.listener && this.listener.remove();
        Notify.TOKEN_EXPIRED.unRegister(this.tokenExpired);
    }

    initConfig = () => {
        HttpConfig.initHttpConfig();
        DebugManager.initDeviceInfo(DeviceInfo);
        DebugManager.showFloat(Manager);
    };

    backListener = () => {
        return BackHandler.addEventListener('hardwareBackPress', () => {
            const {state} = tabNavigator.dangerouslyGetState().routes[0];
            if (state && state.index !== 0) {// 若不是第一个Tab，则切换到第一个Tab
                tabNavigator.navigate('Home');
                return true;
            }
            if (navigation.canGoBack()) {// 若能返回，则不拦截
                return false;
            } else {
                let nowTime = (new Date()).valueOf();
                if (nowTime - lastClickTime < 1000) {//间隔时间小于1秒才能退出
                    BackHandler.exitApp();
                } else {
                    showToast('再按一次，退出Example');
                    lastClickTime = nowTime;
                }
                return true;
            }
        });
    };

    tokenExpired = ({message}) => { // token 过期需要处理的逻辑
        Alert.alert('Token 过期 ', message);
    };
}
