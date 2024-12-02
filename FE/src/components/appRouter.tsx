import FallbackPage from 'components/pages/FallbackPage';
import ItineraryPage from 'components/pages/ItineraryPage';
import AppLayout from 'components/pages/layout/AppLayout';
import LoginPage from 'components/pages/LoginPage';
import PackingListPage from 'components/pages/PackingListPage';
import PastTripsPage from 'components/pages/PastTripsPage';
import RegistrationPage from 'components/pages/RegistrationPage';
import TripPage from 'components/pages/TripPage';
import TripSettingsPage from 'components/pages/TripSettingsPage';
import UpcomingTripListPage from 'components/pages/UpcomingTripListPage';
import WeatherPage from 'components/pages/WeatherPage';
import ProtectedRoute from 'components/ProtectedRoute';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoute forLoggedIn={false} />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<RegistrationPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute forLoggedIn={false} />}>
          <Route path="/" element={<div>placeholder</div>} />
        </Route>
        <Route element={<ProtectedRoute forLoggedIn={true} />}>
          {/* The other routes */}
          <Route path="trips">
            <Route path="upcoming" element={<UpcomingTripListPage />} />
            <Route path="past" element={<PastTripsPage />} />
            <Route path=":tripId" element={<TripPage />}>
              <Route path="weather" element={<WeatherPage />} />
              <Route path="itinerary" element={<ItineraryPage />} />
              <Route path="packinglist" element={<PackingListPage />} />
              <Route path="settings" element={<TripSettingsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<FallbackPage />} />
      </Route>
    </Route>
  )
);

export default appRouter;
