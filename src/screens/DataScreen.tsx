import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function DataScreen() {
  const route = useRoute();
  const navigation: any = useNavigation();
  const { servico }: any = route.params;

  const hoje = new Date();
  const dias = Array.from({ length: 7 }).map((_, i) => {
    const data = new Date();
    data.setDate(hoje.getDate() + i);

    const dia = data.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });

    return { id: i, label: dia };
  });

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

      {/* Bloco central */}
      <View style={styles.centerContainer}>
        <Text style={styles.title}>
          Agendar: {servico.nome}
        </Text>

        <FlatList
          data={dias}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Horario" as never, {
                  servico,
                  data: item,
                }  as never)
              }
            >
              <Text style={styles.cardText}>{item.label}</Text>
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
    justifyContent: "center", // CENTRALIZA VERTICAL
    alignItems: "center",     // CENTRALIZA HORIZONTAL
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
    textAlign: "center",
    marginBottom: 44,
  },

  listContent: {
    alignItems: "center",
  },

  card: {
    backgroundColor: "#ffffffcc",
    borderRadius: 14,
    paddingVertical: 15,
    width: 270,
    alignItems: "center",
    marginVertical: 8,
  },

  cardText: {
    fontSize: 18,
    color: "#000",
    textTransform: "capitalize",
  },
});