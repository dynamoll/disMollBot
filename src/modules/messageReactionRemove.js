/*
    -- messageReactionRemove.js --
    -- メッセージを削除したときの処理 --
*/

// -- ファイル読み込み -- //
// システム
const systemValue = require('../common/systemValue.js');
// 共通定数
const commonConst = require('../common/commonConst.js');
// ローカルデータ
// ※サーバーIDチャンネルIDトークンを各自配置
const localData = require('../common/localData.js');

// -- 定数 -- //


// -- 処理 -- //
exports.index = function(reaction, user){
    var sendMessage = `${reaction.message.guild} で ${user.tag} が ${reaction.emoji.name} をリアクションしました`;
    reaction.message.guild.channels.cache.get(localData.channelId).send(sendMessage);
};