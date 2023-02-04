/*
    -- guildMemberAdd.js --
    -- メッセージを削除したときの処理 --
*/

// -- ファイル読み込み -- //
// システム
const systemValue = require('../common/systemValue.js');
// 共通定数
const commonConst = require('../common/commonConst.js');

// -- 定数 -- //


// -- 処理 -- //
exports.index = function(member){
    // 指定のサーバー以外では動作しないようにする
    if (member.guild.id !== commonConst.serverId) return;
    var sendMessage = `${member.user}が参加しました！`;
    member.guild.channels.cache.get(commonConst.channelId).send(sendMessage);
};