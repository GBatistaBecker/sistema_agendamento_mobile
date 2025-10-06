import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { salvarUsuario } from "../services/storage";
import Background from "../components/background";
import { theme } from "../styles/theme";

export default function LoginScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const aplicarMascaraTelefone = (valor: string) => {
    let numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length > 10) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numeros.length > 6) {
      return numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (numeros.length > 2) {
      return numeros.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      return numeros.replace(/(\d*)/, "($1");
    }
  };

  const handleLogin = async () => {
    if (nome.trim() === "") {
      Alert.alert("Erro", "O campo Nome é obrigatório.");
      return;
    }

    const telNumeros = telefone.replace(/\D/g, "");
    if (telNumeros.length < 10 || telNumeros.length > 11) {
      Alert.alert("Erro", "Telefone inválido. Informe 10 ou 11 dígitos.");
      return;
    }

    await salvarUsuario({ nome, telefone });
    navigation.replace("Home");
  };

  return (
    <Background>
      <Image
        source={require("../assets/images/tela-fundo-mobile.png")}
        style={{ display: "none" }}
      />
      <Image
        source={require("../assets/images/tela-fundo-mobile.png")}
        style={{ display: "none" }}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={(text) => setTelefone(aplicarMascaraTelefone(text))}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={{ color: "white"}}>
          Ainda não tem cadastro?{" "}
          <Text style={{ color: theme.colors.primary }}>Clique aqui</Text>
        </Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: 250,
    marginVertical: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.button,
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    width: 250,
  },
  buttonText: {
    color: theme.colors.buttonText,
    textAlign: "center",
    fontSize: 18,
  },
  link: {
    marginTop: 15,
    color: "#333",
  },
});
