import { OpenStreetMapProvider } from "leaflet-geosearch";
import { BoundsTuple } from "leaflet-geosearch/dist/providers/provider";
import { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITripCreatePayload } from "../../../model/trip/Trip";
import { IUserCredentials } from "../../../model/user/User";
import { TripBusinessStore } from "../../../service/business/trip/TripBusinessStore";
import { UserBusinessStore } from "../../../service/business/user/UserBusinessStore";
import TripCreateView, { ITripCreateForm } from "./TripCreateView";

export interface IGeosearchPayload {
  x: number;
  y: number;
  label: string;
  bounds: BoundsTuple | null;
  raw: { place_id: string };
}
const provider = new OpenStreetMapProvider();

export interface ITripCreateContainerOwnProps {
  onTripCreateModalClose: () => void;
  createTripModalOpen: boolean;
}

export interface ITripCreateContainerStateProps {
  currentUser: IUserCredentials;
}
export interface ITripCreateContainerDispatchProps {
  tripCreate: (tripCreatePayload: ITripCreatePayload) => void;
}
type ITripCreateContainerProps = ITripCreateContainerOwnProps &
  ITripCreateContainerStateProps &
  ITripCreateContainerDispatchProps;

const TripCreateContainer: React.FC<ITripCreateContainerProps> = (
  props: ITripCreateContainerProps
) => {
  const [locationArray, setLocationArray] = useState<IGeosearchPayload[]>();
  const navigator = useNavigate();
  const handleLocationSearch = useCallback(
    (value: string) => {
      if (value.length > 0)
        provider
          .search({ query: value })
          .then((geosearchPayloadArray: IGeosearchPayload[]) => {
            setLocationArray(geosearchPayloadArray);
          });
      else setLocationArray([]);
    },
    [provider.search]
  );

  const handleTripCreate = useCallback(
    (values: ITripCreateForm) => {
      const payload: ITripCreatePayload = {
        userId: props.currentUser.id,
        name: values.location.label,
        dateFrom: values.dateRange?.[0]?.format("YYYY-MM-DD") ?? "",
        dateTo: values.dateRange?.[1]?.format("YYYY-MM-DD") ?? "",
        location: { x: values.location.x, y: values.location.y },
      };
      props.tripCreate(payload);
      navigator("/settings");
    },
    [provider.search]
  );
  return (
    <TripCreateView
      onLocationSearch={handleLocationSearch}
      locationArray={locationArray}
      createTripModalOpen={props.createTripModalOpen}
      onTripCreate={handleTripCreate}
      onTripCreateModalClose={props.onTripCreateModalClose}
    />
  );
};

const mapStateToProps = (state: any): ITripCreateContainerStateProps => ({
  currentUser: UserBusinessStore.selectors.getCurrentUser(state),
});

const mapDispatchToProps = (
  dispatch: any
): ITripCreateContainerDispatchProps => ({
  tripCreate: (tripCreatePayload: ITripCreatePayload) =>
    dispatch(TripBusinessStore.actions.tripCreate(tripCreatePayload)),
});

export default connect<
  ITripCreateContainerStateProps,
  ITripCreateContainerDispatchProps,
  ITripCreateContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TripCreateContainer);
