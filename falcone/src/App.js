import logo from "./logo.svg";
import "./App.css";
import Falcone from "./components/Falcone";

export const configEndpoint = "https://findfalcone.geektrust.com/planets";

function App() {
  return (
    <div className="App">
      <Falcone />
    </div>
  );
}

export default App;
