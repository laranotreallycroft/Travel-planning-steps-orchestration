import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import CreateTripPage from "./pages/CreateTripPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AppLayout from "./common/layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import FallbackPage from "./pages/FallbackPage";
import HomeLayout from "./common/layout/HomeLayout";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route element={<ProtectedRoute forLoggedIn={false} />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Route>

      <Route element={<ProtectedRoute forLoggedIn={true} />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<Navigate to="tripreminders" />} />
          <Route index path="tripreminders" element={<div>aaa</div>} />
        </Route>
        <Route path="createTrip" element={<CreateTripPage />} />
      </Route>

      <Route path="*" element={<FallbackPage />} />
    </Route>
  )
);

export default appRouter;
