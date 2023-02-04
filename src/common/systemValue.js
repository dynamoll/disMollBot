/*
    -- systemValue.js --
    -- システム日付取得 --
*/

// -- ファイル読み込み -- //
// 共通定数
const commonConst = require('./commonConst.js');

// システム日付(y年m月d日 h:mi)
exports.currentDateTime = formattedDateTime(commonConst.date);

function formattedDateTime(date) {
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
  
    return `${y}年${m}月${d}日 ${h} : ${mi}`;
}