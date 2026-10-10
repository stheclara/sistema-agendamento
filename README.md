# Clínica Lume — Sistema de Agendamento

Sistema web de agendamento desenvolvido para uma clínica fictícia, com fluxo completo para pacientes e uma área administrativa para gerenciamento dos atendimentos.

O projeto foi desenvolvido com **React + Vite** com foco em organização, experiência do usuário, responsividade e simulação de funcionalidades presentes em um sistema real de agendamento.

> **Aviso:** A Clínica Lume é um projeto fictício desenvolvido exclusivamente para fins de estudo e portfólio.

---

## Acesse o projeto

A aplicação está publicada na Vercel:

**Clínica Lume:**  
https://lume-saude.vercel.app

---

## Funcionalidades

### Área do paciente

O paciente pode:

- Escolher uma especialidade;
- Escolher um profissional;
- Visualizar as próximas datas disponíveis;
- Visualizar os horários disponíveis para cada data;
- Selecionar data e horário;
- Preencher seus dados;
- Revisar os dados antes da confirmação;
- Confirmar o agendamento;
- Consultar seus agendamentos;
- Cancelar um agendamento.

Quando um horário já possui um agendamento ativo, ele fica indisponível para novos agendamentos.

Caso o agendamento seja cancelado, o horário volta a ficar disponível.

---

### Área do colaborador

O sistema também possui uma área administrativa demonstrativa.

Nela, o colaborador pode acessar:

- Painel administrativo;
- Agendamentos;
- Pacientes;
- Profissionais;
- Horários.

Também é possível:

- Pesquisar agendamentos;
- Visualizar o status das consultas;
- Cancelar consultas;
- Finalizar atendimentos;
- Consultar pacientes;
- Consultar os profissionais cadastrados;
- Gerenciar a disponibilidade de cada profissional.

---

## Horários dos profissionais

Os profissionais possuem **horários pré-programados**, permitindo que o sistema de agendamento possa ser testado imediatamente, sem a necessidade de configurar manualmente uma agenda antes do primeiro uso.

> [!NOTE]
> **Os horários podem ser alterados pela Área do Colaborador.**
>
> Acesse **Área do Colaborador → Horários**, escolha o profissional desejado e marque ou desmarque os horários disponíveis.
>
> Depois, clique em **Salvar disponibilidade**.
>
> A partir desse momento, a área de agendamento do paciente passa a considerar a disponibilidade definida pelo colaborador.

As alterações realizadas na disponibilidade ficam armazenadas no navegador utilizado para a demonstração por meio do `localStorage`.

---

## Acesso demonstrativo à área administrativa

Para testar a área do colaborador, utilize:

```text
E-mail: colaborador@clinicalume.com.br
Senha: Lume123
```

> [!IMPORTANT]
> A autenticação deste projeto é apenas demonstrativa.
>
> As credenciais estão definidas no front-end e o estado da autenticação utiliza `sessionStorage`.
>
> Em uma aplicação real, a autenticação deveria ser realizada no back-end, com armazenamento seguro de credenciais, controle de sessão e proteção adequada das rotas administrativas.

---

## Armazenamento dos dados

Como este projeto não possui back-end ou banco de dados, alguns dados são armazenados diretamente no navegador.

O projeto utiliza:

- `localStorage` para agendamentos e disponibilidade dos profissionais;
- `sessionStorage` para controlar a sessão da área administrativa.

Por isso, os dados criados durante a demonstração pertencem ao navegador e ao domínio utilizados.

Isso significa que os dados armazenados no ambiente local (`localhost`) são diferentes dos dados armazenados na versão publicada na Vercel.

---

## Especialidades

A Clínica Lume possui profissionais fictícios nas seguintes especialidades:

- Clínica Geral;
- Cardiologia;
- Dermatologia;
- Ginecologia;
- Pediatria;
- Psicologia.

Todos os nomes e informações utilizados no projeto são fictícios.

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
- Vercel

---

## Responsividade

A aplicação foi desenvolvida para funcionar em diferentes tamanhos de tela.

Foram adaptados para dispositivos móveis:

- Página inicial;
- Menu de navegação;
- Fluxo de agendamento;
- Seleção de datas e horários;
- Meus agendamentos;
- Painel administrativo;
- Lista de agendamentos;
- Lista de pacientes;
- Profissionais;
- Gerenciamento de horários.

---

## Fluxo de agendamento

O fluxo principal do paciente segue estas etapas:

```text
Especialidade
      ↓
Profissional
      ↓
Data e horário
      ↓
Dados do paciente
      ↓
Confirmação
      ↓
Agendamento realizado
```

Após a confirmação, o agendamento também pode ser consultado em **Meus agendamentos** e visualizado pela área administrativa.

---

## Estrutura principal do projeto

```text
src
├── assets
├── pages
│   ├── admin
│   │   ├── Admin.css
│   │   ├── AgendamentosAdmin.jsx
│   │   ├── HorariosAdmin.jsx
│   │   ├── LoginAdmin.jsx
│   │   ├── PacientesAdmin.jsx
│   │   ├── PainelAdmin.jsx
│   │   └── ProfissionaisAdmin.jsx
│   │
│   ├── Agendamento.jsx
│   ├── Confirmacao.jsx
│   ├── DadosPaciente.jsx
│   ├── DataHorario.jsx
│   ├── EstilosGerais.css
│   ├── MeusAgendamentos.jsx
│   ├── Profissional.jsx
│   └── SucessoAgendamento.jsx
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/stheclara/sistema-agendamento.git
```

### 2. Entre na pasta do projeto

```bash
cd sistema-agendamento
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o projeto

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

---

## Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar e demonstrar conhecimentos em desenvolvimento front-end, especialmente:

- Desenvolvimento de interfaces com React;
- Componentização;
- Navegação entre páginas com React Router;
- Manipulação de estados;
- Persistência de dados no navegador;
- Validação de formulários;
- Construção de fluxos de usuário;
- Desenvolvimento responsivo;
- Organização de uma aplicação React;
- Versionamento com Git e GitHub;
- Deploy de aplicações com Vercel.

O projeto simula uma aplicação de agendamento, mas não utiliza dados reais de pacientes ou profissionais.

---

## Possíveis evoluções

Como evolução futura, o sistema poderia receber:

- Back-end próprio;
- Banco de dados;
- Autenticação segura;
- Cadastro real de usuários;
- Diferentes níveis de acesso;
- Persistência dos agendamentos entre diferentes dispositivos;
- Integração com e-mail;
- Confirmações e lembretes de consultas;
- Gerenciamento mais avançado da agenda dos profissionais.

---

## Desenvolvido por

**Sthefanie Teixeira**

GitHub:  
https://github.com/stheclara

LinkedIn:  
https://www.linkedin.com/in/sthefanie-teixeira/