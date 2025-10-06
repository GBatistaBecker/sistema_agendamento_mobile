import * as SecureStore from "expo-secure-store";

const USER_KEY = "usuario";

export async function salvarUsuario(usuario: any) {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(usuario));
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
}

export async function obterUsuario() {
  try {
    const dados = await SecureStore.getItemAsync(USER_KEY);
    return dados ? JSON.parse(dados) : null;
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    return null;
  }
}

export async function removerUsuario() {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
  }
}
