import Home from "./pages/Home";
import Server from "./pages/Server";
import Explore from "./pages/Explore";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";
import Login from "./pages/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";
import Register from "./pages/Register";
import { MembershipProvider } from "./context/MemberContext";
import MembershipCheck from "./components/Membership/MembershipCheck";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <BrowserRouter basename="/Frontend-WebChat/">
      <AuthServiceProvider>
        <ToggleColorMode>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/server/:serverId/:channelId?"
              element={
                <ProtectedRoute>
                  <MembershipProvider>
                    <MembershipCheck>
                      <Server />
                    </MembershipCheck>
                  </MembershipProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/explore/:categoryName" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route
              path="/testlogin"
              element={
                <ProtectedRoute>
                  <TestLogin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ToggleColorMode>
      </AuthServiceProvider>
    </BrowserRouter>
  );
};

export default App;
