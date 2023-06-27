import { StyleSheet } from "react-native";

import { vw } from "../../../utils/dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContainer: {
    width: vw * 100,
    bottom: 0,
    position: "absolute",
  },
});

export default styles;
