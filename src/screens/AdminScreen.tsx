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

    if (typeof dados === "string") {
      setAgendamentos([]);
    } else {
      setAgendamentos(dados);
    }
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
          await atualizarStatus(id, "confirmar"); // ✅ corrigido
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
          await atualizarStatus(id, "cancelar"); // ✅ corrigido
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

          <View style={styles.botoes}>
            {item.status !== "confirmado" && (
              <TouchableOpacity
                style={styles.ok}
                onPress={() => confirmar(item.id)}
              >
                <Text style={styles.btnText}>✔</Text>
              </TouchableOpacity>
            )}

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
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()} // ✅ corrigido
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 100 }}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum agendamento encontrado</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  bg: {
    position: "absolute",
    width: "220%",
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
    top: 50,
    right: 30,
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
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

  vazio: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#fff",
  },
});