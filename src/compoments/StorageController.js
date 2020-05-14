import React, {PureComponent} from 'react';
import {Clipboard, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors, CommonStyles} from '../common/storage/Const';
import {toStr} from '../common/utils/Utils';
import {dateFormat} from '../common/utils/DateUtils';
import {RNStorage} from '../common/storage/AppStorage';
import {XText, XView} from 'react-native-easy-app';
import {NavigationBar} from '../common/widgets/WidgetNavigation';
import {RNItem, RNLine} from '../common/widgets/WidgetDefault';
import DeviceInfo from 'react-native-device-info';
import {showToast} from '../common/widgets/Loading';
import {getJson, getStr, raiseCount} from '../actions/storeAction';

const person = {age: 25, name: 'Tom', gender: 'male', time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm')};

class StorageController extends PureComponent {

    render() {
        let {text, dataChangedCount, getStr, getJson, raiseCount} = this.props;
        return <SafeAreaView style={CommonStyles.container}>
            <NavigationBar title='数据存储'/>
            <XView>
                <XView style={{flexDirection: 'row'}}>
                    <RNItem text='设置字符串' style={{flex: 1}} onPress={() => RNStorage.str = 'this is a string '}/>
                    <RNItem text='获取字符串' style={{flex: 1}} onPress={() => getStr(RNStorage.str)}/>
                </XView>
                <XView style={{flexDirection: 'row'}}>
                    <RNItem text='设置Json' style={{flex: 1}} onPress={() => RNStorage.json = person}/>
                    <RNItem text='获取Json' style={{flex: 1}} onPress={() => getJson()}/>
                </XView>
                <RNItem text='随机字符串' onPress={() => {
                    RNStorage[DeviceInfo.getBundleId()] = '随机数据value：' + new Date().valueOf();
                    raiseCount(dataChangedCount);
                }}/>
            </XView>
            <ScrollView>{
                Object.keys(RNStorage).map((key) => <XView style={{backgroundColor: Colors.split_line, marginBottom: 1, padding: 10}}>
                    <XText style={{fontSize: 15, color: Colors.text, fontWeight: 'bold'}} text={key + '-> '}/>
                    {RNStorage[key] && <XText style={{fontSize: 13, color: Colors.text_light, marginTop: 10}} text={toStr(RNStorage[key])} onPress={() => {
                        Clipboard.setString(toStr(RNStorage[key]));
                        showToast('已复制【' + toStr(RNStorage[key]) + '】到粘贴板');
                    }}/>}
                </XView>)}
            </ScrollView>
            <RNLine/>
            <XText style={styles.text} text={'文本内容：' + text}/>
        </SafeAreaView>;
    }
}

export default connect(state => ({...state.storeReducer}), {getStr, getJson, raiseCount})(StorageController);

const styles = StyleSheet.create({
    text: {
        padding: 10,
        fontSize: 14,
        color: Colors.red,
    },
});
