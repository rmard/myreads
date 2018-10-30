# MyReads Project

Este é meu primeiro projeto para o Nanodegree em React da Udacity.

## Instalação e execução

Para instalar e rodar o projeto:

* instale todas as dependências do projeto com `npm install`
* inicie o servidor de desenvolvimento com `npm start`

## Idioma (Inglês)

Tentei manter nomes de variáveis e componentes, comentários e textos mostrados ao usuário em inglês, seguindo o padrão do código inicial. Somente este README está em português.

## Recursos extras

Além dos recursos obrigatórios, visando a nomeação do projeto por excelência, alguns recursos extras (opcionais) foram implementados:

### Spinner

Ao carregar (fetch) dados remotos, a aplicação utiliza do _package_ `react-loading` para dar um feedback visual ao usuário

### Debounce

Utilizando o `react-debounce-input`, foi implementado um `input` com _debounce_ na página `/search`. Com isso, um delay de 500ms é aplicado entre o momento que o usuário termina de digitar até a utilização do dado para busca.

### Componente BookDetails

Ao clicar no livro, seja em alguma estante, seja na página de busca, é exibida uma página com a descrição completa do livro, utilizando o novo componente `BookDetails`. O React Router também foi aplicado para essa nova página.