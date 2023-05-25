import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AppLayout from "./common/layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import FallbackPage from "./pages/FallbackPage";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route element={<ProtectedRoute forLoggedIn={false} />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Route>

      <Route element={<ProtectedRoute forLoggedIn={true} />}>
        <Route index element={<Navigate to="/home" />} />
        <Route index path="home" element={<HomePage />} />
      </Route>

      <Route path="*" element={<FallbackPage />} />
    </Route>
  )
);

export default appRouter;
