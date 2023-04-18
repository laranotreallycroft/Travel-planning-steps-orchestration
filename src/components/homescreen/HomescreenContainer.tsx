import HomescreenView from "./HomescreenView";
export interface IBasicTravelInfoPayload {
  dateFromTo: any[];
  location: string;
}
interface IHomescreenContainerProps {}

const HomescreenContainer: React.FC<IHomescreenContainerProps> = (
  props: IHomescreenContainerProps
) => {
  const handleFinish = (values: IBasicTravelInfoPayload) => {
    console.log(values);

    console.log(values.dateFromTo[0].format("YYYY-MM-DD"));
  };
  return <HomescreenView onFinish={handleFinish} />;
};

export default HomescreenContainer;
