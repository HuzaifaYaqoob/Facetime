

import Homepage from "./Pages/Homepage";
import StreamPage from "./Pages/videoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import rootReducer from './redux/rootReducer'

import thunk from "redux-thunk"

import { createStore, applyMiddleware } from 'redux'
import { useEffect } from "react";
import BaseURL, { user_websocket_url, wsBaseURL } from "./redux/ApiVariables";

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {

  const userWebSocket = () => {
    let user_socket = new WebSocket(wsBaseURL + user_websocket_url + '?token=42b2bd5cc061eecf20bde62c301314a42316690c')
    user_socket.onopen = (event) => {
      console.log('OPEN : ', event)
    }

    user_socket.onmessage = (event) => {
      console.log('MESSAGE : ' , event)
    }

    user_socket.onclose = (event) =>{
      console.log('CLOSE : ' , event)
    }

    user_socket.onerror = (event) =>{
      console.log('ERROR SOCKET : ' , event)
    }
  }

  useEffect(() => {
    userWebSocket()
  }, [])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/:video_chat_id" element={<StreamPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
