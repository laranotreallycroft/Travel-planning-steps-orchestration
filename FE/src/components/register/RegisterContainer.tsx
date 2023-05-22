import RegisterView from "./RegisterView";

export interface IRegisterContainerOwnProps {}

type IRegisterContainerProps = IRegisterContainerOwnProps;

const RegisterContainer: React.FC<IRegisterContainerProps> = (
  props: IRegisterContainerProps
) => {
  return <RegisterView />;
};

export default RegisterContainer;
