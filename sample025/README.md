React useMemoで値をキャッシュ（メモ）化し、パフォーマンスを改善する方法

useMemoを使うことで、特定の値が変わったときだけ再計算を行い、効率的なアプリケーションを構築する方法です。
特に、重い処理やもっさりした動作を感じた場合に活用すること。

言い換えるとこのフックを使って、不要な再計算を防ぎ、パフォーマンスを改善するちょっとしたチューニングを行う方法


useMemoの目的
再計算の最小化: 重い処理や頻繁に再計算される処理を効率化するために使用します。
パフォーマンス向上: 必要な場合にのみ再計算を行い、不要な再レンダリングを防ぎます。

const memoizedValue = useMemo(() => {
  return heavyFunction(input);
}, [input]);

第1引数：関数（計算内容）
第2引数：依存配列（ここにある値が変わったときだけ再計算）

上記の場合は、アロー関数をuseMemoの第一引数に取り、第二引数に状態管理している引数を取る。
第一引数：() => {return heavyFunction(input);}
第二引数：[input]


seMemoを使うべきケース
時間がかかる計算（for文などの重いロジック）

コンポーネントの再レンダリングを最小限にしたいとき

親コンポーネントのレンダリングに影響されたくないメモ化された値


useMemoの注意点
無理に使いすぎない：軽い処理に使っても効果はない

依存配列が正しくないとバグになるので注意

useMemo自体もオーバーヘッドがあるため、本当に必要なときだけ使う