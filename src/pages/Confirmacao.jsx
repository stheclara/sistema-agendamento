import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EstilosGerais.css'

function Confirmacao() {
  const location = useLocation()
  const navigate = useNavigate()

  const especialidade = location.state?.especialidade || ''
  const profissional = location.state?.profissional || ''
  const data = location.state?.data || ''
  const horario = location.state?.horario || ''

  const dadosPaciente = location.state?.dadosPaciente || {
    nome: '',
    telefone: '',
    email: '',
    nascimento: '',
  }

  const [erroAgendamento, setErroAgendamento] = useState('')

  function formatarDataConsulta(dataRecebida) {
    if (!dataRecebida) {
      return 'Não informada'
    }

    const [ano, mes, dia] = dataRecebida.split('-')

    return `${dia}/${mes}/${ano}`
  }

  function voltarParaDados() {
    navigate('/agendamento/dados', {
      state: {
        especialidade,
        profissional,
        data,
        horario,
      },
    })
  }

  function confirmarAgendamento() {
    const agendamentosSalvos = JSON.parse(
      localStorage.getItem('lumeAgendamentos') || '[]'
    )

    const horarioJaOcupado = agendamentosSalvos.some(
      (agendamento) =>
        agendamento.profissional === profissional &&
        agendamento.data === data &&
        agendamento.horario === horario &&
        agendamento.status !== 'Cancelado'
    )

    if (horarioJaOcupado) {
      setErroAgendamento(
        'Este horário acabou de ficar indisponível. Escolha outro horário.'
      )

      return
    }

    const novoAgendamento = {
      id: crypto.randomUUID(),
      especialidade,
      profissional,
      data,
      horario,
      paciente: {
        nome: dadosPaciente.nome,
        telefone: dadosPaciente.telefone,
        email: dadosPaciente.email,
        nascimento: dadosPaciente.nascimento,
      },
      status: 'Agendado',
      criadoEm: new Date().toISOString(),
    }

    const agendamentosAtualizados = [
      ...agendamentosSalvos,
      novoAgendamento,
    ]

    localStorage.setItem(
      'lumeAgendamentos',
      JSON.stringify(agendamentosAtualizados)
    )

    navigate('/agendamento/sucesso', {
      state: {
        agendamento: novoAgendamento,
      },
    })
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-container">

        <header className="agendamento-header">
          <span className="agendamento-etapa">
            Agendamento • Etapa 5 de 5
          </span>

          <h1>Revise seu agendamento</h1>

          <p>
            Confira as informações abaixo antes de confirmar
            sua consulta na Clínica Lume.
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

          <span className="progresso-item ativo">
            Seus dados
          </span>

          <span className="progresso-linha"></span>

          <span className="progresso-item ativo">
            Confirmação
          </span>
        </div>

        <section className="confirmacao-card">
          <div className="confirmacao-topo">
            <span className="confirmacao-icone">
              ✓
            </span>

            <div>
              <span className="confirmacao-label">
                Clínica Lume
              </span>

              <h2>Confira os dados da consulta</h2>

              <p>
                Se estiver tudo correto, confirme o agendamento.
              </p>
            </div>
          </div>

          <div className="confirmacao-secao">
            <h3>Consulta</h3>

            <div className="confirmacao-grid">
              <div className="confirmacao-item">
                <span>Especialidade</span>
                <strong>{especialidade || 'Não informada'}</strong>
              </div>

              <div className="confirmacao-item">
                <span>Profissional</span>
                <strong>{profissional || 'Não informado'}</strong>
              </div>

              <div className="confirmacao-item">
                <span>Data</span>
                <strong>{formatarDataConsulta(data)}</strong>
              </div>

              <div className="confirmacao-item">
                <span>Horário</span>
                <strong>{horario || 'Não informado'}</strong>
              </div>
            </div>
          </div>

          <div className="confirmacao-secao">
            <h3>Paciente</h3>

            <div className="confirmacao-grid">
              <div className="confirmacao-item">
                <span>Nome</span>
                <strong>{dadosPaciente.nome || 'Não informado'}</strong>
              </div>

              <div className="confirmacao-item">
                <span>Telefone</span>
                <strong>{dadosPaciente.telefone || 'Não informado'}</strong>
              </div>

              <div className="confirmacao-item">
                <span>Data de nascimento</span>
                <strong>{dadosPaciente.nascimento || 'Não informada'}</strong>
              </div>

              <div className="confirmacao-item">
                <span>E-mail</span>
                <strong>{dadosPaciente.email || 'Não informado'}</strong>
              </div>
            </div>
          </div>
        </section>

        {erroAgendamento && (
          <p className="agendamento-erro">
            {erroAgendamento}
          </p>
        )}

        <div className="agendamento-acoes">
          <button
            className="voltar-button"
            type="button"
            onClick={voltarParaDados}
          >
            ← Voltar
          </button>

          <button
            className="continuar-button"
            type="button"
            onClick={confirmarAgendamento}
          >
            Confirmar agendamento ✓
          </button>
        </div>

      </section>
    </main>
  )
}

export default Confirmacao