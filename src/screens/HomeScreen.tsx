import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { obterUsuario, removerUsuario } from "../services/storage";
import Background from "../components/background";
import { theme } from "../styles/theme";

export default function HomeScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const carregar = async () => {
      const dados = await obterUsuario();
      if (dados) setUsuario(dados);
    };
    carregar();
  }, []);

  const handleLogout = async () => {
    await removerUsuario();
    navigation.replace("Login");
  };

  if (!usuario) return null;

  return (
    <Background>
      <Text style={styles.titulo}>Bem-vindo, {usuario.nome}!</Text>
      <Text style={styles.texto}>Telefone: {usuario.telefone}</Text>
      {usuario.email && <Text style={styles.texto}>E-mail: {usuario.email}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    marginBottom: 10,
    color: "#fff",
  },
  texto: {
    fontSize: 18,
    marginBottom: 5,
    color: "#fff",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: 200,
  },
  buttonText: {
    color: theme.colors.buttonText,
    textAlign: "center",
    fontSize: 18,
  },
});
