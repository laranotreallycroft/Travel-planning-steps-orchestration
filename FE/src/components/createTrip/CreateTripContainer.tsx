import { BoundsTuple } from "leaflet-geosearch/dist/providers/provider";
import CreateTripView, { ITripCreateForm } from "./CreateTripView";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useCallback, useState } from "react";
import { ITripCreatePayload } from "../../model/trip/Trip";
import { IUserCredentials } from "../../model/user/User";
import { connect } from "react-redux";
import { TripBusinessStore } from "../../service/business/trip/TripBusinessStore";
import { UserBusinessStore } from "../../service/business/user/UserBusinessStore";

export interface IGeosearchPayload {
  x: number;
  y: number;
  label: string;
  bounds: BoundsTuple | null;
  raw: { place_id: string };
}
const provider = new OpenStreetMapProvider();

export interface ICreateTripContainerOwnProps {
  onCreateTripModalClose: () => void;
}

export interface ICreateTripContainerStateProps {
  currentUser: IUserCredentials;
}
export interface ICreateTripContainerDispatchProps {
  tripCreate: (tripCreatePayload: ITripCreatePayload) => void;
}
type ICreateTripContainerProps = ICreateTripContainerOwnProps &
  ICreateTripContainerStateProps &
  ICreateTripContainerDispatchProps;

const CreateTripContainer: React.FC<ICreateTripContainerProps> = (
  props: ICreateTripContainerProps
) => {
  const [locationArray, setlocationArray] = useState<IGeosearchPayload[]>();

  const handleLocationSearch = useCallback(
    (value: string) => {
      provider
        .search({ query: value })
        .then((geosearchPayloadArray: IGeosearchPayload[]) => {
          setlocationArray(geosearchPayloadArray);
        });
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
    },
    [provider.search]
  );
  return (
    <CreateTripView
      onLocationSearch={handleLocationSearch}
      locationArray={locationArray}
      onTripCreate={handleTripCreate}
      onCreateTripModalClose={props.onCreateTripModalClose}
    />
  );
};

const mapStateToProps = (state: any): ICreateTripContainerStateProps => ({
  currentUser: UserBusinessStore.selectors.getCurrentUser(state),
});

const mapDispatchToProps = (
  dispatch: any
): ICreateTripContainerDispatchProps => ({
  tripCreate: (tripCreatePayload: ITripCreatePayload) =>
    dispatch(TripBusinessStore.actions.tripCreate(tripCreatePayload)),
});

export default connect<
  ICreateTripContainerStateProps,
  ICreateTripContainerDispatchProps,
  ICreateTripContainerOwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripContainer);
