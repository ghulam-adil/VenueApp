import { StyleSheet } from "react-native";

import { vh, vw } from "../../../utils/dimensions";

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: vh * 2.4,
  },
  container: {
    backgroundColor: "orange",
    height: vh * 20,
    width: vw * 80,
    marginVertical: vh * 2,
    marginHorizontal: vw * 4,
    borderRadius: vh * 2,
    padding: vh * 2,
  },
});

export default styles;
