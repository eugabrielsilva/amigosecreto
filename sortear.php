<?php

// Especifica formato de saída
header('Content-type: text/plain');

// Valida dados de entrada
if (empty($_POST['participantes'])) {
    print('fail');
    exit;
}

// Obtém os dados da requisição
$participantes = $_POST['participantes'];

// Armazena as possibilidades de amigo como os participantes e embaralha a lista
$possibilidades = $participantes;
shuffle($possibilidades);

// Itera entre todos os participantes
foreach ($participantes as $key => $participante) {
    // Inicia um loop até que um amigo válido seja sorteado
    $sorteado = false;
    while (!$sorteado) {
        // Obtém um amigo aleatório da lista de possibilidades
        $resultado = array_rand($possibilidades);

        // Verifica se o participante não sorteou a si mesmo
        if ($possibilidades[$resultado]['email'] != $participante['email']) {
            // Salva o resultado
            $participantes[$key]['amigo'] = $possibilidades[$resultado];

            // Remove da lista de possibilidades
            unset($possibilidades[$resultado]);

            // Reordena as possibilidades
            shuffle($possibilidades);

            // Encerra o loop
            $sorteado = true;

            // Se o último participante que sobrou sorteou a si mesmo
        } else if (count($possibilidades) == 1) {
            // Troca seu amigo com o do primeiro participante
            $participantes[$key]['amigo'] = $participantes[0]['amigo'];
            $participantes[0]['amigo'] = $participantes[$key];

            // Encerra o loop
            $sorteado = true;
        }
    }
}

// Envia e-mails
foreach ($participantes as $participante) {
    mail($participante['email'], 'Amigo Secreto', 'Seu amigo secreto é: ' . $participante['amigo']['nome']);
}

// Printa resultado final
print('success');
