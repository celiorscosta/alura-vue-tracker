<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Formulario from "../components/FormularioTarefa.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
} from "@/store/tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length == 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
    };
  },
});
</script>
