let listavidro = []; 
/* faz o formulario ficar visivel */
function mostrarformulario(tipo) {
    document.getElementById("formcomum").style.display = "none";
    document.getElementById("formtemp").style.display = "none";
    
    if (tipo === "comum") {
        document.getElementById("formcomum").style.display = "block";
    } else if (tipo === "temperado") {
        document.getElementById("formtemp").style.display = "block";
    }
}

function calcularpreco(tipo) {
    /*transforma os valores digitados pelo usuario em numeros validos para calculo*/
    let altura, largura, quantidade, valormetro;

    if (tipo === "comum") {
        altura = parseFloat(document.getElementById("altcom").value);
        largura = parseFloat(document.getElementById("larcom").value);
        quantidade = parseInt(document.getElementById("quancom").value);
        valormetro = parseFloat(document.getElementById("precometrocom").value);
    } else {
        altura = parseFloat(document.getElementById("altemp").value);
        largura = parseFloat(document.getElementById("lartemp").value);
        quantidade = parseInt(document.getElementById("quantemp").value);
        valormetro = parseFloat(document.getElementById("precometrotem").value);
    }

    /*faz o calculo da area*/
    let area = altura * largura;

    /*faz a validação*/
    if (isNaN(area) || area <= 0 || isNaN(quantidade) || quantidade <= 0 || isNaN(valormetro) || valormetro <= 0) {
        return;
    }

    /*calcula o valor total*/
    let valortotal = quantidade * area * valormetro;

    /*retorna com o valor do vidro*/
    if (tipo === "comum") {
        document.getElementById("precocom").innerText = `Valor do(s) vidro(s): R$ ${valortotal.toFixed(2)}`;
    } else {
        document.getElementById("precotem").innerText = `Valor do(s) vidro(s): R$ ${valortotal.toFixed(2)}`;
    }
}

function adicionaraoorcamento(tipo) {
    let largura, altura, espessura, quantidade, valormetro, precototal, modelovidro;

    if (tipo === "comum") {
        altura = parseFloat(document.getElementById("altcom").value);
        largura = parseFloat(document.getElementById("larcom").value);
        quantidade = parseInt(document.getElementById("quancom").value);
        valormetro = parseFloat(document.getElementById("precometrocom").value);
        modelovidro = document.getElementById("modelovidrocom").value;
        let selectEspessura = document.getElementById("espessuracom");
        espessura = selectEspessura.options[selectEspessura.selectedIndex].text;
    } else {
        altura = parseFloat(document.getElementById("altemp").value);
        largura = parseFloat(document.getElementById("lartemp").value);
        quantidade = parseInt(document.getElementById("quantemp").value);
        valormetro = parseFloat(document.getElementById("precometrotem").value);
        modelovidro = document.getElementById("modelovidrotem").value;
        let selectEspessura = document.getElementById("espessuratem");
        espessura = selectEspessura.options[selectEspessura.selectedIndex].text;
    }

    let area = largura * altura;
        if (isNaN(area) || area <= 0 || quantidade < 1 || isNaN(valormetro) || valormetro <= 0) {
            alert("Insira valores válidos!");
            return;
        }

        precototal = area * valormetro * quantidade;
        
        let vidro = {
            tipo: modelovidro.charAt(0).toUpperCase() + modelovidro.slice(1),
            espessura: espessura,
            largura: largura,
            altura: altura,
            quantidade: quantidade,
            preco: precototal.toFixed(2)
        };

    listavidro.push(vidro);
    atualizarorcamento();
    limparCampos(tipo);
}    

function limparCampos(tipo) {
    if (tipo === "comum") {
        document.getElementById("altcom").value = "";
        document.getElementById("larcom").value= "";
        document.getElementById("quancom").value = "1";
        document.getElementById("precometrocom").value = "";
        document.getElementById("precom").innerText = "";
        } else {
        document.getElementById("altemp").value = "";
        document.getElementById("lartemp").value = "";
        document.getElementById("quantemp").value = "1";
         document.getElementById("precometrotem").value = "";
         document.getElementById("precotem").innerText = "";
    }
}    

function atualizarorcamento() {
    let lista = document.getElementById("listaorcamento");
    let totalorcamento = document.getElementById("totalorcamento");
    lista.innerHTML = "";
    let total = 0;
    
    listavidro.forEach((vidro, index) => {
        total += parseFloat(vidro.preco);
        lista.innerHTML += `<li>${vidro.quantidade}x ${vidro.tipo} - ${vidro.espessura} (${vidro.largura}m x ${vidro.altura}m) = R$ ${vidro.preco} <button onclick="removerVidro(${index})">❌</button></li>`;
    });

    totalorcamento.innerHTML = `<strong>Total do orçamento: R$ ${total.toFixed(2)}</strong>`;
}    

function removerVidro(index) {
    listavidro.splice(index, 1);
    atualizarorcamento();
}