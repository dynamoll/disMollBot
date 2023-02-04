/*
    -- messageCreate.js --
    -- メッセージを送信したときの処理 --
*/

// -- ファイル読み込み -- //
// システム
const systemValue = require('../common/systemValue.js');
// 共通定数
const commonConst = require('../common/commonConst.js');

// -- 定数 -- //
const http = require("http");
const https = require("https");
const { EmbedBuilder } = require('discord.js');

// -- 処理 -- //
exports.index = function(message){
    //BOTのメッセージには反応しない
    if(message.author.bot) return;
    
    // 現在時刻を送信する。
    if(message.content === "!time") {
        message.channel.send(systemValue.currentDateTime);
    }

    // 挨拶してくれるよ
    if(message.content === "good morning") {
        var sendMessage = `おはよう！${commonConst.botName}です！`;
        message.channel.send(sendMessage);
    }

    if (message.content.match(/デデドン/)) {
        let channel = message.channel;
        let author = message.author.username;
        let reply_text = `なんだこいつぅぅう！！！！！！！！！！！！！`;
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }

    // 天気APIを利用して天気を教えてくれる。
    if (message.content.match(/広島の天気は？/)) {
        let location = "Hiroshima";
        let APIKEY = "4e2f7908cd685f879abff54218c8c0cd";
        let URL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKEY;

        http.get(URL, (res) => {
            let body = "";
            res.setEncoding("utf8");

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", (res) => {
                res = JSON.parse(body);
                console.log(res);
                message.channel.send(res.weather[0].main);
            })
        });
    }

    // splatoon3のステージ情報を教えてくれる。
    // 参考：https://spla3.yuu26.com/
    if (message.content.match(/spl/)) {
        let URL = "https://spla3.yuu26.com/api/regular/now";
        https.get(URL, (res) => {
            let body = "";
            res.setEncoding("utf8");
            res.on('data', (res) => {
                let data = JSON.parse(`${res}`);
                console.log(typeof(data));
                console.log(data.results[0]);
                
                const splEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`【現在のレギュラーマッチ】`)
                    .setThumbnail(`${data.results[0].stages[0].image}`)
                    .addFields(
                        { name: 'Regular field title', value: 'Some value here' },
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Inline field title', value: 'Some value here', inline: true },
                        { name: 'Inline field title', value: 'Some value here', inline: true },
                    )
                    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
                    .setImage(`${data.results[0].stages[0].image}`)
                    .setImage(`${data.results[0].stages[1].image}`)
                    .setTimestamp()
                    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

                message.channel.send({ embeds: [splEmbed] });


                // message.channel.send(`【現在のレギュラーマッチ】\n${data.results[0].stages[0].name}`);
                // message.channel.send(`${data.results[0].stages[0].image}`);
                // message.channel.send(`${data.results[0].stages[1].name}`);
                // message.channel.send(`${data.results[0].stages[1].image}`);
            });
        });
    }
};

function formattedDateTime(date) {
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
  
    return `${y}年${m}月${d}日 ${h} : ${mi}`;
}