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

function PainelAdmin() {
  const navigate = useNavigate()

  const [agendamentos] = useState(
    carregarAgendamentos
  )

  useEffect(() => {
    const estaAutenticado =
      sessionStorage.getItem('lumeAdminAutenticado') === 'true'

    if (!estaAutenticado) {
      navigate('/area-do-colaborador', {
        replace: true,
      })
    }
  }, [navigate])

  function contarPorStatus(status) {
    return agendamentos.filter(
      (agendamento) => agendamento.status === status
    ).length
  }

  function formatarData(dataRecebida) {
    if (!dataRecebida) {
      return 'Não informada'
    }

    const [ano, mes, dia] = dataRecebida.split('-')

    return `${dia}/${mes}/${ano}`
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

  function abrirAgendamentos() {
    navigate('/admin/agendamentos')
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

  const totalAgendamentos = agendamentos.length

  const totalAgendados =
    contarPorStatus('Agendado')

  const totalCancelados =
    contarPorStatus('Cancelado')

  const totalConcluidos =
    contarPorStatus('Concluído')

  const agendamentosRecentes =
    [...agendamentos]
      .reverse()
      .slice(0, 5)

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
            className="admin-menu-item ativo"
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

            <h1>Painel da Clínica Lume</h1>

            <p>
              Acompanhe os agendamentos e as principais
              informações da clínica.
            </p>

          </div>

        </header>

        <section className="admin-resumo">

          <article className="admin-resumo-card">

            <span>Total de agendamentos</span>

            <strong>
              {totalAgendamentos}
            </strong>

            <p>
              Registros realizados
            </p>

          </article>

          <article className="admin-resumo-card">

            <span>Agendados</span>

            <strong>
              {totalAgendados}
            </strong>

            <p>
              Consultas ativas
            </p>

          </article>

          <article className="admin-resumo-card">

            <span>Concluídos</span>

            <strong>
              {totalConcluidos}
            </strong>

            <p>
              Atendimentos finalizados
            </p>

          </article>

          <article className="admin-resumo-card">

            <span>Cancelados</span>

            <strong>
              {totalCancelados}
            </strong>

            <p>
              Consultas canceladas
            </p>

          </article>

        </section>

        <section className="admin-agendamentos">

          <div className="admin-secao-titulo">

            <div>

              <h2>Agendamentos recentes</h2>

              <p>
                Últimos registros realizados no sistema.
              </p>

            </div>

          </div>

          {agendamentos.length === 0 ? (

            <div className="admin-vazio">

              <p>
                Nenhum agendamento foi encontrado.
              </p>

            </div>

          ) : (

            <>

              <div className="admin-tabela-container admin-tabela-desktop">

                <table className="admin-tabela">

                  <thead>

                    <tr>
                      <th>Paciente</th>
                      <th>Especialidade</th>
                      <th>Profissional</th>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {agendamentosRecentes.map(
                      (agendamento) => (

                        <tr key={agendamento.id}>

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
                            {formatarData(
                              agendamento.data
                            )}
                          </td>

                          <td>
                            {agendamento.horario}
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

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

              <div className="admin-agendamentos-mobile">

                {agendamentosRecentes.map(
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

export default PainelAdmin