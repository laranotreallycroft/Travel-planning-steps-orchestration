import CreateTripContainer from "../createTrip/CreateTripContainer";

export interface ICreateTripPageOwnProps {}

type ICreateTripPageProps = ICreateTripPageOwnProps;

const CreateTripPage: React.FC<ICreateTripPageProps> = (
  props: ICreateTripPageProps
) => {
  return <CreateTripContainer />;
};

export default CreateTripPage;
