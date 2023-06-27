import { StyleSheet } from "react-native";

import { vh, vw } from "../../../utils/dimensions";

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
  marker: {
    height: vh * 5,
    width: vh * 5,
    borderRadius: (vh * 5) / 2,
  },
  name: {
    fontSize: vh * 3,
  },
});

export default styles;
