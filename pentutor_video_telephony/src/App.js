

import Homepage from "./Pages/Homepage";
import StreamPage from "./Pages/videoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import rootReducer from './redux/rootReducer'

import {createStore} from 'redux'

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/:stream_id" element={<StreamPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
