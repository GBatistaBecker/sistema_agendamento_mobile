import AsyncStorage from "@react-native-async-storage/async-storage";

// 10.0.2.2 = sua máquina host no emulador Android
import { API } from "../constantes/API";

// Salva e recupera o cookie de sessão manualmente
async function getSessionCookie(): Promise<string> {
  return (await AsyncStorage.getItem("session_cookie")) || "";
}

async function saveSessionCookie(response: Response) {
  const cookie = response.headers.get("set-cookie");
  if (cookie) {
    // Extrai só o JSESSIONID
    const match = cookie.match(/JSESSIONID=[^;]+/);
    if (match) {
      await AsyncStorage.setItem("session_cookie", match[0]);
    }
  }
}

// 🔹 Buscar agendamentos do usuário
export async function obterAgendamentos() {
  try {
    const cookie = await getSessionCookie();
    const response = await fetch(`${API}/agendamentos-do-usuario`, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
    });

    await saveSessionCookie(response);
    return await response.text();
  } catch (error) {
    console.error("Erro ao obter agendamentos:", error);
    return [];
  }
}

// 🔹 Salvar novo agendamento
export async function salvarAgendamento(novo: any) {
  try {
    const cookie = await getSessionCookie();
    const response = await fetch(`${API}/agendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookie,
      },
      body: new URLSearchParams({
        idServico: String(novo.idServico),
        dataAgendamento: novo.dataAgendamento,
        horaAgendamento: novo.horaAgendamento,
      }).toString(),
    });

    await saveSessionCookie(response);
    return await response.text();
  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
  }
}

// 🔹 Remover agendamento
export async function removerAgendamento(id: string) {
  try {
    const cookie = await getSessionCookie();
    const response = await fetch(`${API}/excluir-agendamento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookie,
      },
      body: new URLSearchParams({ idAgendamento: id }).toString(),
    });

    await saveSessionCookie(response);
    return await response.text();
  } catch (error) {
    console.error("Erro ao remover agendamento:", error);
  }
}

// 🔹 Atualizar status (admin)
export async function atualizarStatus(id: string, acao: "confirmar" | "cancelar") {
  try {
    const cookie = await getSessionCookie();
    const response = await fetch(`${API}/admin/${id}/${acao}`, {
      method: "POST",
      headers: {
        Cookie: cookie,
      },
    });

    await saveSessionCookie(response);
    return await response.text();
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
}