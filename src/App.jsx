import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Agendamento from './pages/Agendamento'
import Profissional from './pages/Profissional'
import DataHorario from './pages/DataHorario'
import DadosPaciente from './pages/DadosPaciente'
import Confirmacao from './pages/Confirmacao'
import SucessoAgendamento from './pages/SucessoAgendamento'
import MeusAgendamentos from './pages/MeusAgendamentos'

import LoginAdmin from './pages/admin/LoginAdmin'
import PainelAdmin from './pages/admin/PainelAdmin'
import AgendamentosAdmin from './pages/admin/AgendamentosAdmin'
import PacientesAdmin from './pages/admin/PacientesAdmin'
import ProfissionaisAdmin from './pages/admin/ProfissionaisAdmin'
import HorariosAdmin from './pages/admin/HorariosAdmin'

import './App.css'

function Home() {
  const [mostrarVoltarTopo, setMostrarVoltarTopo] = useState(false)
  const [busca, setBusca] = useState('')
  const [mensagemBusca, setMensagemBusca] = useState('')
  const [resultadoBusca, setResultadoBusca] = useState(null)

  const especialidades = [
    {
      nome: 'Clínica Geral',
      descricao:
        'Acompanhamento da saúde, avaliação inicial e cuidados gerais.',
      icone: '✦',
    },
    {
      nome: 'Cardiologia',
      descricao:
        'Cuidado especializado para a saúde do coração.',
      icone: '♡',
    },
    {
      nome: 'Dermatologia',
      descricao:
        'Cuidados com a saúde da pele, cabelos e unhas.',
      icone: '◌',
    },
    {
      nome: 'Ginecologia',
      descricao:
        'Acompanhamento e cuidado com a saúde da mulher.',
      icone: '❀',
    },
    {
      nome: 'Pediatria',
      descricao:
        'Cuidado e acompanhamento da saúde de crianças e adolescentes.',
      icone: '☆',
    },
    {
      nome: 'Psicologia',
      descricao:
        'Acolhimento e acompanhamento para o bem-estar emocional.',
      icone: '☼',
    },
  ]

  const profissionais = [
    {
      nome: 'Dra. Helena Martins',
      especialidade: 'Clínica Geral',
    },
    {
      nome: 'Dr. Rafael Almeida',
      especialidade: 'Clínica Geral',
    },
    {
      nome: 'Dr. Lucas Ferreira',
      especialidade: 'Cardiologia',
    },
    {
      nome: 'Dra. Marina Costa',
      especialidade: 'Cardiologia',
    },
    {
      nome: 'Dra. Laura Mendes',
      especialidade: 'Dermatologia',
    },
    {
      nome: 'Dr. André Ribeiro',
      especialidade: 'Dermatologia',
    },
    {
      nome: 'Dra. Camila Nogueira',
      especialidade: 'Ginecologia',
    },
    {
      nome: 'Dra. Beatriz Lima',
      especialidade: 'Ginecologia',
    },
    {
      nome: 'Dra. Sofia Carvalho',
      especialidade: 'Pediatria',
    },
    {
      nome: 'Dr. Gabriel Rocha',
      especialidade: 'Pediatria',
    },
    {
      nome: 'Isabela Freitas',
      especialidade: 'Psicologia',
    },
    {
      nome: 'Daniel Moreira',
      especialidade: 'Psicologia',
    },
  ]

  useEffect(() => {
    function verificarRolagem() {
      setMostrarVoltarTopo(window.scrollY > 400)
    }

    window.addEventListener('scroll', verificarRolagem)

    verificarRolagem()

    return () => {
      window.removeEventListener('scroll', verificarRolagem)
    }
  }, [])

  function normalizarTexto(texto) {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  }

  function rolarParaSecao(id) {
    const secao = document.getElementById(id)

    if (secao) {
      secao.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  function voltarAoTopo() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function realizarBusca(event) {
    event.preventDefault()

    const termo = normalizarTexto(busca)

    setMensagemBusca('')
    setResultadoBusca(null)

    if (!termo) {
      setMensagemBusca(
        'Digite uma especialidade ou o nome de um profissional.'
      )

      return
    }

    const especialidadeEncontrada = especialidades.find(
      (especialidade) =>
        normalizarTexto(especialidade.nome).includes(termo)
    )

    if (especialidadeEncontrada) {
      setResultadoBusca({
        tipo: 'especialidade',
        nome: especialidadeEncontrada.nome,
      })

      setMensagemBusca(
        `Especialidade encontrada: ${especialidadeEncontrada.nome}`
      )

      setTimeout(() => {
        rolarParaSecao('especialidades')
      }, 50)

      return
    }

    const profissionalEncontrado = profissionais.find(
      (profissional) =>
        normalizarTexto(profissional.nome).includes(termo)
    )

    if (profissionalEncontrado) {
      setResultadoBusca({
        tipo: 'profissional',
        nome: profissionalEncontrado.nome,
      })

      setMensagemBusca(
        `Profissional encontrado: ${profissionalEncontrado.nome}`
      )

      setTimeout(() => {
        rolarParaSecao('corpo-clinico')
      }, 50)

      return
    }

    setMensagemBusca(
      'Nenhuma especialidade ou profissional encontrado.'
    )
  }

  function especialidadeEstaDestacada(nome) {
    return (
      resultadoBusca?.tipo === 'especialidade' &&
      resultadoBusca?.nome === nome
    )
  }

  function profissionalEstaDestacado(nome) {
    return (
      resultadoBusca?.tipo === 'profissional' &&
      resultadoBusca?.nome === nome
    )
  }

  return (
    <div className="lume-site">

      <header className="header">

        <div className="header-top">

          <Link to="/" className="logo">

            <span className="logo-symbol">
              L
            </span>

            <div className="logo-text">
              <strong>Clínica Lume</strong>
              <span>Saúde e cuidado</span>
            </div>

          </Link>

          <div className="search-area">

            <form
              className="search-box"
              onSubmit={realizarBusca}
            >

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Buscar especialidade ou profissional"
                value={busca}
                onChange={(event) => {
                  setBusca(event.target.value)

                  if (mensagemBusca) {
                    setMensagemBusca('')
                  }
                }}
              />

              <button type="submit">
                Buscar
              </button>

            </form>

            {mensagemBusca && (
              <span
                className={`search-message ${
                  mensagemBusca.startsWith('Nenhuma') ||
                  mensagemBusca.startsWith('Digite')
                    ? 'erro'
                    : 'sucesso'
                }`}
              >
                {mensagemBusca}
              </span>
            )}

          </div>

          <Link
            to="/agendamento"
            className="schedule-button"
          >
            Agendar consulta
          </Link>

        </div>

        <nav className="navbar">

          <a
            href="#inicio"
            className="active"
          >
            Home
          </a>

          <a href="#clinica">
            A Clínica
          </a>

          <a href="#especialidades">
            Especialidades
          </a>

          <a href="#corpo-clinico">
            Corpo Clínico
          </a>

          <a href="#convenios">
            Convênios
          </a>

          <a href="#contato">
            Contato
          </a>

          <Link
            to="/meus-agendamentos"
            className="appointments-link"
          >
            Meus agendamentos
          </Link>

        </nav>

      </header>

      <main>

        <section
          className="hero"
          id="inicio"
        >

          <div className="hero-content">

            <span className="hero-eyebrow">
              Cuidado em cada detalhe
            </span>

            <h1>
              Sua saúde merece
              <strong>
                {' '}atenção de verdade.
              </strong>
            </h1>

            <p>
              Encontre especialistas, escolha o melhor horário
              e agende sua consulta de forma simples e rápida.
            </p>

            <div className="hero-actions">

              <Link
                to="/agendamento"
                className="hero-primary"
              >
                Agendar consulta
              </Link>

              <button
                className="hero-secondary"
                type="button"
                onClick={() =>
                  rolarParaSecao('especialidades')
                }
              >
                Conhecer especialidades
              </button>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-shape">

              <div className="hero-card">

                <span className="hero-card-icon">
                  ✦
                </span>

                <div>

                  <strong>
                    Clínica Lume
                  </strong>

                  <p>
                    Cuidado que acolhe.
                  </p>

                </div>

              </div>

              <div className="hero-circle hero-circle-one"></div>

              <div className="hero-circle hero-circle-two"></div>

              <span className="hero-cross">
                +
              </span>

            </div>

          </div>

        </section>

        <section
          className="home-section clinica-section"
          id="clinica"
        >

          <div className="section-container clinica-grid">

            <div className="clinica-content">

              <span className="section-eyebrow">
                A Clínica
              </span>

              <h2>
                Um espaço pensado para cuidar de você.
              </h2>

              <p>
                Na Clínica Lume, cuidado e acolhimento caminham
                juntos. Nosso espaço foi pensado para oferecer
                uma experiência tranquila, organizada e próxima
                em cada etapa do atendimento.
              </p>

              <p>
                Reunimos diferentes especialidades para tornar
                o cuidado com a saúde mais simples, desde o
                agendamento até o acompanhamento da consulta.
              </p>

              <Link
                to="/agendamento"
                className="section-button"
              >
                Agendar uma consulta
              </Link>

            </div>

            <div className="clinica-destaques">

              <article className="clinica-destaque">

                <span>01</span>

                <div>
                  <h3>Atendimento acolhedor</h3>

                  <p>
                    Uma experiência pensada para tornar cada
                    atendimento mais tranquilo.
                  </p>
                </div>

              </article>

              <article className="clinica-destaque">

                <span>02</span>

                <div>
                  <h3>Equipe multidisciplinar</h3>

                  <p>
                    Diferentes especialidades reunidas em um
                    único espaço.
                  </p>
                </div>

              </article>

              <article className="clinica-destaque">

                <span>03</span>

                <div>
                  <h3>Agendamento simples</h3>

                  <p>
                    Escolha especialidade, profissional, data
                    e horário em poucos passos.
                  </p>
                </div>

              </article>

            </div>

          </div>

        </section>

        <section
          className="home-section especialidades-section"
          id="especialidades"
        >

          <div className="section-container">

            <div className="section-heading">

              <span className="section-eyebrow">
                Especialidades
              </span>

              <h2>
                Cuidado para diferentes momentos.
              </h2>

              <p>
                Conheça as áreas disponíveis para atendimento
                na Clínica Lume.
              </p>

            </div>

            <div className="especialidades-grid">

              {especialidades.map((especialidade) => (

                <article
                  className={`especialidade-card ${
                    especialidadeEstaDestacada(
                      especialidade.nome
                    )
                      ? 'resultado-destacado'
                      : ''
                  }`}
                  key={especialidade.nome}
                >

                  <span className="especialidade-icone">
                    {especialidade.icone}
                  </span>

                  <h3>
                    {especialidade.nome}
                  </h3>

                  <p>
                    {especialidade.descricao}
                  </p>

                  <Link to="/agendamento">
                    Agendar consulta →
                  </Link>

                </article>

              ))}

            </div>

          </div>

        </section>

        <section
          className="home-section profissionais-section"
          id="corpo-clinico"
        >

          <div className="section-container">

            <div className="section-heading">

              <span className="section-eyebrow">
                Corpo Clínico
              </span>

              <h2>
                Profissionais preparados para acolher você.
              </h2>

              <p>
                Conheça a equipe fictícia da Clínica Lume
                utilizada neste projeto demonstrativo.
              </p>

            </div>

            <div className="profissionais-grid">

              {profissionais.map((profissional) => (

                <article
                  className={`profissional-card ${
                    profissionalEstaDestacado(
                      profissional.nome
                    )
                      ? 'resultado-destacado'
                      : ''
                  }`}
                  key={profissional.nome}
                >

                  <div className="profissional-avatar">

                    {profissional.nome
                      .replace('Dra. ', '')
                      .replace('Dr. ', '')
                      .split(' ')
                      .slice(0, 2)
                      .map((parte) => parte[0])
                      .join('')}

                  </div>

                  <div>

                    <h3>
                      {profissional.nome}
                    </h3>

                    <p>
                      {profissional.especialidade}
                    </p>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>

        <section
          className="home-section convenios-section"
          id="convenios"
        >

          <div className="section-container convenios-container">

            <div>

              <span className="section-eyebrow">
                Convênios
              </span>

              <h2>
                Atendimento particular e por convênios.
              </h2>

              <p>
                Para este projeto demonstrativo, os convênios
                abaixo são apenas exemplos fictícios de como
                essa área poderia funcionar em uma clínica real.
              </p>

            </div>

            <div className="convenios-grid">

              <div className="convenio-card">
                <strong>Lume Saúde</strong>
                <span>Convênio demonstrativo</span>
              </div>

              <div className="convenio-card">
                <strong>Vida Plena</strong>
                <span>Convênio demonstrativo</span>
              </div>

              <div className="convenio-card">
                <strong>BemCare</strong>
                <span>Convênio demonstrativo</span>
              </div>

              <div className="convenio-card">
                <strong>Essencial</strong>
                <span>Convênio demonstrativo</span>
              </div>

            </div>

          </div>

        </section>

        <section
          className="home-section contato-section"
          id="contato"
        >

          <div className="section-container contato-container">

            <div className="contato-content">

              <span className="section-eyebrow">
                Contato
              </span>

              <h2>
                Estamos aqui para cuidar de você.
              </h2>

              <p>
                Para marcar uma consulta, utilize nosso
                agendamento online. É rápido e você pode
                escolher o profissional, a data e o horário.
              </p>

              <div className="contato-actions">

                <Link
                  to="/agendamento"
                  className="section-button"
                >
                  Agendar consulta
                </Link>

                <Link
                  to="/meus-agendamentos"
                  className="section-button-secondary"
                >
                  Meus agendamentos
                </Link>

              </div>

            </div>

            <div className="contato-card">

              <span className="contato-card-label">
                Clínica Lume
              </span>

              <h3>
                Saúde e cuidado
              </h3>

              <p>
                Este site representa uma clínica fictícia
                criada para demonstrar um sistema completo
                de agendamento de consultas.
              </p>

              <div className="contato-info">

                <div>
                  <span>Atendimento</span>
                  <strong>Segunda a sexta</strong>
                </div>

                <div>
                  <span>Horários</span>
                  <strong>Conforme disponibilidade</strong>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <span className="footer-logo">
              L
            </span>

            <div>
              <strong>Clínica Lume</strong>
              <span>Saúde e cuidado</span>
            </div>

          </div>

          <p>
            Clínica Lume é um projeto fictício desenvolvido
            para fins de estudo e portfólio.
          </p>

          <Link to="/area-do-colaborador">
            Área do colaborador
          </Link>

        </div>

      </footer>

      {mostrarVoltarTopo && (
        <button
          type="button"
          className="voltar-topo"
          onClick={voltarAoTopo}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          ↑
        </button>
      )}

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/agendamento"
          element={<Agendamento />}
        />

        <Route
          path="/agendamento/profissional"
          element={<Profissional />}
        />

        <Route
          path="/agendamento/data-horario"
          element={<DataHorario />}
        />

        <Route
          path="/agendamento/dados"
          element={<DadosPaciente />}
        />

        <Route
          path="/agendamento/confirmacao"
          element={<Confirmacao />}
        />

        <Route
          path="/agendamento/sucesso"
          element={<SucessoAgendamento />}
        />

        <Route
          path="/meus-agendamentos"
          element={<MeusAgendamentos />}
        />

        <Route
          path="/area-do-colaborador"
          element={<LoginAdmin />}
        />

        <Route
          path="/admin"
          element={<PainelAdmin />}
        />

        <Route
          path="/admin/agendamentos"
          element={<AgendamentosAdmin />}
        />

        <Route
          path="/admin/pacientes"
          element={<PacientesAdmin />}
        />

        <Route
          path="/admin/profissionais"
          element={<ProfissionaisAdmin />}
        />

        <Route
          path="/admin/horarios"
          element={<HorariosAdmin />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App