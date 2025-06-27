import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/note/:id/edit" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
