import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NoteProvider } from "./context/NoteContext";
import HomePage from "./pages/Homepage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <Provider store={store}>
      <NoteProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/note/:id" element={<NotePage />} />
              <Route path="/note/:id/edit" element={<NotePage />} />
            </Routes>
          </div>
        </Router>
      </NoteProvider>
    </Provider>
  );
}

export default App;
