import * as SecureStore from "expo-secure-store";

const KEY = "AGENDAMENTOS";

// 🔹 Buscar todos
export async function obterAgendamentos() {
  try {
    const dados = await SecureStore.getItemAsync(KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error("Erro ao obter agendamentos:", error);
    return [];
  }
}

// 🔹 Salvar novo
export async function salvarAgendamento(novo: any) {
  try {
    const lista = await obterAgendamentos();
    const atualizado = [...lista, novo];

    await SecureStore.setItemAsync(KEY, JSON.stringify(atualizado));
  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
  }
}

// 🔹 Remover
export async function removerAgendamento(id: string) {
  try {
    const lista = await obterAgendamentos();
    const filtrado = lista.filter((item: any) => item.id !== id);

    await SecureStore.setItemAsync(KEY, JSON.stringify(filtrado));
  } catch (error) {
    console.error("Erro ao remover agendamento:", error);
  }
}

export async function atualizarStatus(id: string, status: string) {
  const lista = await obterAgendamentos();

  const novaLista = lista.map((item: any) =>
    item.id === id ? { ...item, status } : item
  );

  await SecureStore.setItemAsync(KEY, JSON.stringify(novaLista));
}