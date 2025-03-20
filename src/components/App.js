import { Header } from "./Header";

import "./App.css";

import { Footer } from "./Footer";

function App({ children }) {
  return (
    <div className="App">
      <Header />
      <div className="page">{children}</div>
      <Footer />
    </div>
  );
}

export default App;
