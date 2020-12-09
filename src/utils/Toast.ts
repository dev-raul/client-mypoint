import { ToastAndroid, Alert, Platform } from "react-native";
export default function Toast(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  } else {
    Alert.alert(message);
  }
}
