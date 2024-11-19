import { Route, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import LoginPage from 'components/pages/LoginPage';
import RegistrationPage from 'components/pages/RegistrationPage';
import ProtectedRoute from 'components/ProtectedRoute';
import FallbackPage from 'components/pages/FallbackPage';
import HomeLayout from 'components/pages/layout/HomeLayout';
import PackingListPage from 'components/pages/PackingListPage';
import ItineraryPage from 'components/pages/ItineraryPage';
import TripSettingsPage from 'components/pages/TripSettingsPage';
import WeatherPage from 'components/pages/WeatherPage';
import AppLayout from 'components/pages/layout/AppLayout';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AppLayout />}></Route>
      <Route element={<ProtectedRoute forLoggedIn={false} />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<RegistrationPage />} />
      </Route>

      <Route element={<ProtectedRoute forLoggedIn={true} />}>
        <Route element={<HomeLayout />}>
          <Route path="weather" element={<WeatherPage />} />
          <Route path="itinerary" element={<ItineraryPage />} />
          <Route path="packinglist" element={<PackingListPage />} />
          <Route path="settings" element={<TripSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<FallbackPage />} />
    </Route>
  )
);

export default appRouter;
