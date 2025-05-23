export async function fetchUserData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) throw new Error('APIエラー');
      
      const user = await response.json();
      document.getElementById('userData').innerHTML = `名前: ${user.name}, メール: ${user.email}`;
    } catch (error) {
      document.getElementById('userData').innerHTML = 'データの取得に失敗しました';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetchButton').addEventListener('click', fetchUserData);
  });
  