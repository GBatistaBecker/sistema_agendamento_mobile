import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { obterUsuario } from "../services/storage";
import Background from "../components/background";
import { theme } from "../styles/theme";

export default function HomeScreen({ navigation }: any) {
  useEffect(() => {
    const carregarEredirecionar = async () => {
      try {
        // 1. Tenta obter os dados do usuário
        const dados = await obterUsuario();

        if (dados) {
          // 2. Se encontrou, SUBSTITUI a tela atual pela de Serviços
          navigation.replace("Servicos");
        } else {
          // 3. Se não encontrou, manda de volta pro Login
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
        navigation.replace("Login");
      }
    };

    carregarEredirecionar();
  }, [navigation]); // Adiciona 'navigation' como dependência

  // Enquanto a verificação acontece, mostra uma tela de carregamento
  // para o usuário não ver uma tela piscando.
  return (
    <Background>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary || "#fff"} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});