import './App.css';

function App() {
  const handleClick = () => {
      console.log("Brownie Points +1")
  }
  return (
    <div className="App">
      <h1>Welcome to PDFlex!</h1>
      <button onClick={handleClick}>Click me for brownie points</button>
    </div>
  );
}

export default App;
