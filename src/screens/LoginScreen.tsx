import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { salvarUsuario } from "../services/storage";
import Background from "../components/background";
import { theme } from "../styles/theme";
import { API } from "../constantes/API";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN GOOGLE
  const [request, response, promptAsync] =
    Google.useAuthRequest({
      clientId:
        "268953865825-pf1jh1lfth575cb7go0qc8f42de5o9eg.apps.googleusercontent.com",
    });

  useEffect(() => {
    if (response?.type === "success") {
      salvarUsuario({
        nome: "Usuário Google",
        email: "google@email.com",
        tipo: "cliente",
      });

      navigation.replace("Home");
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert(
        "Erro",
        "Preencha email e senha."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/login`, {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams({
            emailUsuario: email,
            senhaUsuario: senha,
          }).toString(),
        }
      );

      const text = await response.text();

      console.log(text);

      if (!response.ok) {
        Alert.alert("Erro", text);
        return;
      }

      await salvarUsuario({
        email,
        tipo: "cliente",
      });

      navigation.replace("Home");

    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Image
          source={require("../assets/images/icons8-google-48.png")}
          style={styles.googleIcon}
        />

        <Text style={styles.googleText}>
          Entrar com Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Cadastro")
        }
      >
        <Text style={{ color: "white" }}>
          Ainda não tem cadastro?{" "}
          <Text
            style={{ color: theme.colors.primary }}
          >
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