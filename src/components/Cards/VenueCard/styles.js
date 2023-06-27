import { StyleSheet } from "react-native";

import { vh, vw } from "../../../utils/dimensions";
import { colors } from "../../../utils/theme";

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: vh * 2.4,
    color: colors.white,
  },
  container: {
    backgroundColor: colors.black,
    borderRadius: vh * 3,
    height: vh * 20,
    // width: vw * 80,
    marginVertical: vh * 2,
    marginHorizontal: vw * 4,
    padding: vh * 2,
  },
  image: {
    borderRadius: vh * 3,
  },
});

export default styles;
