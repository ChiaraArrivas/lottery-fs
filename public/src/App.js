import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children, inverse= false }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token && !inverse) {
    return <Navigate to="/" replace />;
  } else if (token && inverse) {
    return <Navigate to='/home' replace />;
  } 

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute inverse={true}>
            <Login />
          </ProtectedRoute>
        } />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
