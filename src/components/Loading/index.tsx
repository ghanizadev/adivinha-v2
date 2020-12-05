import { Spinner, View } from "native-base";
import React from "react";
import styles from "./styles";

const Loading = () => {
  return(
    <View style={styles.container}>
      <Spinner size={42} color={"#000"} />
    </View>
  )
}

export default Loading;