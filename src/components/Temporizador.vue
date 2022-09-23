<template>
    <section class="is-flex is-align-items-center is-justify-content-space-between">
      <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
      <Botao @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
      <Botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </section>
  </template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
    // eslint-disable-next-line 
    name: "Temporizador",
    emits: ['aoTemporizadorFinalizado'],
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        };
    },
    methods: {
        iniciar() {
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
                this.cronometroRodando = true;
            }, 1000);
        },
        finalizar() {
            clearInterval(this.cronometro);
            this.cronometroRodando = false;
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    },
    components: { Cronometro }
});
</script>