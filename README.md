# Sorteador Amigo Secreto
Esta simples aplicação web tem como objetivo automatizar um sorteio de Amigo Secreto. Basta inserir o nome e e-mail de cada um dos participantes (no mínimo 3) e a ferramenta realizará o sorteio e enviará os devidos resultados no e-mail de cada participante. A própria aplicação também evita que um participante sorteie a si mesmo. Foi desenvolvida usando Javascript + jQuery, PHP e HTML.

Você pode testar seu funcionamento em: [https://eugabrielsilva.tk/amigosecreto](https://eugabrielsilva.tk/amigosecreto).

**Certifique-se de informar um e-mail válido para todos os participantes, ou todo o sorteio terá de ser refeito!**

### Requisitos
- PHP versão 7.4 ou superior
- Suporte a envio de e-mails pela função PHP `mail()`

> **Nota:** Devido ao disparo em massa de e-mails de algumas hospedagens, pode ser que alguns servidores movam o e-mail para a caixa de spam. Avise aos participantes para checarem caso o e-mail não chegue em suas caixas de entrada.