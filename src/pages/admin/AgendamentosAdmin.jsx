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

function criarDataAtual() {
  return new Date()
}

function obterClasseStatus(status) {
  if (status === 'Cancelado') {
    return 'cancelado'
  }

  if (status === 'Concluído') {
    return 'concluido'
  }

  return 'agendado'
}

function AgendamentosAdmin() {
  const navigate = useNavigate()

  const [agendamentos, setAgendamentos] = useState(
    carregarAgendamentos
  )

  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('Todos')
  const [dataReferencia] = useState(criarDataAtual)

  useEffect(() => {
    const estaAutenticado =
      sessionStorage.getItem('lumeAdminAutenticado') === 'true'

    if (!estaAutenticado) {
      navigate('/area-do-colaborador', {
        replace: true,
      })
    }
  }, [navigate])

  function salvarAgendamentos(novosAgendamentos) {
    localStorage.setItem(
      'lumeAgendamentos',
      JSON.stringify(novosAgendamentos)
    )

    setAgendamentos(novosAgendamentos)
  }

  function consultaJaPodeSerFinalizada(agendamento) {
    if (!agendamento.data || !agendamento.horario) {
      return false
    }

    const dataHorarioConsulta = new Date(
      `${agendamento.data}T${agendamento.horario}:00`
    )

    return dataHorarioConsulta <= dataReferencia
  }

  function finalizarAtendimento(id) {
    const agendamentoSelecionado = agendamentos.find(
      (agendamento) => agendamento.id === id
    )

    if (!agendamentoSelecionado) {
      return
    }

    if (!consultaJaPodeSerFinalizada(agendamentoSelecionado)) {
      window.alert(
        'Este atendimento ainda não pode ser finalizado, pois a consulta ainda não aconteceu.'
      )

      return
    }

    const desejaFinalizar = window.confirm(
      'Deseja marcar este atendimento como concluído?'
    )

    if (!desejaFinalizar) {
      return
    }

    const novosAgendamentos = agendamentos.map(
      (agendamento) => {
        if (agendamento.id === id) {
          return {
            ...agendamento,
            status: 'Concluído',
          }
        }

        return agendamento
      }
    )

    salvarAgendamentos(novosAgendamentos)
  }

  function cancelarAgendamento(id) {
    const desejaCancelar = window.confirm(
      'Tem certeza que deseja cancelar este agendamento?'
    )

    if (!desejaCancelar) {
      return
    }

    const novosAgendamentos = agendamentos.map(
      (agendamento) => {
        if (agendamento.id === id) {
          return {
            ...agendamento,
            status: 'Cancelado',
          }
        }

        return agendamento
      }
    )

    salvarAgendamentos(novosAgendamentos)
  }

  function formatarData(dataRecebida) {
    if (!dataRecebida) {
      return 'Não informada'
    }

    const [ano, mes, dia] = dataRecebida.split('-')

    return `${dia}/${mes}/${ano}`
  }

  function abrirPainel() {
    navigate('/admin')
  }

  function abrirPacientes() {
    navigate('/admin/pacientes')
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

  const agendamentosFiltrados = agendamentos.filter(
    (agendamento) => {
      const termoBusca = busca.trim().toLowerCase()

      const paciente =
        agendamento.paciente?.nome?.toLowerCase() || ''

      const profissional =
        agendamento.profissional?.toLowerCase() || ''

      const especialidade =
        agendamento.especialidade?.toLowerCase() || ''

      const correspondeBusca =
        termoBusca === '' ||
        paciente.includes(termoBusca) ||
        profissional.includes(termoBusca) ||
        especialidade.includes(termoBusca)

      const correspondeStatus =
        filtroStatus === 'Todos' ||
        agendamento.status === filtroStatus

      return correspondeBusca && correspondeStatus
    }
  )

  const agendamentosOrdenados =
    [...agendamentosFiltrados].sort((a, b) => {
      const dataA =
        `${a.data || ''} ${a.horario || ''}`

      const dataB =
        `${b.data || ''} ${b.horario || ''}`

      return dataA.localeCompare(dataB)
    })

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
            className="admin-menu-item ativo"
          >
            Agendamentos
          </button>

          <button
            type="button"
            className="admin-menu-item"
            onClick={abrirPacientes}
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
          <div>
            <span className="admin-label">
              Administração
            </span>

            <h1>Agendamentos</h1>

            <p>
              Consulte e acompanhe os agendamentos
              realizados na Clínica Lume.
            </p>
          </div>
        </header>

        <section className="admin-filtros">
          <div className="admin-busca">
            <label htmlFor="busca-agendamento">
              Buscar
            </label>

            <input
              id="busca-agendamento"
              type="text"
              placeholder="Paciente, profissional ou especialidade"
              value={busca}
              onChange={(event) =>
                setBusca(event.target.value)
              }
            />
          </div>

          <div className="admin-filtro-status">
            <label htmlFor="filtro-status">
              Status
            </label>

            <select
              id="filtro-status"
              value={filtroStatus}
              onChange={(event) =>
                setFiltroStatus(event.target.value)
              }
            >
              <option value="Todos">
                Todos
              </option>

              <option value="Agendado">
                Agendado
              </option>

              <option value="Concluído">
                Concluído
              </option>

              <option value="Cancelado">
                Cancelado
              </option>
            </select>
          </div>
        </section>

        <section className="admin-agendamentos">
          <div className="admin-secao-titulo">
            <div>
              <h2>Consultas</h2>

              <p>
                {agendamentosOrdenados.length}{' '}
                {agendamentosOrdenados.length === 1
                  ? 'agendamento encontrado'
                  : 'agendamentos encontrados'}
              </p>
            </div>
          </div>

          {agendamentosOrdenados.length === 0 ? (
            <div className="admin-vazio">
              <p>
                Nenhum agendamento corresponde aos
                filtros selecionados.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-tabela-container admin-tabela-desktop">
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Paciente</th>
                      <th>Especialidade</th>
                      <th>Profissional</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {agendamentosOrdenados.map(
                      (agendamento) => (
                        <tr key={agendamento.id}>
                          <td>
                            {formatarData(
                              agendamento.data
                            )}
                          </td>

                          <td>
                            {agendamento.horario}
                          </td>

                          <td>
                            {agendamento.paciente?.nome ||
                              'Não informado'}
                          </td>

                          <td>
                            {agendamento.especialidade}
                          </td>

                          <td>
                            {agendamento.profissional}
                          </td>

                          <td>
                            <span
                              className={`admin-status ${obterClasseStatus(
                                agendamento.status
                              )}`}
                            >
                              {agendamento.status}
                            </span>
                          </td>

                          <td>
                            {agendamento.status === 'Agendado' ? (
                              <div className="admin-acoes-agendamento">
                                {consultaJaPodeSerFinalizada(
                                  agendamento
                                ) && (
                                  <button
                                    type="button"
                                    className="admin-acao concluir"
                                    onClick={() =>
                                      finalizarAtendimento(
                                        agendamento.id
                                      )
                                    }
                                  >
                                    Finalizar atendimento
                                  </button>
                                )}

                                <button
                                  type="button"
                                  className="admin-acao cancelar"
                                  onClick={() =>
                                    cancelarAgendamento(
                                      agendamento.id
                                    )
                                  }
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <span className="admin-sem-acoes">
                                —
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="admin-agendamentos-mobile">
                {agendamentosOrdenados.map(
                  (agendamento) => (
                    <article
                      className="admin-agendamento-card"
                      key={agendamento.id}
                    >
                      <div className="admin-agendamento-card-topo">
                        <div>
                          <span className="admin-card-label">
                            Paciente
                          </span>

                          <strong>
                            {agendamento.paciente?.nome ||
                              'Não informado'}
                          </strong>
                        </div>

                        <span
                          className={`admin-status ${obterClasseStatus(
                            agendamento.status
                          )}`}
                        >
                          {agendamento.status}
                        </span>
                      </div>

                      <div className="admin-agendamento-card-info">
                        <div>
                          <span className="admin-card-label">
                            Especialidade
                          </span>

                          <strong>
                            {agendamento.especialidade}
                          </strong>
                        </div>

                        <div>
                          <span className="admin-card-label">
                            Profissional
                          </span>

                          <strong>
                            {agendamento.profissional}
                          </strong>
                        </div>

                        <div>
                          <span className="admin-card-label">
                            Data
                          </span>

                          <strong>
                            {formatarData(
                              agendamento.data
                            )}
                          </strong>
                        </div>

                        <div>
                          <span className="admin-card-label">
                            Horário
                          </span>

                          <strong>
                            {agendamento.horario}
                          </strong>
                        </div>
                      </div>

                      {agendamento.status === 'Agendado' && (
                        <div className="admin-agendamento-card-acoes">
                          {consultaJaPodeSerFinalizada(
                            agendamento
                          ) && (
                            <button
                              type="button"
                              className="admin-acao concluir"
                              onClick={() =>
                                finalizarAtendimento(
                                  agendamento.id
                                )
                              }
                            >
                              Finalizar atendimento
                            </button>
                          )}

                          <button
                            type="button"
                            className="admin-acao cancelar"
                            onClick={() =>
                              cancelarAgendamento(
                                agendamento.id
                              )
                            }
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
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

export default AgendamentosAdmin