var sobraAcumulada = 0;

function adicionarHoras() {
    var atividadeSelecionada = document.getElementById('atividade').value;
    var anoSelecionado = document.getElementById('ano').value;
    var horas = parseInt(document.getElementById('horas').value);

    if (isNaN(horas) || horas <= 0) {
        alert('Por favor, insira um valor válido para as horas.');
        return;
    }

    var celula = document.getElementById(atividadeSelecionada + '-ano' + anoSelecionado);
    var celulaMaxHoras = document.getElementById('max-horas-' + atividadeSelecionada).value;
    var celulaTotalGeral = document.getElementById('total-geral-value');

    var valorAtual = parseInt(celula.innerHTML);
    var maxHoras = parseInt(celulaMaxHoras);
    var horasAdicionadas = Math.min(horas, maxHoras);

    if ((valorAtual + horas) > maxHoras) {
        sobraAcumulada += (valorAtual + horas) - maxHoras;
        var sobra = (valorAtual + horas) - maxHoras;
        alert('A quantidade de horas adicionada excede o máximo permitido para esta atividade. Serão descartadas ' + sobra + ' horas.');
        horasAdicionadas = maxHoras - valorAtual;
    } else {
        sobraAcumulada = 0;
    }

    var celulaHorasExcedentes = document.getElementById('horas-excedentes-value');
    celulaHorasExcedentes.innerHTML = sobraAcumulada;

    celula.innerHTML = valorAtual + horasAdicionadas;

    var valorAtualTotalGeral = parseInt(celulaTotalGeral.innerHTML);
    celulaTotalGeral.innerHTML = valorAtualTotalGeral + horasAdicionadas;

    document.getElementById('horas').value = '';
}


function handleKeyPress(event) {
    if (event.key === 'Enter') {
        adicionarHoras();
        return false;
    }
    return true;
}

window.addEventListener('beforeunload', function (e) {
    var confirmationMessage = 'Dados serão perdidos. Tem certeza de que deseja sair?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
});

function adicionarHorasPorAtividade(atividade) {
    var horas;

    switch (atividade) {
        case 'atividade1':
            horas = 20;
            break;
        case 'atividade9':
            horas = 20;
            break;
        case 'atividade10':
            horas = 5;
            break;
        case 'atividade11':
            horas = 40;
            break;
    }

    var anoSelecionado = document.getElementById('ano').value;
    var celula = document.getElementById(atividade + '-ano' + anoSelecionado);
    var celulaTotalGeral = document.getElementById('total-geral-value');

    var valorAtual = parseInt(celula.innerHTML);
    var horasAdicionadas = horas;

    celula.innerHTML = valorAtual + horasAdicionadas;

    var valorAtualTotalGeral = parseInt(celulaTotalGeral.innerHTML);
    celulaTotalGeral.innerHTML = valorAtualTotalGeral + horasAdicionadas;
}

function verificarMinimoAtividades() {
    var atividades = ['atividade1', 'atividade2', 'atividade3', 'atividade4', 'atividade5', 'atividade6', 'atividade7', 'atividade8', 'atividade9', 'atividade10', 'atividade11'];
    var contadorAtividades = 0;

    atividades.forEach(function (atividade) {
        for (var i = 1; i <= 8; i++) {
            var celula = document.getElementById(atividade + '-ano' + i);
            if (parseInt(celula.innerHTML) > 0) {
                contadorAtividades++;
                break;
            }
        }
    });

    if (contadorAtividades >= 3) {
        alert('Você atingiu o mínimo de 3 atividades diferentes.');
    } else {
        alert('Você precisa completar no mínimo 3 atividades diferentes.');
    }
}