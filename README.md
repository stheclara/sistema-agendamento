# Clínica Lume — Sistema de Agendamento

Sistema web de agendamento desenvolvido para uma clínica fictícia, com fluxo completo para pacientes e uma área administrativa para gerenciamento dos atendimentos.

O projeto foi desenvolvido com **React + Vite** com foco em praticar desenvolvimento front-end, organização de componentes, navegação entre páginas, persistência de dados e criação de uma interface responsiva.

> **Clínica Lume é um projeto fictício desenvolvido para fins de estudo e portfólio.**

---

## Sobre o projeto

A Clínica Lume simula o funcionamento de um sistema de agendamento de consultas.

O paciente pode escolher uma especialidade, selecionar um profissional, definir uma data e horário disponível, informar seus dados e confirmar o agendamento.

Além da área do paciente, o projeto possui uma **área administrativa**, permitindo visualizar e gerenciar informações da clínica.

---

## Funcionalidades

### Área do paciente

- Escolha de especialidade
- Escolha do profissional
- Seleção de data e horário
- Controle de horários disponíveis
- Preenchimento e validação dos dados do paciente
- Confirmação do agendamento
- Visualização dos agendamentos realizados
- Cancelamento de consultas
- Liberação automática do horário após cancelamento

### Área administrativa

- Login demonstrativo para colaboradores
- Dashboard com resumo dos agendamentos
- Visualização dos agendamentos
- Busca e filtros
- Cancelamento de consultas
- Finalização de atendimentos
- Listagem de pacientes
- Listagem de profissionais
- Configuração dos horários disponíveis por profissional

---

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- React Router
- HTML
- CSS
- LocalStorage
- SessionStorage
- Git
- GitHub

---

## Responsividade

O sistema foi desenvolvido para funcionar em diferentes tamanhos de tela.

A interface possui adaptações para dispositivos móveis, incluindo:

- navegação responsiva;
- fluxo de agendamento adaptado para telas menores;
- cards para visualização de agendamentos e pacientes;
- painel administrativo responsivo;
- formulários e seletores de horários adaptados para mobile.

---

## Área administrativa

O projeto possui uma área administrativa demonstrativa para simular o fluxo de acesso de colaboradores da clínica.

A autenticação atual utiliza `sessionStorage` e credenciais fictícias definidas no front-end, sendo adequada apenas para fins de estudo e demonstração.

Em uma aplicação real, a autenticação seria implementada no back-end, com armazenamento seguro de credenciais, controle de sessão e proteção das rotas administrativas.

### Credenciais para demonstração

**E-mail**

```text
colaborador@clinicalume.com.br
```

**Senha**

```text
Lume123
```

---

## Armazenamento dos dados

Nesta versão, os dados são armazenados localmente no navegador utilizando `localStorage`.

São armazenadas informações como:

- agendamentos;
- status das consultas;
- disponibilidade de horários dos profissionais.

Por isso, os dados são específicos do navegador e dispositivo utilizados.

---

## Estrutura principal

```text
src/
├── assets/
├── pages/
│   ├── admin/
│   │   ├── AgendamentosAdmin.jsx
│   │   ├── HorariosAdmin.jsx
│   │   ├── LoginAdmin.jsx
│   │   ├── PacientesAdmin.jsx
│   │   ├── PainelAdmin.jsx
│   │   └── ProfissionaisAdmin.jsx
│   ├── Agendamento.jsx
│   ├── Confirmacao.jsx
│   ├── DadosPaciente.jsx
│   ├── DataHorario.jsx
│   ├── MeusAgendamentos.jsx
│   ├── Profissional.jsx
│   └── SucessoAgendamento.jsx
├── App.jsx
└── main.jsx
```

---

## Executando o projeto localmente

Clone o repositório:

```bash
git clone https://github.com/stheclara/sistema-agendamento.git
```

Entre na pasta:

```bash
cd sistema-agendamento
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

Depois, abra no navegador o endereço informado pelo Vite.

---

## Deploy

O projeto será publicado na **Vercel**.

O link da aplicação será adicionado aqui após a publicação.

---

## Objetivo do projeto

Este projeto foi criado para colocar em prática conhecimentos de desenvolvimento front-end e simular uma aplicação com um fluxo mais próximo de um sistema real.

Durante o desenvolvimento foram trabalhados conceitos como:

- criação de interfaces com React;
- roteamento entre páginas;
- manipulação e validação de formulários;
- persistência de dados no navegador;
- controle de disponibilidade de horários;
- gerenciamento de estados de agendamentos;
- criação de área administrativa;
- responsividade;
- organização e manutenção do código.

---

## Desenvolvido por

**Sthefanie Teixeira**

GitHub: [@stheclara](https://github.com/stheclara)

LinkedIn: [Sthefanie Teixeira](https://www.linkedin.com/in/sthefanie-teixeira/)