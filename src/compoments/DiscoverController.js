import React, {PureComponent} from 'react';

import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

import {XImage, XFlatList, XText, XView} from 'react-native-easy-app';
import {Colors, CommonStyles, Const} from '../common/storage/Const';
import {queryDataList} from '../actions/discoverAction';

const headerText = '分页列表支持：无网络，加载中，无数据，加载错误，加载更多等一系列状态展示';

class DiscoverController extends PureComponent {

    render() {
        return <View style={[CommonStyles.container, {marginTop: INSETS.top}]}>
            <XFlatList data={this.props.dataList}
                       onRefresh={() => this.queryData(true)}
                       onLoadMore={() => this.queryData(false)}
                       refreshStatus={{RefreshingData: {text: '刷新中，请稍候...'}}}
                       ListHeaderComponent={() => <XText style={styles.header} text={headerText}/>}
                       ref={refreshList => this.refreshList = refreshList}
                       renderItem={({item, index}) => this.renderItem(item, index)}/>
        </View>;
    }

    renderItem = (item, index) => {
        let {title, image_url, type, score, synopsis, members} = item;
        return <XView key={index} style={styles.itemParent}>
            <XImage style={{width: 120, height: 120, margin: 5}} resizeMode='contain' icon={image_url}/>
            <XView style={{flex: 1}}>
                <XText style={{fontSize: 14, fontWeight: 'bold', color: Colors.text, paddingRight: 5}} text={'名称：' + title}/>
                <XText style={styles.itemDesc} numberOfLines={4} text={synopsis}/>
                <XText style={{fontSize: 12, color: Colors.text}} text={'评分：' + score + '    参与人数：' + members}/>
            </XView>
        </XView>;
    };

    componentDidMount() {
        this.queryData(true);
    }

    queryData = (isPullDown) => {
        let {dataList, pageIndex, queryDataList} = this.props;
        this.refreshList && queryDataList(isPullDown, pageIndex, this.refreshList, dataList);
    };

}

export default connect(state => ({...state.discoverReducer}), {queryDataList})(DiscoverController);

const styles = StyleSheet.create({
    header: {
        padding: 10,
        fontSize: 12,
        lineHeight: 16,
        color: Colors.red,
    },
    itemParent: {
        marginTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: Const.onePixel,
        borderBottomColor: Colors.split_line,
    },
    itemDesc: {
        flex: 1,
        fontSize: 12,
        lineHeight: 16,
        paddingRight: 8,
        paddingVertical: 5,
        color: Colors.text_lighter,
    },
});
