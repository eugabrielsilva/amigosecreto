const app = angular.module('app', []);

app.controller('MainController', function($scope, $http, $httpParamSerializerJQLike) {

    // Valores iniciais
    $scope.participantes = [];
    $scope.nome = '';
    $scope.email = '';
    $scope.sorteio = '';
    $scope.status = 'Realizar sorteio';
    $scope.disabled = false;

    /**
     * Adiciona um participante na lista.
     */
    $scope.adicionarParticipante = function() {
        // Obtém os dados
        let nome = $scope.nome.trim();
        let email = $scope.email.trim().toLowerCase();

        // Valida os dados
        if(!nome.length || !email.length) return alert('Insira o nome e e-mail do participante!');
        if(!/\S+@\S+\.\S+/.test(email)) return alert('Insira um e-mail válido!');
        if($scope.participantes.some(p => p.email == email)) return alert('Este e-mail já está sendo usado por outro participante!');

        // Adiciona na lista de participantes
        $scope.participantes.push({
            nome: nome,
            email: email
        });

        // Limpa os campos
        $scope.nome = '';
        $scope.email = '';
    }

    /**
     * Remove um participante da lista.
     */
    $scope.removerParticipante = function(key) {
        $scope.participantes.splice(key, 1);
    }

    /**
     * Limpa a lista de participantes.
     */
    $scope.limparParticipantes = function() {
        if(!$scope.participantes.length) return;
        if(confirm('Limpar todos os participantes?')) {
            $scope.participantes = [];
            $scope.nome = '';
            $scope.email = '';
        }
    }

    /**
     * Adiciona participante ao pressionar a tecla ENTER.
     */
    $scope.enter = function(event) {
        if(event.keyCode === 13) $scope.adicionarParticipante();
    }

    /**
     * Faz requisição ao script de sorteio passando os dados.
     */
    $scope.realizarSorteio = function() {
        // Valida informações
        if($scope.participantes.length < 3) return alert('Adicione pelo menos 3 participantes!');
        if(!$scope.sorteio.trim().length) return alert('Especifique o nome do sorteio!');

        // Realiza sorteio
        if(confirm('Confirma todos os dados para realizar o sorteio?')) {
            $scope.status = 'Aguarde...';
            $scope.disabled = true;

            $http({
                method: 'POST',
                url: 'sortear.php',
                data: $httpParamSerializerJQLike({
                    participantes: $scope.participantes,
                    nome: $scope.sorteio.trim()
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(response => {
                if(response?.data == 'Sucesso!') {
                    $scope.status = 'Sorteio realizado!';
                    alert('Sorteio realizado com sucesso!\nParticipantes, verifiquem suas caixas de e-mail.');
                } else {
                    $scope.status = 'Realizar sorteio';
                    $scope.disabled = false;
                    alert('Ocorreu um erro ao realizar o sorteio!\nPor favor, tente novamente.');
                    console.log(response);
                }
            }, error => {
                $scope.status = 'Realizar sorteio';
                $scope.disabled = false;
                alert('Ocorreu um erro ao realizar o sorteio!\nPor favor, tente novamente.');
                console.log(error);
            });
        }
    }

});