import React from 'react';
import {RFHttpConfig} from 'react-native-fast-app';
import {DebugManager} from 'react-native-debug-tool';
import {Notify} from '../events/Notify';

/**
 * RN Http请求 库设置类
 */
export default class HttpConfig {

    static initHttpConfig() {
        RFHttpConfig().initHttpLogOn(true)
            .initParseDataFunc((result, request, callback) => {
                let {success, json, message, status, response} = result;
                DebugManager.appendHttpLogs(request, response);
                if (status === 503) {// token 过期
                    Notify.TOKEN_EXPIRED.sendEvent({message});
                } else {
                    callback(success, json, message, status, response);
                }
            });
    }

}
