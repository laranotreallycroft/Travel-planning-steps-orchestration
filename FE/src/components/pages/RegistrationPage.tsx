import RegistrationContainer from "components/registration/RegistrationContainer";

export interface IRegistrationPageOwnProps {}

type IRegistrationPageProps = IRegistrationPageOwnProps;

const RegistrationPage: React.FC<IRegistrationPageProps> = (
  props: IRegistrationPageProps
) => {
  return <RegistrationContainer />;
};

export default RegistrationPage;
