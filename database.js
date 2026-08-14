const DB_KEY = "ribeira_agro_drone_db";

const bancoInicial = {
    propriedades: [],
    animais: [],
    culturas: [],
    drones: [],
    voos: [],
    alertas: [],
    financeiro: []
};

function carregarBanco() {
    try {
        const dados = localStorage.getItem(DB_KEY);

        if (!dados) {
            localStorage.setItem(DB_KEY, JSON.stringify(bancoInicial));
            return JSON.parse(JSON.stringify(bancoInicial));
        }

        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao carregar banco:", erro);
        return JSON.parse(JSON.stringify(bancoInicial));
    }
}

function salvarBanco(banco) {
    localStorage.setItem(DB_KEY, JSON.stringify(banco));
}

function gerarId() {
    return Date.now().toString() + Math.random().toString(36).substring(2, 8);
}

function adicionarRegistro(tipo, registro) {
    const banco = carregarBanco();

    if (!banco[tipo]) {
        banco[tipo] = [];
    }

    const novoRegistro = {
        id: gerarId(),
        criadoEm: new Date().toISOString(),
        ...registro
    };

    banco[tipo].push(novoRegistro);
    salvarBanco(banco);

    return novoRegistro;
}

function atualizarRegistro(tipo, id, novosDados) {
    const banco = carregarBanco();

    if (!banco[tipo]) return false;

    const indice = banco[tipo].findIndex(item => item.id === id);

    if (indice === -1) return false;

    banco[tipo][indice] = {
        ...banco[tipo][indice],
        ...novosDados,
        atualizadoEm: new Date().toISOString()
    };

    salvarBanco(banco);

    return true;
}

function excluirRegistro(tipo, id) {
    const banco = carregarBanco();

    if (!banco[tipo]) return false;

    banco[tipo] = banco[tipo].filter(item => item.id !== id);

    salvarBanco(banco);

    return true;
}

function listarRegistros(tipo) {
    const banco = carregarBanco();

    return banco[tipo] || [];
}

function buscarRegistro(tipo, id) {
    const banco = carregarBanco();

    if (!banco[tipo]) return null;

    return banco[tipo].find(item => item.id === id) || null;
}

function limparBanco() {
    localStorage.removeItem(DB_KEY);
    localStorage.setItem(DB_KEY, JSON.stringify(bancoInicial));
}

function exportarBanco() {
    const banco = carregarBanco();

    const arquivo = new Blob(
        [JSON.stringify(banco, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ribeira-agro-drone-backup.json";
    link.click();

    URL.revokeObjectURL(url);
}

carregarBanco();
