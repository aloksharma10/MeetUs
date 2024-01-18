interface NavigationItemProps {
  id: string;
  name: string;
  imgURL: string;
}
const NavigationItem = ({ id, name, imgURL }: NavigationItemProps) => {
  return <>{id}</>;
};

export default NavigationItem;
