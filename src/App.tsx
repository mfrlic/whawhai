import Router from "./components/Router";
import { _colors } from "./utils/colors";

//api https://recruitment-test.ants.house/jsonrpc2/whawhai/v1

function App() {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: _colors.primary,
      }}
    >
      <Router />
    </div>
  );
}

export default App;
