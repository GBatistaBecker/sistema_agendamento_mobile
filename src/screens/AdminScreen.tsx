import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { obterAgendamentos, atualizarStatus } from "../services/agendamentos";
import { useNavigation } from "@react-navigation/native";
import { removerUsuario } from "../services/storage";
import { theme } from "../styles/theme";

export default function AdminScreen() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const navigation: any = useNavigation();

  const carregar = async () => {
    const dados = await obterAgendamentos();
    setAgendamentos(dados);
  };

  useEffect(() => {
    carregar();
  }, []);

  const confirmar = (id: string) => {
    Alert.alert("Confirmar", "Confirmar agendamento?", [
      { text: "Não" },
      {
        text: "Sim",
        onPress: async () => {
          await atualizarStatus(id, "confirmado");
          carregar();
        },
      },
    ]);
  };

  const cancelar = (id: string) => {
    Alert.alert("Cancelar", "Cancelar agendamento?", [
      { text: "Não" },
      {
        text: "Sim",
        onPress: async () => {
          await atualizarStatus(id, "cancelado");
          carregar();
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => {
  const statusFormatado =
    item.status === "pendente"
      ? "Pendente"
      : item.status === "confirmado"
      ? "Confirmado"
      : "Cancelado";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            item.status === "confirmado"
              ? "#d4edda"
              : item.status === "cancelado"
              ? "#f8d7da"
              : "#ffffffcc",
        },
      ]}
    >
      <View style={styles.row}>
        {/* 🔹 ESQUERDA (INFO) */}
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>
            {item.clienteNome || "Cliente não identificado"}
          </Text>

          <Text style={styles.telefone}>
            {item.clienteTelefone || "Sem telefone"}
          </Text>

          <Text style={styles.servico}>{item.servico}</Text>

          <Text style={styles.data}>
            {item.data} - {item.hora}
          </Text>

          <Text style={styles.status}>
            Status: {statusFormatado}
          </Text>
        </View>

        {/* 🔹 DIREITA (BOTÕES) */}
        <View style={styles.botoes}>
          {/* ✔ CONFIRMAR */}
          {item.status !== "confirmado" && (
            <TouchableOpacity
              style={styles.ok}
              onPress={() => confirmar(item.id)}
            >
              <Text style={styles.btnText}>✔</Text>
            </TouchableOpacity>
          )}

          {/* ❌ CANCELAR */}
          {item.status !== "cancelado" && (
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => cancelar(item.id)}
            >
              <Text style={styles.btnText}>❌</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Tela_Admin.png")}
        style={styles.bg}
      />

      {/* 🔴 BOTÃO SAIR */}
      <TouchableOpacity
        style={styles.sair}
        onPress={async () => {
          await removerUsuario();
          navigation.replace("Login");
        }}
      >
        <Text style={styles.sairText}>Sair</Text>
      </TouchableOpacity>

      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  bg: {
    position: "absolute",
    width: "220%",   // aumenta largura
    height: "100%",
    resizeMode: "cover",
    right: -460,
  },

  card: {
    margin: 10,
    padding: 15,
    borderRadius: 12,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },

  telefone: {
    fontSize: 14,
    marginBottom: 5,
  },

  servico: {
    fontSize: 15,
    marginTop: 5,
  },

  data: {
    fontSize: 14,
    color: "#333",
  },

  status: {
    marginTop: 5,
    fontWeight: "bold",
  },

  botoes: {
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  marginLeft: 10,
  },

  ok: {
  backgroundColor: "#28a745",
  padding: 12,
  borderRadius: 8,
  },

  cancel: {
  backgroundColor: "#dc3545",
  padding: 12,
  borderRadius: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sair: {
     position: "absolute",
    top: 50,    // 50 pixels do topo (para alinhar com seu cabeçalho)
    right: 30,  // 30 pixels da direita
    backgroundColor: theme.colors.primary, 
    paddingVertical: 10,  // Diminuí um pouco o padding para ficar mais delicado no topo
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 5, 
    zIndex: 10,
  },

  sairText: {
    color: "#fff",
    fontWeight: "bold",
  },
  
  row: {
  flexDirection: "row",
  alignItems: "center",
  },
});