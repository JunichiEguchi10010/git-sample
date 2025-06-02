import { useState } from 'react';

function GreetingForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { name, age };
    const greeting = generateGreeting(userInfo);
    setMessage(greeting);
  };

  const generateGreeting = ({ name, age }) => {
    return `こんにちは、${name}さん（${age}歳）！ようこそ！`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="年齢"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">送信</button>
      <p>{message}</p>
    </form>
  );
}

export default GreetingForm;
