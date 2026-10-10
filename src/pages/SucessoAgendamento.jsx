import { useLocation, useNavigate } from 'react-router-dom'
import './EstilosGerais.css'

function SucessoAgendamento() {
  const location = useLocation()
  const navigate = useNavigate()

  const agendamento = location.state?.agendamento

  function formatarData(dataRecebida) {
    if (!dataRecebida) {
      return 'Não informada'
    }

    const [ano, mes, dia] = dataRecebida.split('-')

    return `${dia}/${mes}/${ano}`
  }

  function irParaHome() {
    navigate('/')
  }

  function verAgendamentos() {
    navigate('/meus-agendamentos')
  }

  if (!agendamento) {
    return (
      <main className="agendamento-page">
        <section className="agendamento-container">

          <div className="sucesso-card">
            <span className="sucesso-icone">
              !
            </span>

            <h1>Agendamento não encontrado</h1>

            <p>
              Não foi possível localizar as informações
              deste agendamento.
            </p>

            <button
              className="continuar-button"
              type="button"
              onClick={irParaHome}
            >
              Voltar para a página inicial
            </button>
          </div>

        </section>
      </main>
    )
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-container">

        <div className="sucesso-card">

          <span className="sucesso-icone">
            ✓
          </span>

          <span className="sucesso-label">
            Clínica Lume
          </span>

          <h1>Consulta agendada!</h1>

          <p className="sucesso-descricao">
            Seu agendamento foi realizado com sucesso.
            Confira abaixo os principais detalhes da consulta.
          </p>

          <div className="sucesso-resumo">

            <div className="sucesso-item">
              <span>Especialidade</span>

              <strong>
                {agendamento.especialidade}
              </strong>
            </div>

            <div className="sucesso-item">
              <span>Profissional</span>

              <strong>
                {agendamento.profissional}
              </strong>
            </div>

            <div className="sucesso-item">
              <span>Data</span>

              <strong>
                {formatarData(agendamento.data)}
              </strong>
            </div>

            <div className="sucesso-item">
              <span>Horário</span>

              <strong>
                {agendamento.horario}
              </strong>
            </div>

            <div className="sucesso-item">
              <span>Paciente</span>

              <strong>
                {agendamento.paciente.nome}
              </strong>
            </div>

            <div className="sucesso-item">
              <span>Status</span>

              <strong className="sucesso-status">
                Agendado
              </strong>
            </div>

          </div>

          <div className="sucesso-acoes">
            <button
              className="voltar-button"
              type="button"
              onClick={irParaHome}
            >
              Voltar para o início
            </button>

            <button
              className="continuar-button"
              type="button"
              onClick={verAgendamentos}
            >
              Ver meus agendamentos →
            </button>
          </div>

        </div>

        <p className="projeto-aviso">
          Clínica Lume é um projeto fictício desenvolvido
          para fins de estudo e portfólio.
        </p>

      </section>
    </main>
  )
}

export default SucessoAgendamento