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

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="*" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/home" />} />
        <Route index path="home" element={<HomePage />} />
      </Route>
    </Route>
  )
);

export default appRouter;
