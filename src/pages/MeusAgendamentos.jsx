import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EstilosGerais.css'

function carregarAgendamentos() {
  try {
    return JSON.parse(
      localStorage.getItem('lumeAgendamentos') || '[]'
    )
  } catch {
    return []
  }
}

function MeusAgendamentos() {
  const navigate = useNavigate()

  const [agendamentos, setAgendamentos] = useState(
    carregarAgendamentos
  )

  function formatarData(dataRecebida) {
    if (!dataRecebida) {
      return 'Data não informada'
    }

    const [ano, mes, dia] = dataRecebida.split('-')

    return `${dia}/${mes}/${ano}`
  }

  function cancelarAgendamento(id) {
    const confirmarCancelamento = window.confirm(
      'Tem certeza que deseja cancelar este agendamento?'
    )

    if (!confirmarCancelamento) {
      return
    }

    const agendamentosAtualizados = agendamentos.map(
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

    localStorage.setItem(
      'lumeAgendamentos',
      JSON.stringify(agendamentosAtualizados)
    )

    setAgendamentos(agendamentosAtualizados)
  }

  function obterClasseStatus(status) {
    if (status === 'Cancelado') {
      return 'cancelado'
    }

    if (status === 'Concluído') {
      return 'concluido'
    }

    return ''
  }

  function voltarParaHome() {
    navigate('/')
  }

  function novoAgendamento() {
    navigate('/agendamento')
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-container">

        <header className="agendamento-header">
          <span className="agendamento-etapa">
            Clínica Lume
          </span>

          <h1>Meus agendamentos</h1>

          <p>
            Consulte suas consultas agendadas e acompanhe
            o status de cada atendimento.
          </p>
        </header>

        {agendamentos.length === 0 ? (
          <section className="meus-agendamentos-vazio">

            <span className="meus-agendamentos-vazio-icone">
              +
            </span>

            <h2>
              Nenhum agendamento encontrado
            </h2>

            <p>
              Você ainda não possui consultas agendadas
              na Clínica Lume.
            </p>

            <button
              className="continuar-button"
              type="button"
              onClick={novoAgendamento}
            >
              Agendar consulta
            </button>

          </section>
        ) : (
          <section className="meus-agendamentos-lista">

            {agendamentos.map((agendamento) => (
              <article
                className="meu-agendamento-card"
                key={agendamento.id}
              >

                <div className="meu-agendamento-topo">

                  <div>

                    <span className="meu-agendamento-especialidade">
                      {agendamento.especialidade}
                    </span>

                    <h2>
                      {agendamento.profissional}
                    </h2>

                  </div>

                  <span
                    className={`meu-agendamento-status ${obterClasseStatus(
                      agendamento.status
                    )}`}
                  >
                    {agendamento.status}
                  </span>

                </div>

                <div className="meu-agendamento-informacoes">

                  <div>

                    <span>Data</span>

                    <strong>
                      {formatarData(
                        agendamento.data
                      )}
                    </strong>

                  </div>

                  <div>

                    <span>Horário</span>

                    <strong>
                      {agendamento.horario}
                    </strong>

                  </div>

                  <div>

                    <span>Paciente</span>

                    <strong>
                      {agendamento.paciente?.nome ||
                        'Não informado'}
                    </strong>

                  </div>

                </div>

                {agendamento.status === 'Agendado' && (
                  <div className="meu-agendamento-acoes">

                    <button
                      className="cancelar-agendamento-button"
                      type="button"
                      onClick={() =>
                        cancelarAgendamento(
                          agendamento.id
                        )
                      }
                    >
                      Cancelar agendamento
                    </button>

                  </div>
                )}

              </article>
            ))}

          </section>
        )}

        <div className="agendamento-acoes">

          <button
            className="voltar-button"
            type="button"
            onClick={voltarParaHome}
          >
            ← Voltar para o início
          </button>

          <button
            className="continuar-button"
            type="button"
            onClick={novoAgendamento}
          >
            + Novo agendamento
          </button>

        </div>

        <p className="projeto-aviso">
          Clínica Lume é um projeto fictício desenvolvido
          para fins de estudo e portfólio.
        </p>

      </section>
    </main>
  )
}

export default MeusAgendamentos