import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EstilosGerais.css'

const disponibilidadePadrao = {
  'Dra. Helena Martins': {
    'Segunda-feira': ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    'Terça-feira': ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    'Quarta-feira': ['08:00', '09:00', '10:00', '13:00', '14:00'],
    'Quinta-feira': ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    'Sexta-feira': ['08:00', '09:00', '10:00', '11:00'],
  },

  'Dr. Rafael Almeida': {
    'Segunda-feira': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    'Terça-feira': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    'Quarta-feira': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'Quinta-feira': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    'Sexta-feira': ['09:00', '10:00', '11:00', '13:00', '14:00'],
  },

  'Dr. Lucas Ferreira': {
    'Segunda-feira': ['08:00', '09:00', '10:00', '14:00', '15:00'],
    'Terça-feira': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'Quarta-feira': ['08:00', '09:00', '10:00', '11:00'],
    'Quinta-feira': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'Sexta-feira': ['08:00', '09:00', '10:00', '11:00'],
  },

  'Dra. Marina Costa': {
    'Segunda-feira': ['13:00', '14:00', '15:00', '16:00'],
    'Terça-feira': ['08:00', '09:00', '10:00', '11:00', '13:00'],
    'Quarta-feira': ['13:00', '14:00', '15:00', '16:00'],
    'Quinta-feira': ['08:00', '09:00', '10:00', '11:00', '13:00'],
    'Sexta-feira': ['13:00', '14:00', '15:00', '16:00'],
  },

  'Dra. Laura Mendes': {
    'Segunda-feira': ['09:00', '10:00', '11:00', '13:00', '14:00'],
    'Terça-feira': ['09:00', '10:00', '11:00', '13:00', '14:00'],
    'Quarta-feira': ['14:00', '15:00', '16:00', '17:00'],
    'Quinta-feira': ['09:00', '10:00', '11:00', '13:00', '14:00'],
    'Sexta-feira': ['09:00', '10:00', '11:00'],
  },

  'Dr. André Ribeiro': {
    'Segunda-feira': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'Terça-feira': ['08:00', '09:00', '10:00', '11:00'],
    'Quarta-feira': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'Quinta-feira': ['08:00', '09:00', '10:00', '11:00'],
    'Sexta-feira': ['13:00', '14:00', '15:00', '16:00'],
  },

  'Dra. Camila Nogueira': {
    'Segunda-feira': ['08:00', '09:00', '10:00', '11:00', '13:00'],
    'Terça-feira': ['13:00', '14:00', '15:00', '16:00'],
    'Quarta-feira': ['08:00', '09:00', '10:00', '11:00', '13:00'],
    'Quinta-feira': ['13:00', '14:00', '15:00', '16:00'],
    'Sexta-feira': ['08:00', '09:00', '10:00', '11:00'],
  },

  'Dra. Beatriz Lima': {
    'Segunda-feira': ['13:00', '14:00', '15:00', '16:00'],
    'Terça-feira': ['08:00', '09:00', '10:00', '11:00'],
    'Quarta-feira': ['13:00', '14:00', '15:00', '16:00'],
    'Quinta-feira': ['08:00', '09:00', '10:00', '11:00'],
    'Sexta-feira': ['13:00', '14:00', '15:00'],
  },

  'Dra. Sofia Carvalho': {
    'Segunda-feira': ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    'Terça-feira': ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    'Quarta-feira': ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    'Quinta-feira': ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    'Sexta-feira': ['08:00', '09:00', '10:00', '11:00'],
  },

  'Dr. Gabriel Rocha': {
    'Segunda-feira': ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    'Terça-feira': ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    'Quarta-feira': ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    'Quinta-feira': ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    'Sexta-feira': ['10:00', '11:00', '13:00', '14:00', '15:00'],
  },

  'Isabela Freitas': {
    'Segunda-feira': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    'Terça-feira': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    'Quarta-feira': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    'Quinta-feira': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    'Sexta-feira': ['09:00', '10:00', '11:00', '14:00'],
  },

  'Daniel Moreira': {
    'Segunda-feira': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'Terça-feira': ['08:00', '09:00', '10:00', '11:00', '13:00'],
    'Quarta-feira': ['13:00', '14:00', '15:00', '16:00', '17:00'],
    'Quinta-feira': ['08:00', '09:00', '10:00', '11:00', '13:00'],
    'Sexta-feira': ['13:00', '14:00', '15:00', '16:00'],
  },
}

