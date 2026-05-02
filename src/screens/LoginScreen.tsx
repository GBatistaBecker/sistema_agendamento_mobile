import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from "react-native";
import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { salvarUsuario } from "../services/storage";
import Background from "../components/background";
import { theme } from "../styles/theme";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  // 🔥 GOOGLE LOGIN CONFIG
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "268953865825-pf1jh1lfth575cb7go0qc8f42de5o9eg.apps.googleusercontent.com",
});

  // 🔥 QUANDO LOGIN GOOGLE FUNCIONAR
  useEffect(() => {
    if (response?.type === "success") {
      // 👉 por enquanto simples (depois melhoramos)
      salvarUsuario({
        nome: "Usuário Google",
        telefone: "00000000000",
        tipo: "cliente",
      });

      navigation.replace("Home");
    }
  }, [response]);

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

    const tipo =
      nome.trim().toLowerCase() === "admin" ? "admin" : "cliente";

    await salvarUsuario({ nome, telefone, tipo });

    navigation.replace("Home");
  };

  return (
    <Background>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) =>
          setNome(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={(text) =>
          setTelefone(aplicarMascaraTelefone(text))
        }
      />

      {/* LOGIN NORMAL */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* 🔥 LOGIN COM GOOGLE */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
      <Image
        source={require("../assets/images/icons8-google-48.png")}
        style={styles.googleIcon}
      />
      <Text style={styles.googleText}>Entrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={{ color: "white" }}>
          Ainda não tem cadastro?{" "}
          <Text style={{ color: theme.colors.primary }}>
            Clique aqui
          </Text>
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

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    width: 250,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  googleText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

  googleIcon: {
    width: 20,
    height: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});