import { Text } from 'react-native';

interface HeadingProps {
  heading: string;
}
export const Heading: React.FC<HeadingProps> = ({ heading }) => {
  return (
    <Text className="text-[30px] font-poppinsBold text-textPrimary tracking-[0.5rem] font-bold">
      {heading}
    </Text>
  );
};
export default Heading;