function criarDataAtual() {
  return new Date()
}

function DataHorario() {
  const location = useLocation()
  const navigate = useNavigate()

  const especialidade =
    location.state?.especialidade || ''

  const profissional =
    location.state?.profissional || ''

  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horarioSelecionado, setHorarioSelecionado] = useState('')
  const [dataReferencia] = useState(criarDataAtual)

  function buscarDisponibilidade() {
    try {
      const disponibilidades = JSON.parse(
        localStorage.getItem('lumeDisponibilidade') || '{}'
      )

      if (
        Object.prototype.hasOwnProperty.call(
          disponibilidades,
          profissional
        )
      ) {
        return disponibilidades[profissional]
      }

      return disponibilidadePadrao[profissional] || {}
    } catch {
      return disponibilidadePadrao[profissional] || {}
    }
  }

  const disponibilidadeProfissional =
    buscarDisponibilidade()

  function obterNomeDiaSemana(data) {
    const diasSemana = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ]

    return diasSemana[data.getDay()]
  }

  function criarDatasDisponiveis() {
    const datas = []

    let diasAdicionados = 0
    let diasVerificados = 1

    while (
      diasAdicionados < 7 &&
      diasVerificados <= 60
    ) {
      const data = new Date(dataReferencia)

      data.setDate(
        dataReferencia.getDate() + diasVerificados
      )

      const nomeDiaSemana =
        obterNomeDiaSemana(data)

      const horariosDoDia =
        disponibilidadeProfissional[nomeDiaSemana] || []

      if (horariosDoDia.length > 0) {
        const diaSemana =
          data.toLocaleDateString('pt-BR', {
            weekday: 'short',
          })

        const dia =
          data.toLocaleDateString('pt-BR', {
            day: '2-digit',
          })

        const mes =
          data.toLocaleDateString('pt-BR', {
            month: 'short',
          })

        const ano =
          data.getFullYear()

        const numeroMes = String(
          data.getMonth() + 1
        ).padStart(2, '0')

        const numeroDia = String(
          data.getDate()
        ).padStart(2, '0')

        const valor =
          `${ano}-${numeroMes}-${numeroDia}`

        datas.push({
          valor,
          diaSemana:
            diaSemana.replace('.', ''),
          dia,
          mes:
            mes.replace('.', ''),
          nomeDiaSemana,
        })

        diasAdicionados++
      }

      diasVerificados++
    }

    return datas
  }

  const datasDisponiveis =
    criarDatasDisponiveis()

  function buscarAgendamentos() {
    try {
      return JSON.parse(
        localStorage.getItem('lumeAgendamentos') || '[]'
      )
    } catch {
      return []
    }
  }

  function obterHorariosDaDataSelecionada() {
    if (!dataSelecionada) {
      return []
    }

    const dataEncontrada =
      datasDisponiveis.find(
        (data) =>
          data.valor === dataSelecionada
      )

    if (!dataEncontrada) {
      return []
    }

    return (
      disponibilidadeProfissional[
        dataEncontrada.nomeDiaSemana
      ] || []
    )
  }

  const horariosDaDataSelecionada =
    obterHorariosDaDataSelecionada()

  function horarioEstaOcupado(horario) {
    if (!dataSelecionada || !profissional) {
      return false
    }

    const agendamentosSalvos =
      buscarAgendamentos()

    return agendamentosSalvos.some(
      (agendamento) =>
        agendamento.profissional === profissional &&
        agendamento.data === dataSelecionada &&
        agendamento.horario === horario &&
        agendamento.status !== 'Cancelado'
    )
  }

  function selecionarData(data) {
    setDataSelecionada(data)
    setHorarioSelecionado('')
  }

  function selecionarHorario(horario) {
    if (horarioEstaOcupado(horario)) {
      return
    }

    setHorarioSelecionado(horario)
  }

  function voltarParaProfissional() {
    navigate('/agendamento/profissional', {
      state: {
        especialidade,
      },
    })
  }

  function continuarAgendamento() {
    if (
      !dataSelecionada ||
      !horarioSelecionado
    ) {
      return
    }

    navigate('/agendamento/dados', {
      state: {
        especialidade,
        profissional,
        data: dataSelecionada,
        horario: horarioSelecionado,
      },
    })
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-container">
        <header className="agendamento-header">
          <span className="agendamento-etapa">
            Agendamento • Etapa 3 de 5
          </span>

          <h1>Escolha a data e o horário</h1>

          <p>
            Selecione uma data disponível e o melhor horário
            para sua consulta.
          </p>
        </header>

        <div className="agendamento-progresso">
          <span className="progresso-item ativo">
            Especialidade
          </span>

          <span className="progresso-linha"></span>

          <span className="progresso-item ativo">
            Profissional
          </span>

          <span className="progresso-linha"></span>

          <span className="progresso-item ativo">
            Data e horário
          </span>

          <span className="progresso-linha"></span>

          <span className="progresso-item">
            Seus dados
          </span>

          <span className="progresso-linha"></span>

          <span className="progresso-item">
            Confirmação
          </span>
        </div>

        <section className="consulta-resumo">
          <div>
            <span>Especialidade</span>

            <strong>
              {especialidade || 'Não informada'}
            </strong>
          </div>

          <div>
            <span>Profissional</span>

            <strong>
              {profissional || 'Não informado'}
            </strong>
          </div>
        </section>

        <section className="data-horario-section">
          <div className="data-horario-titulo">
            <span className="data-horario-numero">
              1
            </span>

            <div>
              <h2>Escolha uma data</h2>

              <p>
                Selecione um dos próximos dias disponíveis.
              </p>
            </div>
          </div>

          {datasDisponiveis.length === 0 ? (
            <p>
              Este profissional ainda não possui horários
              disponíveis para agendamento.
            </p>
          ) : (
            <div className="datas-grid">
              {datasDisponiveis.map((data) => (
                <button
                  key={data.valor}
                  type="button"
                  className={`data-card ${
                    dataSelecionada === data.valor
                      ? 'selecionada'
                      : ''
                  }`}
                  onClick={() =>
                    selecionarData(data.valor)
                  }
                >
                  <span className="data-semana">
                    {data.diaSemana}
                  </span>

                  <strong>
                    {data.dia}
                  </strong>

                  <span className="data-mes">
                    {data.mes}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="data-horario-section">
          <div className="data-horario-titulo">
            <span className="data-horario-numero">
              2
            </span>

            <div>
              <h2>Escolha um horário</h2>

              <p>
                {dataSelecionada
                  ? 'Horários disponíveis para a data selecionada.'
                  : 'Escolha uma data para visualizar os horários.'}
              </p>
            </div>
          </div>

          {dataSelecionada &&
          horariosDaDataSelecionada.length === 0 ? (
            <p>
              Não há horários disponíveis para esta data.
            </p>
          ) : (
            <div className="horarios-grid">
              {horariosDaDataSelecionada.map(
                (horario) => {
                  const ocupado =
                    horarioEstaOcupado(horario)

                  return (
                    <button
                      key={horario}
                      type="button"
                      disabled={ocupado}
                      className={`horario-card ${
                        horarioSelecionado === horario
                          ? 'selecionado'
                          : ''
                      }`}
                      onClick={() =>
                        selecionarHorario(horario)
                      }
                    >
                      {horario}
                    </button>
                  )
                }
              )}
            </div>
          )}
        </section>

        <div className="agendamento-acoes">
          <button
            className="voltar-button"
            type="button"
            onClick={voltarParaProfissional}
          >
            ← Voltar
          </button>

          <button
            className="continuar-button"
            type="button"
            disabled={
              !dataSelecionada ||
              !horarioSelecionado
            }
            onClick={continuarAgendamento}
          >
            Continuar →
          </button>
        </div>
      </section>
    </main>
  )
}

export default DataHorario