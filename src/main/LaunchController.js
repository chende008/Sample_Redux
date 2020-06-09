import React, {PureComponent} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {XStorage} from 'react-native-easy-app';
import {RNStorage} from '../common/storage/AppStorage';
import XLog from '../common/utils/XLog';

export default class LaunchController extends PureComponent {

    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        XStorage.initStorage(RNStorage, AsyncStorage, () => {
            global.navigation = this.props.navigation;
            navigation.replace('Main');
        }, this.printLog);
    };

    printLog = (data) => {
        data.map(([keyStr, value]) => {
            let [, key] = keyStr.split('#');
            XLog.log('持久化数据变更:', key, '<###>', value);
        });
    };

    render() {
        return null;
    }

}

