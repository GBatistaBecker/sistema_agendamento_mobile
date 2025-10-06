import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";

interface Props {
  children: ReactNode;
}

export default function Background({ children }: Props) {
  return (
    <ImageBackground
      source={require("../assets/images/tela-fundo-mobile.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
