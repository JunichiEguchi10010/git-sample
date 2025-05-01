React useContext(Hooks) 20250501

🔎 useContext を使うべき場面
✅ グローバルなデータ管理（認証、テーマ、言語設定など）
✅ ネストが深いコンポーネント間でデータを渡したいとき
✅ Redux を使うほどではないが、状態管理をシンプルにしたいとき
✅ ルーティング情報や UI の状態を管理したいとき


コンポーネント間でデータを共有するためのReact Hooksの一つです。
通常、親コンポーネントから子コンポーネントにデータを渡す際はpropsを使いますが、
useContextを使うことで「propsのバケツリレー」を避け、よりシンプルにデータを取得できます2。


✅ useContextの基本
1. Contextの作成
jsx
import { createContext } from "react";
export const MyContext = createContext("デフォルト値");

createContext() を使ってコンテキストを作成します。
MyContext.Provider を使って値を提供できます。

2. Providerで値を渡す
jsx
import { MyContext } from "./MyContext";

function App() {
  return (
    <MyContext.Provider value="こんにちは！">
      <ChildComponent />
    </MyContext.Provider>
  );
}
Provider を使って、コンポーネントツリー内の子コンポーネントにデータを渡します。

3. useContextで値を取得
jsx
import { useContext } from "react";
import { MyContext } from "./MyContext";

function ChildComponent() {
  const value = useContext(MyContext);
  return <p>{value}</p>;
}
useContext(MyContext) を使うことで、Provider で渡された値を取得できます。

✅ useContextのメリット
propsなしでデータを取得 → props のバケツリレーを防ぐ
グローバルな状態管理が簡単 → Reduxのような複雑な状態管理を使わずに済む
コードがシンプルになる → useContext を使うことで、ネストが深いコンポーネントでも簡単にデータを取得できる

✅ useContextの注意点
コンテキストの値が変更されると、コンテキストを使用しているすべてのコンポーネントが再レンダリングされる
大規模なアプリでは、useReducer や Redux などと組み合わせるのが一般的


✅ createContext("デフォルト値") のデフォルト値には何を設定する？
1. null や undefined を使う
まだ値が決まっていない場合、null や undefined を設定することが一般的です。
例えば、ユーザー認証情報のコンテキストなら、初期状態では null にすることが多い。
jsx
export const AuthContext = createContext(null);

2. オブジェクトを設定
例えば、ユーザー情報や設定データを管理する場合、デフォルトの構造 を持つオブジェクトを設定。
jsx
export const UserContext = createContext({
  name: "",
  email: "",
  loggedIn: false
});
→ こうすると、コンテキストを使用するコンポーネントが値を undefined で扱わずに済み、予期しないエラーを防げる。

3. 関数をデフォルトに設定
関数を扱うコンテキストでは、デフォルト値として空の関数を入れておくことが一般的。
jsx
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {} // デフォルトでは何もしない関数
});
→ こうすることで、toggleTheme を誤って呼び出してもエラーにならない。

✅ どのデフォルト値を使うべきか？
使用目的	                デフォルト値の例
ユーザー情報	            { name: "", email: "", loggedIn: false }
状態管理	                { theme: "light", toggleTheme: () => {} }
認証	                    null または { user: null }
設定データ	                { language: "ja", darkMode: false }
デフォルト値は、コンテキストが Provider でラップされていないときに参照される値なので、
意図しない動作を防ぐために適切な値を設定するのがポイントです。


✅ よくある useContext の使い方
1. グローバルな状態管理
useContext は アプリ全体で共有するデータ を管理するのに適しています。
例えば、ユーザー認証情報 や テーマ設定 などをコンテキストで管理すると、どのコンポーネントからでも簡単にアクセスできます。
jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function UserProfile() {
  const { user } = useContext(AuthContext);
  return <p>ログインユーザー: {user?.name || "未ログイン"}</p>;
}
👉 ログイン情報をどのコンポーネントでも取得できる！

2. テーマの切り替え
ダークモードやライトモードの切り替えを useContext で管理すると、アプリ全体のデザインを統一できます。
jsx
const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "ダークモードに切り替え" : "ライトモードに切り替え"}
    </button>
  );
}
👉 アプリ全体のテーマを統一し、簡単に切り替え可能！

3. 言語設定（i18n）
<!-- I18N（インターナショナル化） -->
多言語対応のアプリでは、useContext を使って 現在の言語設定 を管理すると便利です。
jsx
const LanguageContext = createContext("ja");

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ja");
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="ja">日本語</option>
      <option value="en">English</option>
    </select>
  );
}
👉 アプリ全体の言語設定を簡単に変更できる！

4. ルーティング情報の管理
React Router などを使う場合、現在のページ情報を useContext で管理すると、どのコンポーネントでも簡単にアクセスできます。
jsx
const RouteContext = createContext("/home");

function RouteProvider({ children }) {
  const [route, setRoute] = useState("/home");
  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
}

function Navigation() {
  const { route, setRoute } = useContext(RouteContext);
  return (
    <nav>
      <button onClick={() => setRoute("/home")}>ホーム</button>
      <button onClick={() => setRoute("/about")}>概要</button>
      <p>現在のページ: {route}</p>
    </nav>
  );
}
👉 現在のページ情報をどのコンポーネントでも取得できる！

🔎 useContext を使うべき場面
✅ グローバルなデータ管理（認証、テーマ、言語設定など）
✅ ネストが深いコンポーネント間でデータを渡したいとき
✅ Redux を使うほどではないが、状態管理をシンプルにしたいとき
✅ ルーティング情報や UI の状態を管理したいとき