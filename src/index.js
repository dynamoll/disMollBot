/*
    -- index.js --
    -- デフォルト処理 --
*/

// -- ファイル読み込み -- //
// システム
const systemValue = require('./common/systemValue.js');
// 共通定数
const commonConst = require('./common/commonConst.js');
// guildMemberAddインスタンス
const guildMemberAdd = require('./modules/guildMemberAdd.js');
// messageCreateインスタンス
const messageCreate = require('./modules/messageCreate.js');
// messageDeleteインスタンス
const messageDelete = require('./modules/messageDelete.js');
// messageReactionRemoveインスタンス
const messageReactionRemove = require('./modules/messageReactionRemove.js');

// -- 定数 -- //

// -- 処理 -- //
// 起動した時にコンソールにメッセージ出力
commonConst.client.once('ready', () => {
    var sendMessage = `Ready ${commonConst.botName}`;
	console.log(sendMessage);
});

// メッセージを送信したらイベント発生
commonConst.client.on('messageCreate', async message => {
    messageCreate.index(message);
});

// メッセージを削除したらイベント発生
commonConst.client.on('messageDelete', async message => {
    messageDelete.index(message);
});

// メッセージのリアクションが外されたらイベント発生
commonConst.client.on("messageReactionRemove", async (reaction, user) => {
    messageReactionRemove.index(reaction, user);
});

// サーバーに新規メンバーが来たらイベント発生
commonConst.client.on("guildMemberAdd", member => {
    guildMemberAdd.index(message);
});

// メッセージを編集したらイベント発生
// まだ未完成
commonConst.client.on('messageUpdate', ({ oldMessage, newMessage }) => {
    console.log(newMessage);
    console.log(oldMessage);
})

commonConst.client.login(commonConst.discordBotToken);