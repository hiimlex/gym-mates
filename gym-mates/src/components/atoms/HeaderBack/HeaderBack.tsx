import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { AppRoutes } from "@navigation/appRoutes";
import { Colors } from "@theme";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "react-native-feather";

interface BackLeftProps {
  backTo?: keyof typeof AppRoutes;
}

const BackLeft = ({ backTo }: BackLeftProps) => {
  const { goBack, canGoBack } = useAppNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => canGoBack() && goBack()}
    >
      <ArrowLeft
        color={Colors.colors.text}
        width={24}
        height={24}
        stroke={Colors.colors.text}
      />
    </TouchableOpacity>
  );
};

export default BackLeft;
