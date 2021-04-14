import React from 'react';
import DeviceInfo from 'react-native-device-info';

export const RNStorage = {//持久化数据列表
    customerId: null,//客户ID
    accessToken: null,//OAuth2.0 accessToken
    refreshToken: null,//OAuth2.0 refreshToken
    baseUrl: null,
    str: null,//测试符串
    json: null,//测试符串
    [DeviceInfo.getBundleId()]: null,
};

export const RNData = {//临时内存数据
    LogOn: true,//展示日志
    canGoBack: false,//webView返回标记
    tokenExpiredList: [],
    hasQueryToken: null,
    userAgent: {//http请求使用
        package: DeviceInfo.getBundleId,
        os_version: DeviceInfo.getSystemVersion(),
        package_name: DeviceInfo.getBundleId(),
        app_version: DeviceInfo.getVersion(),
        device_name: DeviceInfo.getModel(),
        default_ua: DeviceInfo.getUserAgentSync,
    },
};

// 声明全局变量，方便查询变量含义
const global = {
    INSETS: undefined, // safeView insets 安全区域range
    navigation: undefined, // 栈导航器
    tabNavigator: undefined, // Tab导航器
    eventEmitter: undefined, // 事件发送器，建议直接Notify替代
};
