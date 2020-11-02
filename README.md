# node_express_pra

__binディレクレリ__  
binはサーバーを起動するためのwwwというファイルを格納しているディレクレリ。  
wwwはapp.jsを呼び出してサーバーを実行するためのスクリプトが記述されている  

__publicディレクレリ__  
画像やCSS、JSライブラリなどの静的ファイルを配置するためのディレクトリ。  

__routesディレクレリ__  
画面ごとの処理を記述したJSファイルを配置するためのディレクレリ。  
デフォルトでindex.jsとusers.jsが配置される。  

__viewsディレクレリ__  
画面のテンプレートファイルを配置するためのディレクレリ。  
テンプレートエンジンにEJSを指定した場合、デフォルトでindex.ejsとerror.ejsが配置される。  

__app.js__  
プログラムのメインとなるファイル。