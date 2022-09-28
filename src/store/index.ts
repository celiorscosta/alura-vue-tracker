import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUsestore } from "vuex";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import { ADICIONAR_TAREFAS, ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto;
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notif => notif.id != novaNotificacao.id);
            }, 3000);
        },
        // TAREFAS
        [ADICIONAR_TAREFAS](state, tarefa: ITarefa) {           
            state.tarefas.push(tarefa);
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },

    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(res => commit(DEFINIR_PROJETOS, res.data));
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('projetos', {
                nome: nomeDoProjeto
            });
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`projetos/${projeto.id}`, projeto);
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            return http.delete(`projetos/${id}`).then(() => commit(EXCLUIR_PROJETO, id));
        },
        // TAREFAS
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(res => commit(DEFINIR_TAREFAS, res.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa)
                .then(res => commit(ADICIONAR_TAREFAS, res.data));
        },
    }
});

export function useStore(): Store<Estado> {
    return vuexUsestore(key);
}