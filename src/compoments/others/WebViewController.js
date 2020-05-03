import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import WebUtils from '../../common/utils/WebUtils';
import {Notify} from '../../common/events/Notify';
import {NavigationBar} from '../../common/widgets/WidgetNavigation';
import ProgressBar from '../../common/widgets/ProgressBar';
import WebView from 'react-native-webview';
import {CommonStyles} from '../../common/storage/Const';
import {DebugManager} from 'react-native-debug-tool';

export default class WebViewController extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            loading: true,
            canGoBack: false,
            url: 'https://www.baidu.com',
        };
    }

    render() {
        let {title, loading, url, canGoBack} = this.state;
        return <SafeAreaView style={CommonStyles.container}>
            <NavigationBar title={title} onBack={() => canGoBack ? this.webView.goBack() : navigation.goBack()}/>
            <View style={{flex: 1}}>
                <WebView source={{uri: url}}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                         injectedJavaScript={WebUtils.initInjectJs()}
                         ref={webView => (this.webView = webView)}
                         onMessage={({nativeEvent}) => {
                             let postMsgData = JSON.parse(nativeEvent.data);
                             if (postMsgData.hasOwnProperty('TitleEvent')) {
                                 this.setState({...nativeEvent, ...postMsgData});
                             } else {
                                 WebUtils.msgFromH5(postMsgData, this.webView);
                             }
                         }}
                         onNavigationStateChange={params => {
                             let {url, ...other} = params;
                             this.setState({...other});
                             DebugManager.appendWebViewLogs(url);
                         }}
                         onLoadProgress={({nativeEvent}) => {
                             if (nativeEvent.progress < 1) {
                                 this.progressBar && this.progressBar.showAnimal();
                             } else {
                                 this.progressBar && this.progressBar.markToFinished();
                             }
                         }}
                />
                <ProgressBar loading={loading} style={{position: 'absolute', top: 0}} ref={progressBar => (this.progressBar = progressBar)}/>
            </View>
        </SafeAreaView>;
    }

    componentDidMount() {
        this.progressBar && this.progressBar.showAnimal();
        Notify.H5_RELOAD_URL.register(this.reloadPage);
    }

    componentWillUnmount() {
        Notify.H5_RELOAD_URL.unRegister(this.reloadPage);
    }

    reloadPage = ({pageName, url}) => {
        if ('WebViewController'.equals(pageName) && url) {
            this.setState({url});
        }
    };
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
