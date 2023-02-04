/*
    -- messageDelete.js --
    -- メッセージを削除したときの処理 --
*/

// -- ファイル読み込み -- //
// システム
const systemValue = require('../common/systemValue.js');
// 共通定数
const commonConst = require('../common/commonConst.js');

// -- 定数 -- //


// -- 処理 -- //
exports.index = function(message){
    // メッセージが送信された場所がサーバーでなければ処理しない。
    if (!message.guild) return
    var sendMessage = `おやっ？だれかがメッセージを削除したようです。`;
    message.channel.send(sendMessage);
};