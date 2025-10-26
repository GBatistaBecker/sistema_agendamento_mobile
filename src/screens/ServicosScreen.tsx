import React from "react";
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet,} from "react-native";

const servicos = [
  { id: 1, nome: "Corte Tradicional", preco: "R$ 35,00", duracao: "30 min" },
  { id: 2, nome: "Corte Degradê", preco: "R$ 40,00", duracao: "40 min" },
  { id: 3, nome: "Barba Completa", preco: "R$ 25,00", duracao: "20 min" },
  { id: 4, nome: "Sobrancelha", preco: "R$ 10,00", duracao: "10 min" },
];

export default function ServicosScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Fundo da tela */}
      <Image
        source={require("../assets/images/pitbull-fundo-sem-cachorro.png")}
        style={styles.backgroundImage}
      />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/pitbull-logo-branco.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Selecione os serviços</Text>
      </View>

      {/* Lista de serviços */}
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaServicos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardPreco}>{item.preco}</Text>
            <Text style={styles.cardTempo}>Duração: {item.duracao}</Text>
          </View>
        )}
      />
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
  header: { alignItems: "center", marginTop: 50 },
  logo: { width: 150, height: 150, resizeMode: "contain" },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginTop: -10,
  },
  listaServicos: { alignItems: "center", paddingVertical: 20 },
  card: {
    backgroundColor: "#f9f9f9cc",
    borderRadius: 10,
    padding: 20,
    width: 250,
    alignItems: "center",
    marginVertical: 10,
  },
  addBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: { fontSize: 18, color: "#000" },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  cardPreco: { fontSize: 16 },
  cardTempo: { fontSize: 14, color: "gray" },
});
