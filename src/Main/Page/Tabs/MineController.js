import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {RFHttp, RFText, RFView} from 'react-native-fast-app';
import {Colors, CommonStyles} from '../../Common/storage/Const';
import {RNItem} from '../../Common/widgets/WidgetDefault';
import {Api} from '../../Common/http/Api';
import {showLoading, showToast} from '../../Common/widgets/Loading';

/**
 * 其它接口请求，接口返回的非json数据结构（纯文本&XML数据）
 */
export default class MineController extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
        };
    }

    render() {
        let {content} = this.state;
        return <View style={[CommonStyles.container, {marginTop: INSETS.top}]}>
            <RNItem text='简单数据：标准的json' onPress={() => this.moviesList()}/>
            <RNItem text='获取图片列表：标准的json' onPress={() => this.animalImageList()}/>
            <RNItem text='同步请求成员列表：标准的json' onPress={() => this.queryMemberList()}/>
            <RNItem text='省份、城市记录数量：返回 XML' onPress={() => this.getCityAmount()}/>
            <RFView style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <RFText text='跳转到首页' style={styles.btn} onPress={() => tabNavigator.navigate('Home')}/>
                <RFText text='数据存储管理' style={styles.btn} onPress={() => navigation.push('Storage')}/>
                <RFText text='打开H5页面' style={styles.btn} onPress={() => navigation.push('WebView')}/>
            </RFView>
            <ScrollView>
                <RFText style={{fontSize: 12, color: Colors.text_lighter, padding: 10}} text={content}/>
            </ScrollView>
        </View>;
    }

    moviesList = () => {//返回标准的json的http请求
        RFHttp().url(Api.moviesList).formJson().get((success, json, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: JSON.stringify(json)});
            } else {
                showToast(msg);
            }
        });
    };

    animalImageList = () => {//返回标准的json的http请求
        RFHttp().url(Api.animalImageList).get((success, json, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: JSON.stringify(json)});
            } else {
                showToast(msg);
            }
        });
    };

    queryMemberList = async () => {//同步请求数据
        let {success, json, message, status} = await RFHttp().url(Api.queryMembers).loadingFunc((loading) => showLoading('请求中，请稍候...', loading)).execute('GET');

        success ? this.setState({content: JSON.stringify(json)}) : showToast(message);

        /***
         * 或者得使用标准的promise方式解析数据（异步promise）
         *
         * RFHttp().url(Api.queryMembers).execute('GET').then(({success, json, message, status}) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: JSON.stringify(json)});
            } else {
                showToast(message);
            }
        }).catch(({message}) => {
            showToast(message);
        })
         */

    };

    getCityAmount = () => {//查询各城市Mobile服务数量
        RFHttp().url(Api.queryCitiesAmount)
            .contentType('text/xml; charset=utf-8')
            .loadingFunc((loading) => showLoading('请求中，请稍候...', loading))
            .pureText().get((success, data, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: data});
            } else {
                showToast(msg);
            }
        });
    };

}

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

