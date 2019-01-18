// 开发环境
let devUrl={
    domain: 'http://introduce.dev.qiein.com/introduce-api/',
    apolloDomain:'https://apollo.qiein.com/',
    wxCallBack:'http://apollo.qiein.com/wechat/dsyy_order_call_back',
    websocketUrl:'wss://websocket.qiein.com/ws',
    cid: 2,
    uid: 222,
    token: '1db84ac5e8ba927788896c331d9df8ef'

}

// 测试环境
let testUrl={
    domain: 'http://127.0.0.1:8080/',
    apolloDomain:'https://apollo.qiein.com/',
    wxCallBack:'http://apollo.qiein.com/wechat/dsyy_order_call_back',
    websocketUrl:'wss://websocket.qiein.com/ws'
}

// 正式
let proUrl={
    domain: 'https://yytalk.qiein.com/dsyy-api/',
    apolloDomain:'https://apollo.qiein.com/',
    wxCallBack:'https://apollo.qiein.com/wechat/dsyy_order_call_back',
    websocketUrl:'wss://websocket.qiein.com/ws' 
}

export default devUrl