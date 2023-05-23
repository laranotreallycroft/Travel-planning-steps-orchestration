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

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Navigate to="/home" />} />
      <Route index path="home" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Route>
  )
);

export default appRouter;
