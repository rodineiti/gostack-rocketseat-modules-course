import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
// import history from "./services/history"; // não funcionou, o redirect não foi
import Routes from "./routes";
import GlobalStyles from "./styles/global";
import Header from "./components/Header";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
