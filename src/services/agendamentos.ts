const API = "http://192.168.0.10:8080/barbearia";

// 🔹 Buscar agendamentos do usuário
export async function obterAgendamentos() {
  try {
    const response = await fetch(`${API}/agendamentos-do-usuario`, {
      method: "GET",
      credentials: "include", // importante se estiver usando sessão
    });

    const data = await response.text(); // seu backend retorna String
    return data;
  } catch (error) {
    console.error("Erro ao obter agendamentos:", error);
    return [];
  }
}

// 🔹 Salvar novo agendamento
export async function salvarAgendamento(novo: any) {
  try {
    const response = await fetch(`${API}/agendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: new URLSearchParams({
        idServico: String(novo.idServico),
        dataAgendamento: novo.dataAgendamento,
        horaAgendamento: novo.horaAgendamento,
      }).toString(),
    });

    const msg = await response.text();
    return msg;
  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
  }
}

// 🔹 Remover agendamento
export async function removerAgendamento(id: string) {
  try {
    const response = await fetch(`${API}/excluir-agendamento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: new URLSearchParams({
        idAgendamento: id,
      }).toString(),
    });

    return await response.text();
  } catch (error) {
    console.error("Erro ao remover agendamento:", error);
  }
}

// 🔹 Atualizar status (admin)
export async function atualizarStatus(id: string, acao: "confirmar" | "cancelar") {
  try {
    const response = await fetch(`${API}/admin/${id}/${acao}`, {
      method: "POST",
      credentials: "include",
    });

    return await response.text();
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
}