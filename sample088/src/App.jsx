import GreetingForm from './GreetingForm';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px'
    }}>
      <h1>Greeting App</h1>
      <GreetingForm />
    </div>
  );
}

export default App;
