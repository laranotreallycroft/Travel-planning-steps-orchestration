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
import HomeLayout from "./layout/HomeLayout";
import TripSettingsPage from "./pages/TripSettingsPage";
import TripPackingListPage from "./pages/TripPackingListPage";
import TripWeatherPage from "./pages/TripWeatherPage";
import TripSightseeingPage from "./pages/TripSightseeingPage";

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
          <Route path="packinglist" element={<TripPackingListPage />} />
          <Route path="weather" element={<TripWeatherPage />} />
          <Route path="sightseeing" element={<TripSightseeingPage />} />
          <Route path="settings" element={<TripSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<FallbackPage />} />
    </Route>
  )
);

export default appRouter;
