/*
    -- messageCreate.js --
    -- メッセージを送信したときの処理 --
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
const http = require("http");
const https = require("https");

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

    // 天気APIを利用して天気を教えてくれる。
    if (message.content.match(/広島の天気は？/)) {
        var location = "Hiroshima";
        var APIKEY = "4e2f7908cd685f879abff54218c8c0cd";
        var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKEY;

        http.get(URL, (res) => {
            var body = "";
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
        var URL = "https://spla3.yuu26.com/api/regular/now";
        https.get(URL, (res) => {
            res.setEncoding("utf8");
            res.on('data', (res) => {
                var data = JSON.parse(`${res}`);
                console.log(data.results);
                const stageEmbed1 = {
                    color: 0x0099ff,
                    title: data.results[0].stages[0].name,
                    image: {
                        url: data.results[0].stages[0].image,
                    },
                    timestamp: commonConst.date.toISOString(),
                    footer: {
                        text: `Splatoon3`,
                        icon_url: 'https://i.imgur.com/AfFp7pu.png',
                    },
                };
                const stageEmbed2 = {
                    color: 0x0099ff,
                    title: data.results[0].stages[1].name,
                    image: {
                        url: data.results[0].stages[1].image,
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: `Splatoon3`,
                        icon_url: 'https://i.imgur.com/AfFp7pu.png',
                    },
                };
                var startTimeStamp = data.results[0].start_time;
                var endTimeStamp = data.results[0].end_time;
                var startTime = startTimeStamp.substring(11).slice(0, 5);
                var endTime = endTimeStamp.substring(11).slice(0, 5);
                message.channel.send(`現在のレギュラーマッチはこちら！\n(${startTime}～${endTime})`);
                message.channel.send({ embeds: [stageEmbed1] });
                message.channel.send({ embeds: [stageEmbed2] });
            });
        });
    }

    // APIテスト
    if (message.content.match(/api/)) {
        var URL = "https://pokeapi.co/api/v2/pokemon/151/";
        https.get(URL, (res) => {
            res.setEncoding("utf8");
            res.on('data', (res) => {
                var data = `${res}`;
                // var data = JSON.parse(`${res}`);
                console.log(data);
            });
        });
    }
    
    // サンプル用のEmbed
    if (message.content.match(/sampleEmbed/)) {
        var URL = "https://spla3.yuu26.com/api/regular/now";
        https.get(URL, (res) => {
            res.setEncoding("utf8");
            res.on('data', (res) => {
                var data = JSON.parse(`${res}`);
                console.log(data.results[0]);
                const exampleEmbed = {
                    color: 0x0099ff,
                    title: 'Some title',
                    url: 'https://discord.js.org',
                    author: {
                        name: 'Some name',
                        icon_url: 'https://i.imgur.com/AfFp7pu.png',
                        url: 'https://discord.js.org',
                    },
                    description: 'Some description here',
                    thumbnail: {
                        url: 'https://i.imgur.com/AfFp7pu.png',
                    },
                    fields: [
                        {
                            name: 'Regular field title',
                            value: 'Some value here',
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                            inline: false,
                        },
                        {
                            name: 'Inline field title',
                            value: 'Some value here',
                            inline: true,
                        },
                        {
                            name: 'Inline field title',
                            value: 'Some value here',
                            inline: true,
                        },
                        {
                            name: 'Inline field title',
                            value: 'Some value here',
                            inline: true,
                        },
                    ],
                    image: {
                        url: 'https://i.imgur.com/AfFp7pu.png',
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: 'Some footer text here',
                        icon_url: 'https://i.imgur.com/AfFp7pu.png',
                    },
                };
                message.channel.send({ embeds: [exampleEmbed] });
            });
        });
    }
};