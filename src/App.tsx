import Router from "./components/Router";
import { _colors } from "./utils/colors";

function App() {
  return (
    <div
      style={{
        minWidth: "100vw", 
        minHeight: "100vh", //adjust background color to apply to the whole screen
        backgroundColor: _colors.primary,
      }}
    >
      <Router />
    </div>
  );
}

export default App;
