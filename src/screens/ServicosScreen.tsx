import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

// 👇 1. Importe o 'removerUsuario' e o 'theme'
import { removerUsuario } from "../services/storage";
import { theme } from "../styles/theme";

const servicos = [
  { id: 1, nome: "Corte Tradicional", preco: "R$ 30,00", duracao: "30 min" },
  { id: 2, nome: "Corte Degradê", preco: "R$ 30,00", duracao: "30 min" },
  { id: 3, nome: "Barba Completa", preco: "R$ 25,00", duracao: "30 min" },
  { id: 4, nome: "Degradê + Barba", preco: "R$ 50,00", duracao: "30 min" },
];

export default function ServicosScreen({ navigation }: any) {
  
  // 👇 2. Crie a função de logout
  const handleLogout = async () => {
    await removerUsuario();
    navigation.replace("Login");
  };

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
        contentContainerStyle={styles.listaServicos} // Estilo modificado abaixo
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate("Data", { servico: item })}
            >
            <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>

            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardPreco}>{item.preco}</Text>
            <Text style={styles.cardTempo}>Duração: {item.duracao}</Text>
          </View>
        )}
      />

      {/* 👇 3. Adicione o botão de Sair aqui */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.agendamentosButton} onPress={() => navigation.navigate("Agendamentos")}>
        <Text style={styles.agendamentosButtonText}>Agendamentos</Text>
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
  header: { alignItems: "center", marginTop: 50 },
  logo: { width: 150, height: 150, resizeMode: "contain" },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginTop: -10,
  },
  listaServicos: {
    alignItems: "center",
    paddingVertical: 20,
  },
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

  
  logoutButton: {
    position: "absolute",
    top: 50,    // 50 pixels do topo (para alinhar com seu cabeçalho)
    right: 30,  // 30 pixels da direita
    backgroundColor: theme.colors.primary, 
    paddingVertical: 10,  // Diminuí um pouco o padding para ficar mais delicado no topo
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 5, 
    zIndex: 10, // Adicionado: Garante que o botão fique na frente de outros elementos
  },
  logoutButtonText: {
    color: theme.colors.buttonText, // Cor do texto do seu tema
    fontSize: 16,
    fontWeight: "bold",
  },
  agendamentosButton: {
  position: "absolute",
  top: 50,
  left: 25, // 👈 aqui está a diferença
  backgroundColor: theme.colors.primary,
  paddingVertical: 10,
  paddingHorizontal: 5,
  borderRadius: 5,
  elevation: 5,
  zIndex: 10,
},

agendamentosButtonText: {
  color: theme.colors.buttonText,
  fontSize: 16,
  fontWeight: "bold",
},
});