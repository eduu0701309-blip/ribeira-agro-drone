document.addEventListener("DOMContentLoaded", () => {
    console.log("Ribeira Agro Drone iniciado.");

    atualizarResumo();
});

function atualizarResumo() {
    const propriedades = listarRegistros("propriedades");
    const animais = listarRegistros("animais");
    const culturas = listarRegistros("culturas");
    const drones = listarRegistros("drones");
    const voos = listarRegistros("voos");
    const alertas = listarRegistros("alertas");
    const financeiro = listarRegistros("financeiro");

    const resumo = {
        propriedades: propriedades.length,
        animais: animais.length,
        culturas: culturas.length,
        drones: drones.length,
        voos: voos.length,
        alertas: alertas.length,
        receitas: financeiro
            .filter(item => item.tipo === "receita")
            .reduce((total, item) => total + Number(item.valor || 0), 0),
        custos: financeiro
            .filter(item => item.tipo === "custo")
            .reduce((total, item) => total + Number(item.valor || 0), 0)
    };

    window.ribeiraResumo = resumo;

    console.log("Resumo da propriedade:", resumo);

    return resumo;
}

function adicionar(tipo, dados) {
    const registro = adicionarRegistro(tipo, dados);
    atualizarResumo();

    console.log("Registro adicionado:", registro);

    return registro;
}

function editar(tipo, id, dados) {
    const resultado = atualizarRegistro(tipo, id, dados);
    atualizarResumo();

    console.log("Registro atualizado:", resultado);

    return resultado;
}

function excluir(tipo, id) {
    const resultado = excluirRegistro(tipo, id);
    atualizarResumo();

    console.log("Registro excluído:", resultado);

    return resultado;
}

function obter(tipo) {
    return listarRegistros(tipo);
}

function obterUm(tipo, id) {
    return buscarRegistro(tipo, id);
}

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarData(data) {
    if (!data) return "-";

    return new Date(data).toLocaleDateString("pt-BR");
}

function mostrarMensagem(mensagem, tipo = "sucesso") {
    let elemento = document.getElementById("ribeira-mensagem");

    if (!elemento) {
        elemento = document.createElement("div");
        elemento.id = "ribeira-mensagem";

        elemento.style.position = "fixed";
        elemento.style.bottom = "25px";
        elemento.style.right = "25px";
        elemento.style.zIndex = "99999";
        elemento.style.padding = "14px 18px";
        elemento.style.borderRadius = "12px";
        elemento.style.color = "#fff";
        elemento.style.fontWeight = "700";
        elemento.style.boxShadow = "0 8px 25px rgba(0,0,0,.25)";

        document.body.appendChild(elemento);
    }

    elemento.textContent = mensagem;

    elemento.style.background =
        tipo === "erro" ? "#c0392b" : "#176b3a";

    elemento.style.display = "block";

    clearTimeout(window.ribeiraMensagemTimer);

    window.ribeiraMensagemTimer = setTimeout(() => {
        elemento.style.display = "none";
    }, 2500);
}

window.RibeiraAgro = {
    adicionar,
    editar,
    excluir,
    obter,
    obterUm,
    atualizarResumo,
    formatarMoeda,
    formatarData,
    mostrarMensagem,
    exportarBanco
};
