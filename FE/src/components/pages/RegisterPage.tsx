import RegisterContainer from "../register/RegisterContainer";

export interface IRegisterPageOwnProps {}

type IRegisterPageProps = IRegisterPageOwnProps;

const RegisterPage: React.FC<IRegisterPageProps> = (
  props: IRegisterPageProps
) => {
  return <RegisterContainer />;
};

export default RegisterPage;
