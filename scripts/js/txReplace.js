loadJScounter_loaded++;



//文字列正規化用配列(1→0)
const zTxReplace = [
    [
        //数字(全角→半角)
        '0', '1', '2', '3', '4',
        '5', '6', '7', '8', '9',
        //英字(半角大文字→半角小文字)
        'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z',
        //英字(全角小文字→半角小文字)
        'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z',
        //英字(全角大文字→半角小文字)	
        'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z',
        //半角カタカナ→全角ひらがな
        'あ', 'い', 'う', 'え', 'お',
        'か', 'き', 'く', 'け', 'こ',
        'が', 'ぎ', 'ぐ', 'げ', 'ご',
        'さ', 'し', 'す', 'せ', 'そ',
        'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
        'た', 'ち', 'つ', 'て', 'と',
        'だ', 'ぢ', 'づ', 'で', 'ど',
        'な', 'に', 'ぬ', 'ね', 'の',
        'は', 'ひ', 'ふ', 'へ', 'ほ',
        'ば', 'び', 'ぶ', 'べ', 'ぼ',
        'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
        'ま', 'み', 'む', 'め', 'も',
        'や', 'ゆ', 'よ',
        'ら', 'り', 'る', 'れ', 'ろ',
        'わ', 'を', 'ん', 'ヴ',
        'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
        'っ', 'ゃ', 'ゅ', 'ょ', 'ー',
        //全角カタカナ→全角ひらがな
        'あ', 'い', 'う', 'え', 'お',
        'か', 'き', 'く', 'け', 'こ',
        'が', 'ぎ', 'ぐ', 'げ', 'ご',
        'さ', 'し', 'す', 'せ', 'そ',
        'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
        'た', 'ち', 'つ', 'て', 'と',
        'だ', 'ぢ', 'づ', 'で', 'ど',
        'な', 'に', 'ぬ', 'ね', 'の',
        'は', 'ひ', 'ふ', 'へ', 'ほ',
        'ば', 'び', 'ぶ', 'べ', 'ぼ',
        'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
        'ま', 'み', 'む', 'め', 'も',
        'や', 'ゆ', 'よ',
        'ら', 'り', 'る', 'れ', 'ろ',
        'わ', 'を', 'ん', 'ヴ',
        'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
        'っ', 'ゃ', 'ゅ', 'ょ', 'ー',
        //記号
        ' ',    //全角→半角スペース
        ' '	//ダブルスペース→シングルスペース
    ],
    [
        //数字(全角→半角)
        '０', '１', '２', '３', '４',
        '５', '６', '７', '８', '９',
        //英字(半角大文字→半角小文字)	
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z',
        //英字(全角小文字→半角小文字)
        'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ',
        'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ',
        'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ',
        'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ',
        'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ',
        //英字(全角大文字→半角小文字)
        'Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ',
        'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ', 'Ｊ',
        'Ｋ', 'Ｌ', 'Ｍ', 'Ｎ', 'Ｏ',
        'Ｐ', 'Ｑ', 'Ｒ', 'Ｓ', 'Ｔ',
        'Ｕ', 'Ｖ', 'Ｗ', 'Ｘ', 'Ｙ', 'Ｚ',
        //半角カタカナ→全角ひらがな
        'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ',
        'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ',
        'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ',
        'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ',
        'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ',
        'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ',
        'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ',
        'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ',
        'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ',
        'ﾊﾞ', 'ﾋﾞ', 'ﾌﾞ', 'ﾍﾞ', 'ﾎﾞ',
        'ﾊﾟ', 'ﾋﾟ', 'ﾌﾟ', 'ﾍﾟ', 'ﾎﾟ',
        'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ',
        'ﾔ', 'ﾕ', 'ﾖ',
        'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ',
        'ﾜ', 'ｦ', 'ﾝ', 'ｳﾞ',
        'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ',
        'ｯ', 'ｬ', 'ｭ', 'ｮ', 'ｰ',
        //全角カタカナ→全角ひらがな
        'ア', 'イ', 'ウ', 'エ', 'オ',
        'カ', 'キ', 'ク', 'ケ', 'コ',
        'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
        'サ', 'シ', 'ス', 'セ', 'ソ',
        'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
        'タ', 'チ', 'ツ', 'テ', 'ト',
        'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
        'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
        'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
        'バ', 'ビ', 'ブ', 'ベ', 'ボ',
        'パ', 'ピ', 'プ', 'ペ', 'ポ',
        'マ', 'ミ', 'ム', 'メ', 'モ',
        'ヤ', 'ユ', 'ヨ',
        'ラ', 'リ', 'ル', 'レ', 'ロ',
        'ワ', 'ヲ', 'ン', 'ウ゛',
        'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
        'ッ', 'ャ', 'ュ', 'ョ', 'ー',
        //記号
        '　',    //全角→半角スペース
        '  '	//ダブルスペース→シングルスペース
    ]
];

//debug：文字列正規化用配列の正誤チェック
if (zTxReplace[0].length != zTxReplace[1].length) {
    alert("Alert! - txReplace.js内の文字配列要素数が異なります");
}



function zReplace(tx) {
    //引数：被置換文字列

    //置換
    for (let i = 0; i < zTxReplace[0].length; i++) {
        while (tx != tx.replace(zTxReplace[1][i], zTxReplace[0][i])) {
            tx = tx.replace(zTxReplace[1][i], zTxReplace[0][i]);
        }
    }

    //先頭スペース（半角）の削除
    if (tx.indexOf(" ") == 0) { tx = tx.slice(1); }
    //最後尾スペース（半角）の削除
    if (tx.indexOf(" ") == tx.length - 1) {
        tx = tx.slice(0, tx.length - 1);
    }

    return tx;
}


//厳格版（id設定等）：記号等除去
const zTxReplaceStrict = [
    " ",
    ".", "#"
];
function zReplaceStrict(tx) {
    zReplace(tx);
    for (let i = 0; i < zTxReplaceStrict.length; i++) {
        while (tx != tx.replace(zTxReplaceStrict[i], "_")) {
            tx = tx.replace(zTxReplaceStrict[i], "_");
        }
    }
    return tx;
}

