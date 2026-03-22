import "react-native-get-random-values";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { salvarAgendamento } from "../services/agendamentos";
import { v4 as uuidv4 } from "uuid";

export default function HorarioScreen() {
  const route = useRoute();
  const navigation: any = useNavigation();
  const { servico, data }: any = route.params;

  // Horários fixos (podemos melhorar depois)
  const horarios = [
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const confirmarHorario = (hora: string) => {
  Alert.alert(
    "Confirmar Agendamento",
    `${servico.nome}\n${data.label}\nHorário: ${hora}`,
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            const novoAgendamento = {
              id: uuidv4(),
              servico: servico.nome,
              data: data.label,
              hora: hora,
            };

            await salvarAgendamento(novoAgendamento);

            Alert.alert("Sucesso", "Agendamento realizado!");

            navigation.navigate("Servicos");
          } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível salvar o agendamento");
          }
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pitbull-fundo-sem-cachorro.png")}
        style={styles.backgroundImage}
      />

      {/* Seta voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        <Text style={styles.title}>Horários</Text>

        <Text style={styles.subtitle}>
          {servico.nome}
        </Text>

        <Text style={styles.dateText}>
          {data.label}
        </Text>

        <FlatList
          data={horarios}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => confirmarHorario(item)}
            >
              <Text style={styles.cardText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },

  centerContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },

  dateText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 20,
  },

  listContent: {
    alignItems: "center",
  },

  card: {
  backgroundColor: "#ffffffcc",
  borderRadius: 14,
  paddingVertical: 20,
  width: "45%", // importante para grid
  alignItems: "center",
  marginBottom: 15,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});