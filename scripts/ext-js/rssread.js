loadJScounter_loaded++;
//https://kantaro-cgi.com/program/rssread-js/manual/
//
/*
# ====================================================================
#             【 カンタローCGI：RSS読み込みJavaScript 】
# ====================================================================
*/

// テンプレート
var rssread_head = '<dl>';
var rssread_loop = '<dt>%YEAR%年%MONTH%月%DAY%日 %HOUR%:%MINUTE%:%SECOND%</dt><dd><a href="%LINK%">%TITLE%</a></dd>';
var rssread_foot = '</dl>';

// 読み込み
jQuery( function() {
	jQuery('.rssread').each(function(){
		var target = this;
		var count = jQuery(target).attr('data-count');
		var datasrc = jQuery(target).attr('data-src');
		jQuery.ajax( {
			url: jQuery(this).attr('data-src') ,
			dataType: 'xml' ,
			async: true ,
			cache: false ,
			error: function(){ alert('RSS読み込みエラーです。' + datasrc ); } ,
			success: function( xml ){
				var loop = '';
				// ATOM
				if( jQuery(xml).find('entry').length ) {
					jQuery(xml).find('entry').each(function(){
						if( count-->0 ) {
							var title = jQuery(this).find('title').text();
							var dd = ( jQuery(this).find('updated').text() || jQuery(this).find('published').text() ).split(/\D/);
							var date = new Date( dd[0], dd[1]-1, dd[2], dd[3], dd[4], dd[5] );
							var link = jQuery(this).find('link[rel=alternate]').attr('href');
							var tmp = rssread_loop;
							tmp = tmp.replace('%YEAR%',   date.getFullYear() );
							tmp = tmp.replace('%MONTH%',  date.getMonth()+1 );
							tmp = tmp.replace('%DAY%',    date.getDate() );
							tmp = tmp.replace('%HOUR%',   date.getHours() );
							tmp = tmp.replace('%MINUTE%', date.getMinutes() );
							tmp = tmp.replace('%SECOND%', date.getSeconds() );
							tmp = tmp.replace('%LINK%',   link );
							tmp = tmp.replace('%TITLE%',  title );
							loop += tmp;
						}
					});
				}
				// RSS2.0
				else if( jQuery(xml).find('item').length ) {
					jQuery(xml).find('item').each(function(){
						if( count-->0 ) {
							var title = jQuery(this).find('title').text();
							var date;
							if( jQuery(this).find('pubDate').text() ) {
								date = new Date( jQuery(this).find('pubDate').text() );
							} else if( jQuery(this).find('dc:date').text() ) {
								var dd = jQuery(this).find('dc:date').text().split(/\D/)
								date = new Date( dd[0], dd[1]-1, dd[2], dd[3], dd[4], dd[5] );
							}
							var link = jQuery(this).find('link').text();
							var tmp = rssread_loop;
							tmp = tmp.replace('%YEAR%',   date.getFullYear() );
							tmp = tmp.replace('%MONTH%',  date.getMonth()+1 );
							tmp = tmp.replace('%DAY%',    date.getDate() );
							tmp = tmp.replace('%HOUR%',   date.getHours() );
							tmp = tmp.replace('%MINUTE%', date.getMinutes() );
							tmp = tmp.replace('%SECOND%', date.getSeconds() );
							tmp = tmp.replace('%LINK%',   link );
							tmp = tmp.replace('%TITLE%',  title );
							loop += tmp;
						}
					});
				}
				// 解析不能
				else {
					alert('解析不能のRSS/ATOMが指定されました。');
				}
				// 埋め込み
				jQuery(target).append(rssread_head+loop+rssread_foot);
			}
		});
	});
});

/*
# ====================================================================
#             【 カンタローCGI：RSS読み込みJavaScript 】
# --------------------------------------------------------------------
# このプログラムソースの著作/所有はカザオキラボに帰属します。
# 無断で複製/改造/修正/公開等の著作を侵害する恐れのある行為、及びこの
# 表記の変更/削除を一切禁じます。また、当方で使用許可していないプログ
# ラムからの利用/呼び出しも硬く禁じます。
# --------------------------------------------------------------------
#                                     カザオキラボ　http://kazaoki.jp/
# ====================================================================
*/
