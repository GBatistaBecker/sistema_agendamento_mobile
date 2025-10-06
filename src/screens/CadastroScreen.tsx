import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { salvarUsuario } from "../services/storage";
import Background from "../components/background";
import { theme } from "../styles/theme";

export default function CadastroScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

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

  const handleCadastro = async () => {
    if (nome.trim() === "") {
      Alert.alert("Erro", "O campo Nome é obrigatório.");
      return;
    }

    const telNumeros = telefone.replace(/\D/g, "");
    if (telNumeros.length < 10 || telNumeros.length > 11) {
      Alert.alert("Erro", "Telefone inválido. Informe 10 ou 11 dígitos.");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      Alert.alert("Erro", "E-mail inválido.");
      return;
    }

    await salvarUsuario({ nome, telefone, email });
    Alert.alert("Sucesso", "Cadastro realizado!");
    navigation.replace("Home");
  };

  return (
    <Background>
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
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "white"}}>
          Já possui uma conta?{" "}
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
