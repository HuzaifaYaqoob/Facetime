

import Homepage from "./Pages/Homepage";
import StreamPage from "./Pages/videoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import rootReducer from './redux/rootReducer'

import thunk from "redux-thunk" 
        
import {createStore , applyMiddleware} from 'redux'

const store = createStore(rootReducer , applyMiddleware(thunk))

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
