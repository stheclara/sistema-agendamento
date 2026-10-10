import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

function carregarAgendamentos() {
  try {
    return JSON.parse(
      localStorage.getItem('lumeAgendamentos') || '[]'
    )
  } catch {
    return []
  }
}

function PacientesAdmin() {
  const navigate = useNavigate()

  const [agendamentos] = useState(
    carregarAgendamentos
  )

  const [busca, setBusca] = useState('')

  useEffect(() => {
    const estaAutenticado =
      sessionStorage.getItem('lumeAdminAutenticado') === 'true'

    if (!estaAutenticado) {
      navigate('/area-do-colaborador', {
        replace: true,
      })
    }
  }, [navigate])

  function abrirPainel() {
    navigate('/admin')
  }

  function abrirAgendamentos() {
    navigate('/admin/agendamentos')
  }

  function abrirProfissionais() {
    navigate('/admin/profissionais')
  }

  function abrirHorarios() {
    navigate('/admin/horarios')
  }

  function voltarParaHome() {
    navigate('/')
  }

  function sairDoSistema() {
    sessionStorage.removeItem('lumeAdminAutenticado')

    navigate('/area-do-colaborador', {
      replace: true,
    })
  }

  const pacientesMap = new Map()

  agendamentos.forEach((agendamento) => {
    const paciente = agendamento.paciente

    if (!paciente) {
      return
    }

    const email =
      paciente.email?.trim().toLowerCase() || ''

    const telefone =
      paciente.telefone?.trim() || ''

    const nome =
      paciente.nome?.trim() || 'Não informado'

    const identificador =
      email ||
      telefone ||
      nome.toLowerCase()

    if (!pacientesMap.has(identificador)) {
      pacientesMap.set(identificador, {
        id: identificador,
        nome,
        telefone: telefone || 'Não informado',
        email: paciente.email || 'Não informado',
        nascimento:
          paciente.nascimento || 'Não informado',
        totalConsultas: 0,
      })
    }

    const pacienteSalvo =
      pacientesMap.get(identificador)

    pacienteSalvo.totalConsultas += 1
  })

  const pacientes =
    Array.from(pacientesMap.values())

  const termoBusca =
    busca.trim().toLowerCase()

  const pacientesFiltrados = pacientes
    .filter((paciente) => {
      if (termoBusca === '') {
        return true
      }

      return (
        paciente.nome
          .toLowerCase()
          .includes(termoBusca) ||
        paciente.email
          .toLowerCase()
          .includes(termoBusca) ||
        paciente.telefone
          .toLowerCase()
          .includes(termoBusca)
      )
    })
    .sort((a, b) =>
      a.nome.localeCompare(b.nome)
    )

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="admin-logo-symbol">
            L
          </span>

          <div className="admin-logo-texto">
            <strong>Clínica Lume</strong>
            <span>Administração</span>
          </div>
        </div>

        <nav className="admin-menu">
          <button
            type="button"
            className="admin-menu-item"
            onClick={abrirPainel}
          >
            Painel
          </button>

          <button
            type="button"
            className="admin-menu-item"
            onClick={abrirAgendamentos}
          >
            Agendamentos
          </button>

          <button
            type="button"
            className="admin-menu-item ativo"
          >
            Pacientes
          </button>

          <button
            type="button"
            className="admin-menu-item"
            onClick={abrirProfissionais}
          >
            Profissionais
          </button>

          <button
            type="button"
            className="admin-menu-item"
            onClick={abrirHorarios}
          >
            Horários
          </button>
        </nav>

        <div className="admin-sidebar-acoes">
          <button
            className="admin-voltar"
            type="button"
            onClick={voltarParaHome}
          >
            ← Voltar para o site
          </button>

          <button
            className="admin-sair"
            type="button"
            onClick={sairDoSistema}
          >
            Sair
          </button>
        </div>
      </aside>

      <section className="admin-conteudo">
        <header className="admin-header">
          <span className="admin-label">
            Administração
          </span>

          <h1>Pacientes</h1>

          <p>
            Consulte os pacientes que possuem
            agendamentos registrados na Clínica Lume.
          </p>
        </header>

        <section className="admin-filtros">
          <div className="admin-busca">
            <label htmlFor="busca-paciente">
              Buscar paciente
            </label>

            <input
              id="busca-paciente"
              type="text"
              placeholder="Nome, e-mail ou telefone"
              value={busca}
              onChange={(event) =>
                setBusca(event.target.value)
              }
            />
          </div>
        </section>

        <section className="admin-agendamentos">
          <div className="admin-secao-titulo">
            <div>
              <h2>Pacientes cadastrados</h2>

              <p>
                {pacientesFiltrados.length}{' '}
                {pacientesFiltrados.length === 1
                  ? 'paciente encontrado'
                  : 'pacientes encontrados'}
              </p>
            </div>
          </div>

          {pacientesFiltrados.length === 0 ? (
            <div className="admin-vazio">
              <p>
                Nenhum paciente foi encontrado.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-tabela-container admin-tabela-desktop">
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Telefone</th>
                      <th>E-mail</th>
                      <th>Nascimento</th>
                      <th>Consultas</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pacientesFiltrados.map(
                      (paciente) => (
                        <tr key={paciente.id}>
                          <td>
                            {paciente.nome}
                          </td>

                          <td>
                            {paciente.telefone}
                          </td>

                          <td>
                            {paciente.email}
                          </td>

                          <td>
                            {paciente.nascimento}
                          </td>

                          <td>
                            {paciente.totalConsultas}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="admin-agendamentos-mobile">
                {pacientesFiltrados.map(
                  (paciente) => (
                    <article
                      className="admin-agendamento-card"
                      key={paciente.id}
                    >
                      <div className="admin-agendamento-card-topo">
                        <div>
                          <span className="admin-card-label">
                            Paciente
                          </span>

                          <strong>
                            {paciente.nome}
                          </strong>
                        </div>
                      </div>

                      <div className="admin-agendamento-card-info">
                        <div>
                          <span className="admin-card-label">
                            Telefone
                          </span>

                          <strong>
                            {paciente.telefone}
                          </strong>
                        </div>

                        <div>
                          <span className="admin-card-label">
                            Nascimento
                          </span>

                          <strong>
                            {paciente.nascimento}
                          </strong>
                        </div>

                        <div>
                          <span className="admin-card-label">
                            E-mail
                          </span>

                          <strong>
                            {paciente.email}
                          </strong>
                        </div>

                        <div>
                          <span className="admin-card-label">
                            Consultas
                          </span>

                          <strong>
                            {paciente.totalConsultas}
                          </strong>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  )
}

export default PacientesAdmin