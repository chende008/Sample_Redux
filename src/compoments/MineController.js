import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

import {XHttp, XText, XView} from 'react-native-easy-app';
import {Colors, CommonStyles} from '../common/storage/Const';
import {RNItem} from '../common/widgets/WidgetDefault';
import {animalImageList, getCityList, moviesList, queryMemberList} from '../actions/mineAction';

/**
 * 其它接口请求，接口返回的非json数据结构（纯文本&XML数据）
 */
class MineController extends PureComponent {

    render() {
        let {content, moviesList, animalImageList, queryMemberList, getCityList} = this.props;
        return <View style={[CommonStyles.container, {marginTop: INSETS.top}]}>
            <RNItem text='简单数据：标准的json' onPress={() => moviesList()}/>
            <RNItem text='获取图片列表：标准的json' onPress={() => animalImageList()}/>
            <RNItem text='同步请求成员列表：标准的json' onPress={() => queryMemberList()}/>
            <RNItem text='省份、城市记录数量：返回 XML' onPress={() => getCityList()}/>
            <XView style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <XText text='跳转到首页' style={styles.btn} onPress={() => tabNavigator.navigate('Home')}/>
                <XText text='数据存储管理' style={styles.btn} onPress={() => navigation.push('Storage')}/>
                <XText text='打开H5页面' style={styles.btn} onPress={() => navigation.push('WebView')}/>
            </XView>
            <ScrollView>
                <XText style={{fontSize: 12, color: Colors.text_lighter, padding: 10}} text={content}/>
            </ScrollView>
        </View>;
    }


}

export default connect(state => ({content: state.mineReducer}), {moviesList, animalImageList, queryMemberList, getCityList})(MineController);

const styles = StyleSheet.create({
    btn: {
        margin: 10,
        padding: 10,
        fontSize: 14,
        borderRadius: 5,
        textAlign: 'center',
        color: Colors.white,
        backgroundColor: Colors.text_disable,
    },
});

