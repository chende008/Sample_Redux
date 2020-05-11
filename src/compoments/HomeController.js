import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {addRandom, delRandom} from '../actions/homeAction';
import {Colors, CommonStyles} from '../common/storage/Const';
import {XText} from 'react-native-easy-app';

class HomeController extends PureComponent {

    render() {
        let {randomList, addRandom, delRandom} = this.props;
        return <View style={[CommonStyles.container, {marginTop: INSETS.top}]}>
            <XText text={'条目数量：' + randomList.length} style={{fontSize: 13, fontWeight: 'bold', color: Colors.yellow, paddingLeft: 15, paddingTop: 15}}/>
            <XText text='添加随机数' style={styles.btn} onPress={() => addRandom(this.generateRandom())}/>
            <ScrollView>{
                randomList && randomList.map((item, index) => {
                    return <XText key={index}
                                  text={'随机数：' + item}
                                  iconPosition='right'
                                  iconSize={16}
                                  textExtend={true}
                                  icon='close'
                                  style={styles.itemText}
                                  onPress={() => delRandom(randomList, index)}/>;
                })}
            </ScrollView>
        </View>;
    }

    generateRandom = () => {
        return Math.round(Math.random() * 1000000);
    };

}

export default connect(state => ({randomList: state.homeReducer}), {addRandom, delRandom})(HomeController);

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
    itemText: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomColor: Colors.split_line,
        borderBottomWidth: 0.3,
    },
});
