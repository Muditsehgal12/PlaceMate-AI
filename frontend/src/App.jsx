import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MockInterviewPage from "./pages/MockInterviewPage";
import PlacementTrackerPage from "./pages/PlacementTrackerPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="tracker" element={<PlacementTrackerPage />} />
        <Route path="resume-analyzer" element={<ResumeAnalyzerPage />} />
        <Route path="mock-questions" element={<MockInterviewPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
