<?php

// Valida dados de entrada
if (empty($_POST['participantes']) || empty($_POST['nome'])) {
    header('Location: ./');
    exit;
}

// Dependências
require('lib/Config.php');
require('lib/Exception.php');
require('lib/PHPMailer.php');
require('lib/SMTP.php');

// Especifica formato de saída
header('Content-type: text/plain');

// Obtém os dados da requisição
$participantes = $_POST['participantes'];
$nome = $_POST['nome'];

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
        } else if (count($possibilidades) == 1) {
            // Se o último participante que sobrou sorteou a si mesmo, troca seu amigo com o do primeiro participante
            $participantes[$key]['amigo'] = $participantes[0]['amigo'];
            $participantes[0]['amigo'] = $participantes[$key];

            // Encerra o loop
            $sorteado = true;
        }
    }
}

// Cria o sistema de envio de e-mails
$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$mail->isSMTP();
$mail->CharSet = 'utf-8';
$mail->SMTPAuth = true;
$mail->SMTPSecure = SMTP_SECURE;
$mail->Host = SMTP_HOST;
$mail->Username = SMTP_USER;
$mail->Password = SMTP_PASSWORD;
$mail->Port = SMTP_PORT;
$mail->setFrom(SMTP_USER, 'Amigo Secreto');
$mail->isHTML();
$mail->Subject = 'Sorteio Amigo Secreto | ' . $nome;

// Altera fuso horário para gerar a data correta
date_default_timezone_set('America/Sao_Paulo');

// Envia e-mails
foreach ($participantes as $participante) {
    $mail->clearAddresses();
    $mail->addAddress($participante['email'], $participante['nome']);
    $mail->Body = gerarCorpoEmail([
        'nome' => $nome,
        'participante' => $participante
    ]);
    $mail->send();
}

// Função que pega o corpo do template do e-mail
function gerarCorpoEmail($dados)
{
    ob_start();
    extract($dados);
    require('lib/email_template.php');
    return ob_get_clean();
}

// Printa resultado final
print('Sucesso!');
