// Dados
let participantes = [];
let emails = [];

// Elementos
let inpNome = document.getElementById('nome');
let inpEmail = document.getElementById('email');
let tbParticipantes = document.getElementById('participantes');
let btnSortear = document.getElementById('sortear');

/**
 * Adiciona um participante na lista.
 */
function adicionar() {
    // Obtém os dados
    let nome = inpNome.value.trim();
    let email = inpEmail.value.trim().toLowerCase();

    // Valida os dados
    if(nome == '' || email == '') return;
    if(emails.includes(email)) return alert('Este e-mail já está sendo usado por outro participante!');

    // Adiciona na lista de participantes e de e-mails
    participantes.push({
        nome: nome,
        email: email
    });

    emails.push(email);

    // Adiciona o participante na tabela
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let btnRemover = document.createElement('a');

    btnRemover.innerHTML = '&times;';
    btnRemover.href = '';
    btnRemover.onclick = function(event) {
        remover(email, event);
    };

    tdNome.innerHTML = nome;
    tdNome.appendChild(btnRemover);

    tdEmail.innerHTML = email;

    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tbParticipantes.appendChild(tr);

    inpNome.value = '';
    inpEmail.value = '';
}

/**
 * Remove um participante da lista.
 */
function remover(email, event) {
    event.preventDefault();

    // Obtém a posição do participante e remove
    let key = emails.indexOf(email);
    participantes.splice(key, 1);
    emails.splice(key, 1);

    // Remove da tabela
    tbParticipantes.children[key].remove();
}

/**
 * Faz requisição ao script de sorteio passando os dados.
 */
function sortear() {
    if(participantes.length < 3) return alert('Adicione pelo menos 3 participantes!');
    if(confirm('Confirma todos os dados para realizar o sorteio?')) {
        btnSortear.innerHTML = 'Aguarde...';
        btnSortear.disabled = true;

        $.post('sortear.php', {participantes: participantes}, function(response) {
            if(response == 'success') {
                btnSortear.innerHTML = 'Sorteio realizado!';
                alert('Sorteio realizado com sucesso!');
            } else {
                btnSortear.innerHTML = 'Realizar sorteio';
                btnSortear.disabled = false;
                alert('Ocorreu um erro ao realizar o sorteio!');
            }
        });
    }
}

/**
 * Limpa a lista de participantes.
 */
function limpar() {
    if(participantes.length == 0) return;
    if(confirm('Limpar todos os participantes?')) {
        inpNome.value = '';
        inpEmail.value = '';
        tbParticipantes.innerHTML = '';
        participantes = [];
        emails = [];
    }
}

/**
 * Adiciona participante ao pressionar a tecla ENTER.
 */
function enter(event) {
    if(event.keyCode === 13) {
        adicionar();
    }
}