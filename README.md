# Sorteador Amigo Secreto
Esta simples aplicação web tem como objetivo automatizar um sorteio de Amigo Secreto. Basta inserir o nome e e-mail de cada um dos participantes (no mínimo 3) e a ferramenta realizará o sorteio e enviará os devidos resultados no e-mail de cada participante. A própria aplicação também evita que um participante sorteie a si mesmo. Foi desenvolvida usando Javascript + AngularJS, PHP e HTML.

**Certifique-se de informar um e-mail válido para todos os participantes, ou todo o sorteio terá de ser refeito!**

### Requisitos
- PHP versão 7.4 ou superior
- Conta de e-mail com suporte a envio SMTP

### Configuração
Inicialmente, é necessário configurar a conta de e-mail que será usada para disparar os e-mails via SMTP para cada participante. As configurações estão no arquivo `lib/Config.php`. Depois disso a aplicação estará pronta para realizar os sorteios.

### Créditos
Desenvolvido por [Gabriel Silva](https://eugabrielsilva.tk).