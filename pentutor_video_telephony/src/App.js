

import Homepage from "./Pages/Homepage";
import StreamPage from "./Pages/videoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/:stream_id" element={<StreamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
