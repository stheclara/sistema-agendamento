import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EstilosGerais.css'

function Agendamento() {
  const navigate = useNavigate()

  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('')

  const especialidades = [
    {
      nome: 'Clínica Geral',
      descricao: 'Avaliação geral e acompanhamento da sua saúde.',
      icone: '✚',
    },
    {
      nome: 'Cardiologia',
      descricao: 'Cuidados especializados com a saúde do coração.',
      icone: '♡',
    },
    {
      nome: 'Dermatologia',
      descricao: 'Cuidados com a saúde da pele, cabelos e unhas.',
      icone: '✦',
    },
    {
      nome: 'Ginecologia',
      descricao: 'Acompanhamento e cuidados com a saúde da mulher.',
      icone: '❀',
    },
    {
      nome: 'Pediatria',
      descricao: 'Acompanhamento da saúde de crianças e adolescentes.',
      icone: '☀',
    },
    {
      nome: 'Psicologia',
      descricao: 'Cuidado e acompanhamento da saúde emocional.',
      icone: '◌',
    },
  ]

  function continuarAgendamento() {
    if (!especialidadeSelecionada) {
      return
    }

    navigate('/agendamento/profissional', {
      state: {
        especialidade: especialidadeSelecionada,
      },
    })
  }

  function voltarParaHome() {
    navigate('/')
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-container">

        <header className="agendamento-header">
          <span className="agendamento-etapa">
            Agendamento • Etapa 1 de 5
          </span>

          <h1>Qual especialidade você procura?</h1>

          <p>
            Escolha uma especialidade para encontrar os profissionais
            disponíveis na Clínica Lume.
          </p>
        </header>

        <div className="agendamento-progresso">
          <span className="progresso-item ativo">
            Especialidade
          </span>

          <span className="progresso-linha"></span>

          <span className="progresso-item">
            Profissional
          </span>

          <span className="progresso-linha"></span>

          <span className="progresso-item">
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

        <section className="especialidades-grid">
          {especialidades.map((especialidade) => (
            <button
              key={especialidade.nome}
              type="button"
              className={`especialidade-card ${
                especialidadeSelecionada === especialidade.nome
                  ? 'selecionada'
                  : ''
              }`}
              onClick={() =>
                setEspecialidadeSelecionada(especialidade.nome)
              }
            >
              <span className="especialidade-icone">
                {especialidade.icone}
              </span>

              <div>
                <h2>{especialidade.nome}</h2>
                <p>{especialidade.descricao}</p>
              </div>

              <span className="especialidade-check">
                {especialidadeSelecionada === especialidade.nome
                  ? '✓'
                  : '→'}
              </span>
            </button>
          ))}
        </section>

        <div className="agendamento-acoes">
          <button
            className="voltar-button"
            type="button"
            onClick={voltarParaHome}
          >
            ← Voltar
          </button>

          <button
            className="continuar-button"
            type="button"
            disabled={!especialidadeSelecionada}
            onClick={continuarAgendamento}
          >
            Continuar →
          </button>
        </div>

      </section>
    </main>
  )
}

export default Agendamento