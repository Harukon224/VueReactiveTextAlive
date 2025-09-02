# VueReactiveTextAlive
[TextAlive App API](https://github.com/TextAliveJp/textalive-app-api#readme)で提供されている型をVue.js向けに拡張したクラスライブラリです。<br>
## class
### PlayerVM
Player型インスタンスをModelとして持った、リアクティブプロパティ実装クラス
#### 使用例
```javascript
const playerVM = new PlayerVM({
    app: {
        token: '-'    // 取得したアプリトークン
    }
})
```
## 使い方
1. パッケージのインストール<br>
```
npm install vue-reactive-textalive
```
2. 使用する型のインポート<br>
```javascript
import { PlayerVM } from 'vue-reactive-textalive'
```
