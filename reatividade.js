const { set } = require("core-js/core/dict");

const projeto = {
    id: 1,
    descricao: 'Alura Tracker 3.0'
}


const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave){
        console.log(`Alguem pediu a chave ${chave} do projeto`)
        return objetoOriginal[chave];
    },
    set(objetoOriginal, chave, valor){
        console.log(`Alguem alterou a chave ${chave} do projeto para o valor ${valor}`)
        objetoOriginal[chave]=valor;
    }
})

proxy.descricao = 'Reatividade é muito bacana';

console.log(proxy.descricao);