import { TransportationMethodEnum } from 'model/trip/itinerary/TransportationMethodEnum';

const en: any = {
  'COMMON.FORM.SUBMIT': 'Submit',

  'NAVIGATION.INFO': 'How it works',
  'NAVIGATION.LOGIN': 'Sign in',
  'NAVIGATION.CREATE': 'Sign up',
  'NAVIGATION.LOGOUT': 'Sign out',
  'NAVIGATION.UPCOMING_TRIPS': 'Upcoming trips',
  'NAVIGATION.PAST_TRIPS': 'Past trips',

  'LOGIN.SUCCESS_MESSAGE': 'Login successful',

  'LOGIN_VIEW.FORM.EMAIL_MESSAGE': 'Please enter email',
  'LOGIN_VIEW.FORM.EMAIL_PLACEHOLDER': 'Email address',
  'LOGIN_VIEW.FORM.PASSWORD_MESSAGE': 'Please enter password',
  'LOGIN_VIEW.FORM.PASSWORD_PLACEHOLDER': 'Password',
  'LOGIN_VIEW.FORM.KEEP_SIGNED_IN': 'Keep me signed in',
  'LOGIN_VIEW.SIGN_IN': 'Sign in',
  'LOGIN_VIEW.GOOGLE_LOGIN_FAIL': 'Unable to log in with Google',
  'LOGIN_VIEW.OR': 'Or',
  'LOGIN_VIEW.SIGN_UP': "Don't have an account? Create one.",

  'USER.CREATE.SUCCESS_MESSAGE': 'Account successfully created',
  'REGISTRATION_VIEW.PASSWORD_VALIDATION.REJECT': 'Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number',
  'REGISTRATION_VIEW.PASSWORD_VALIDATION.NOT_THE_SAME': 'Make sure your passwords match.',
  'REGISTRATION_VIEW.FORM.EMAIL_MESSAGE': 'The input is not a valid e-mail.',
  'REGISTRATION_VIEW.FORM.EMAIL_PLACEHOLDER': 'Email address',
  'REGISTRATION_VIEW.FORM.PASSWORD_MESSAGE': 'Please enter password',
  'REGISTRATION_VIEW.FORM.PASSWORD_PLACEHOLDER': 'Password',
  'REGISTRATION_VIEW.FORM.CONFIRM_PASSWORD_PLACEHOLDER': 'Confirm password',
  'REGISTRATION_VIEW.SIGN_UP': 'Sign up',
  'REGISTRATION_VIEW.OR': 'Or',
  'REGISTRATION_VIEW.GOOGLE_SIGN_UP_FAIL': 'Unable to sign up with Google',
  'REGISTRATION_VIEW.LOG_IN': 'Already have an account? Sign in.',

  'TRIP_LIST_VIEW.UPCOMING.NO_DATA': 'No Upcoming Trips',
  'TRIP_LIST_VIEW.PAST.NO_DATA': 'No Past Trips',
  'TRIP_LIST_VIEW.CREATE_FIRST_TRIP_BUTTON': 'Add Your First Trip!',
  'TRIP_LIST_VIEW.CREATE_TRIP_BUTTON': 'Add a Trip',
  'TRIP_LIST_VIEW.TABLE.LABEL': 'Trip name',
  'TRIP_LIST_VIEW.TABLE.LOCATION_LABEL': 'Destination',
  'TRIP_LIST_VIEW.TABLE.DATE': 'Travel dates',

  'TRIP_CREATE_VIEW.MODAL_TITLE': 'Add Trip',
  'TRIP_CREATE_VIEW.FORM.LABEL.LABEL': 'Trip name',
  'TRIP_CREATE_VIEW.FORM.LABEL.PLACEHOLDER': 'Enter trip name',
  'TRIP_CREATE_VIEW.FORM.DATE_RANGE.LABEL': 'Travel dates',
  'TRIP_CREATE_VIEW.FORM.LOCATION.LABEL': 'Travel destination',

  'MAP_SEARCH.PLACEHOLDER': 'Select destination',
  'MAP_ELEMENT.PATH_POPUP.LABEL': 'Day %{count} of your trip',

  'TRIP_CARD.FIRST_WORD': 'Trip',
  'TRIP_CARD.SECOND_WORD': ' to',

  'TRIP_VIEW.RETURN_TO_UPCOMING': 'Return to upcoming trips',
  'TRIP_VIEW.RETURN_TO_PAST': 'Return to past trips',

  'WEATHER_VIEW.CURRENT_WEATHER': 'Current weather',
  'WEATHER_VIEW.PAST_WEATHER': 'Weather in %{year}',

  'ITINERARY_CREATE_VIEW.STEP_ONE': 'Select your stops',
  'ITINERARY_CREATE_VIEW.STEP_TWO': 'Decide your visit duration',

  [`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.CAR}`]: 'Car',
  [`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.BICYCLE}`]: 'Bicycle',
  [`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.MOUNTAIN_BICYCLE}`]: 'Mountain bicycle',
  [`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.WALKING}`]: 'Walking',
  [`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.HIKING}`]: 'Hiking',
  [`ITINERARY_STOPS_VIEW.VEHICLE_PROFILES.${TransportationMethodEnum.WHEELCHAIR}`]: 'Wheelchair',

  'ITINERARY_STOPS_VIEW.NEXT_STEP': 'Next',
  'ITINERARY_STOPS_VIEW.PREVIOUS_STEP': 'Back',
  'ITINERARY_STOPS_VIEW.ROUTE_OPTIMIZE.TRUE': 'Optimize route',
  'ITINERARY_STOPS_VIEW.ROUTE_OPTIMIZE.FALSE': 'Keep original route',
  'ITINERARY_STOPS_VIEW.TABLE.DESTINATION': 'Destination',
  'ITINERARY_STOPS_VIEW.TABLE.REMOVE_STOP': 'Remove stop',
  'ITINERARY_STOPS_VIEW.TABLE.ZOOM': 'Zoom to location',
  'ITINERARY_STOPS_VIEW.NEXT_STEP.DISBALED_TOOLTIP': 'Please select at least two stops',

  'ITINERARY_DURATION_VIEW.TABLE.DESTINATION': 'Destination',
  'ITINERARY_DURATION_VIEW.TABLE.DURATION': 'Duration (minutes)',
  'ITINERARY_DURATION_VIEW.TABLE.START': 'Starting point for the day',
};

export default en;
