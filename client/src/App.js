import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import List from "./pages/list/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
