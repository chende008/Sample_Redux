import React, {PureComponent} from 'react';

import {StyleSheet, View} from 'react-native';
import {Colors, CommonStyles, Const} from '../../Common/storage/Const';


export default class HomeController extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {dataList: []};
        this.pageIndex = 1;//页码
    }

    render() {
        let {dataList} = this.state;
        return <View style={[CommonStyles.container, {marginTop: INSETS.top}]}>
        </View>;
    }


}
