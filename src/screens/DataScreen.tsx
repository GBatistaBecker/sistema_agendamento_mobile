import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function DataScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { servico }: any = route.params;

  // Gerar os próximos 7 dias dinamicamente
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

      <Text style={styles.title}>Agendar: {servico.nome}</Text>

      <FlatList
        data={dias}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
         <TouchableOpacity
  style={styles.card}
  onPress={() => (navigation as any).navigate("Horario", { servico, data: item })}
>
  <Text style={styles.cardText}>{item.label}</Text>
</TouchableOpacity>

        )}
      />

      <TouchableOpacity
        style={styles.voltarBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  lista: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9cc",
    borderRadius: 10,
    padding: 15,
    width: 250,
    alignItems: "center",
    marginVertical: 10,
  },
  cardText: { fontSize: 18, color: "#000" },
  voltarBtn: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#c0392b",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  voltarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
