import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyPage from "./pages/VerifyPage";
import Documentation from "./components/Documentation";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100">

        <Routes>
          {/* Home / Verify */}
          <Route path="/" element={<VerifyPage />} />

          {/* Documentation */}
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </div>
    </Router>
  );
}