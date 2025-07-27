import { TRootStackParamList } from "@navigation/appRoutes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function useAppNavigation(): NativeStackNavigationProp<TRootStackParamList> {
  const navigation =
    useNavigation<NativeStackNavigationProp<TRootStackParamList>>();

  return navigation;
}
