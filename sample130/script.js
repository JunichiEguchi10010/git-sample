// クラスの定義
class Test {
    constructor(value) {
      this.author = "山田";
      this.value = value;
      this.note = "ほげほげ";
    }
  
    hello() {
      console.log("Hello");
      return this.value;
    }
  
    static staticHello() {
      console.log("static Hello");
    }
  }
  
  // 継承クラスの定義
  class CopyTest extends Test {
    constructor(value) {
      super(value);
      this.extra = "追加プロパティ";
    }
  
    copyHello() {
      super.hello(); // 親のhelloメソッドを使う
      return this.author;
    }
  }
  
  // DOM操作で出力
  document.getElementById("run").addEventListener("click", () => {
    const output = document.getElementById("output");
  
    const instance = new CopyTest(20);
    const greeting = instance.copyHello();
  
    output.textContent = `
  クラス名：${instance.constructor.name}
  作者：${instance.author}
  値：${instance.value}
  メソッド結果（copyHello）：${greeting}
    `;
  });

  
// 項目	                内容
// クラス	         class Test クラス名
// コンストラクター	  constructor() 内で初期値セット コンストラクター
// インスタンス化	  new Test() インスタンス化
// this の使い方	 クラス内プロパティへの参照
// メソッド	          hello() のように定義・呼び出し
// 静的メソッド	      static staticHello() は Test.staticHello() で実行
// 継承	             class CopyTest extends Test
// super の使い方	 super(value) や super.hello()