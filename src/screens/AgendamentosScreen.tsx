import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { obterAgendamentos, removerAgendamento } from "../services/agendamentos";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AgendamentosScreen() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const navigation: any = useNavigation();

  const carregar = async () => {
    const dados = await obterAgendamentos();
    setAgendamentos(dados);
  };

  useEffect(() => {
    carregar();
  }, []);

  // ✅ CONFIRMAÇÃO ANTES DE CANCELAR
  const confirmarCancelamento = (id: string) => {
    Alert.alert(
      "Cancelar agendamento",
      "Tem certeza que deseja cancelar?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: async () => {
            await removerAgendamento(id);
            carregar();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.servico}</Text>
      <Text style={styles.text}>
        {item.data} - {item.hora}
      </Text>

      <TouchableOpacity
        style={styles.cancelar}
        onPress={() => confirmarCancelamento(item.id)}
      >
        <Text style={styles.cancelarText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ Imagem de fundo */}
      <Image
        source={require("../assets/images/pitbull-fundo-sem-cachorro.png")}
        style={styles.backgroundImage}
      />

      {/* ✅ Overlay corrigido */}
      <View style={styles.overlay} />

      {/* ✅ Botão voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* ✅ Lista */}
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 120 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum agendamento</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  backgroundImage: {
    position: "absolute",
    width: "115%",
    height: "105%",
    resizeMode: "cover",
  },
  
  overlay: {
    position: "absolute",
    width: "115%",
    height: "105%",
    backgroundColor: "rgba(0,0,0,0.3)", // 👈 faltava isso
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },

  card: {
    backgroundColor: "#ffffffcc",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },

  text: {
    color: "#333",
  },

  cancelar: {
    marginTop: 10,
    backgroundColor: "#c62828",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  cancelarText: {
    color: "#fff",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: 120,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});