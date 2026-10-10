import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EstilosGerais.css'

function Profissional() {
  const location = useLocation()
  const navigate = useNavigate()

  const especialidadeSelecionada =
    location.state?.especialidade || 'Especialidade'

  const [profissionalSelecionado, setProfissionalSelecionado] = useState('')

  const profissionais = {
    'Clínica Geral': [
      {
        nome: 'Dra. Helena Martins',
        descricao: 'Clínica Geral',
      },
      {
        nome: 'Dr. Rafael Almeida',
        descricao: 'Clínica Geral',
      },
    ],

    Cardiologia: [
      {
        nome: 'Dr. Lucas Ferreira',
        descricao: 'Cardiologista',
      },
      {
        nome: 'Dra. Marina Costa',
        descricao: 'Cardiologista',
      },
    ],

    Dermatologia: [
      {
        nome: 'Dra. Laura Mendes',
        descricao: 'Dermatologista',
      },
      {
        nome: 'Dr. André Ribeiro',
        descricao: 'Dermatologista',
      },
    ],

    Ginecologia: [
      {
        nome: 'Dra. Camila Nogueira',
        descricao: 'Ginecologista',
      },
      {
        nome: 'Dra. Beatriz Lima',
        descricao: 'Ginecologista',
      },
    ],

    Pediatria: [
      {
        nome: 'Dra. Sofia Carvalho',
        descricao: 'Pediatra',
      },
      {
        nome: 'Dr. Gabriel Rocha',
        descricao: 'Pediatra',
      },
    ],

    Psicologia: [
      {
        nome: 'Isabela Freitas',
        descricao: 'Psicóloga',
      },
      {
        nome: 'Daniel Moreira',
        descricao: 'Psicólogo',
      },
    ],
  }

  const profissionaisDisponiveis =
    profissionais[especialidadeSelecionada] || []

  function voltarParaEspecialidades() {
    navigate('/agendamento')
  }

  function continuarAgendamento() {
    if (!profissionalSelecionado) {
      return
    }

    navigate('/agendamento/data-horario', {
      state: {
        especialidade: especialidadeSelecionada,
        profissional: profissionalSelecionado,
      },
    })
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-container">

        <header className="agendamento-header">
          <span className="agendamento-etapa">
            Agendamento • Etapa 2 de 5
          </span>

          <h1>Escolha o profissional</h1>

          <p>
            Profissionais disponíveis para{' '}
            <strong>{especialidadeSelecionada}</strong>.
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
          {profissionaisDisponiveis.map((profissional) => (
            <button
              key={profissional.nome}
              type="button"
              className={`especialidade-card ${
                profissionalSelecionado === profissional.nome
                  ? 'selecionada'
                  : ''
              }`}
              onClick={() =>
                setProfissionalSelecionado(profissional.nome)
              }
            >
              <span className="especialidade-icone">
                ♙
              </span>

              <div>
                <h2>{profissional.nome}</h2>
                <p>{profissional.descricao}</p>
              </div>

              <span className="especialidade-check">
                {profissionalSelecionado === profissional.nome
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
            onClick={voltarParaEspecialidades}
          >
            ← Voltar
          </button>

          <button
            className="continuar-button"
            type="button"
            disabled={!profissionalSelecionado}
            onClick={continuarAgendamento}
          >
            Continuar →
          </button>
        </div>

      </section>
    </main>
  )
}

export default Profissional