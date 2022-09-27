import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { store } from "@/store";

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoDeNotificacao, titulo: string, texto: string): void {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo,
            });
        },
    }
}