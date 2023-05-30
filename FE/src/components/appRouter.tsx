import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./ProtectedRoute";
import FallbackPage from "./pages/FallbackPage";
import HomeLayout from "./pages/layout/HomeLayout";
import PackingListPage from "./pages/PackingListPage";
import SightseeingPage from "./pages/SightseeingPage";
import TripSettingsPage from "./pages/TripSettingsPage";
import WeatherPage from "./pages/WeatherPage";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoute forLoggedIn={false} />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Route>

      <Route element={<ProtectedRoute forLoggedIn={true} />}>
        <Route element={<HomeLayout />}>
          <Route
            path="/"
            element={<Navigate to="/packinglist" replace={true} />}
          />
          <Route path="packinglist" element={<PackingListPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="sightseeing" element={<SightseeingPage />} />
          <Route path="settings" element={<TripSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<FallbackPage />} />
    </Route>
  )
);

export default appRouter;
