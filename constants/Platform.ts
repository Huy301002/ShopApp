import { Platform as RNPlatform } from "react-native";

export const Platform = {
  OS: RNPlatform.OS,
  select: RNPlatform.select,
  isIOS: RNPlatform.OS === "ios",
  isAndroid: RNPlatform.OS === "android",
  isWeb: RNPlatform.OS === "web",
  version: RNPlatform.Version,
  constants: {
    ...RNPlatform.constants,
    // Add any additional platform-specific constants here
  },
};
