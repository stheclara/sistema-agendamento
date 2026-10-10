import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

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

const diasSemana = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
]

const horariosDisponiveis = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

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

function buscarDisponibilidadesSalvas() {
  try {
    return JSON.parse(
      localStorage.getItem('lumeDisponibilidade') || '{}'
    )
  } catch {
    return {}
  }
}

function obterDisponibilidadeProfissional(nomeProfissional) {
  const disponibilidades = buscarDisponibilidadesSalvas()

  if (Object.prototype.hasOwnProperty.call(disponibilidades, nomeProfissional)) {
    return disponibilidades[nomeProfissional]
  }

  return disponibilidadePadrao[nomeProfissional] || {}
}

function carregarDisponibilidadeInicial() {
  return obterDisponibilidadeProfissional(profissionais[0].nome)
}

function HorariosAdmin() {
  const navigate = useNavigate()

  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState(profissionais[0].nome)

  const [horariosSelecionados, setHorariosSelecionados] =
    useState(carregarDisponibilidadeInicial)

  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    const estaAutenticado =
      sessionStorage.getItem('lumeAdminAutenticado') === 'true'

    if (!estaAutenticado) {
      navigate('/area-do-colaborador', {
        replace: true,
      })
    }
  }, [navigate])

  function carregarDisponibilidade(nomeProfissional) {
    setHorariosSelecionados(
      obterDisponibilidadeProfissional(nomeProfissional)
    )

    setMensagem('')
  }

  function trocarProfissional(nomeProfissional) {
    setProfissionalSelecionado(nomeProfissional)

    carregarDisponibilidade(nomeProfissional)
  }

  function alternarHorario(dia, horario) {
    const horariosDoDia =
      horariosSelecionados[dia] || []

    const horarioJaSelecionado =
      horariosDoDia.includes(horario)

    let novosHorariosDoDia

    if (horarioJaSelecionado) {
      novosHorariosDoDia =
        horariosDoDia.filter(
          (horarioSalvo) =>
            horarioSalvo !== horario
        )
    } else {
      novosHorariosDoDia = [
        ...horariosDoDia,
        horario,
      ]
    }

    setHorariosSelecionados({
      ...horariosSelecionados,
      [dia]: novosHorariosDoDia,
    })

    setMensagem('')
  }

  function horarioEstaSelecionado(dia, horario) {
    return (
      horariosSelecionados[dia]?.includes(horario) ||
      false
    )
  }

  function salvarDisponibilidade() {
    const disponibilidades =
      buscarDisponibilidadesSalvas()

    const novasDisponibilidades = {
      ...disponibilidades,
      [profissionalSelecionado]:
        horariosSelecionados,
    }

    localStorage.setItem(
      'lumeDisponibilidade',
      JSON.stringify(novasDisponibilidades)
    )

    setMensagem(
      'Disponibilidade salva com sucesso.'
    )
  }

  function abrirPainel() {
    navigate('/admin')
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

  function voltarParaHome() {
    navigate('/')
  }

  function sairDoSistema() {
    sessionStorage.removeItem('lumeAdminAutenticado')

    navigate('/area-do-colaborador', {
      replace: true,
    })
  }

  const profissionalAtual = profissionais.find(
    (profissional) =>
      profissional.nome === profissionalSelecionado
  )

  const totalHorariosSelecionados =
    Object.values(horariosSelecionados).reduce(
      (total, horariosDoDia) =>
        total + horariosDoDia.length,
      0
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
            className="admin-menu-item ativo"
          >
            Horários
          </button>
        </nav>

        <div className="admin-sidebar-acoes">
          <button
            type="button"
            className="admin-voltar"
            onClick={voltarParaHome}
          >
            ← Voltar para o site
          </button>

          <button
            type="button"
            className="admin-sair"
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

            <h1>Horários</h1>

            <p>
              Gerencie a disponibilidade dos profissionais
              da Clínica Lume.
            </p>
          </div>
        </header>

        <section className="admin-filtros">
          <div className="admin-filtro-status">
            <label htmlFor="profissional-horario">
              Profissional
            </label>

            <select
              id="profissional-horario"
              value={profissionalSelecionado}
              onChange={(event) =>
                trocarProfissional(
                  event.target.value
                )
              }
            >
              {profissionais.map((profissional) => (
                <option
                  key={profissional.nome}
                  value={profissional.nome}
                >
                  {profissional.nome}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="admin-agendamentos">
          <div className="admin-secao-titulo">
            <div>
              <h2>
                {profissionalAtual?.nome}
              </h2>

              <p>
                {profissionalAtual?.especialidade}
              </p>
            </div>
          </div>

          <div className="admin-horarios-conteudo">
            {diasSemana.map((dia) => (
              <div
                className="admin-horario-dia"
                key={dia}
              >
                <div className="admin-horario-dia-titulo">
                  <h3>
                    {dia}
                  </h3>

                  <span>
                    {horariosSelecionados[dia]?.length || 0}{' '}
                    horários selecionados
                  </span>
                </div>

                <div className="admin-horarios-grid">
                  {horariosDisponiveis.map(
                    (horario) => {
                      const selecionado =
                        horarioEstaSelecionado(
                          dia,
                          horario
                        )

                      return (
                        <button
                          key={horario}
                          type="button"
                          className={`admin-horario-botao ${
                            selecionado
                              ? 'selecionado'
                              : ''
                          }`}
                          onClick={() =>
                            alternarHorario(
                              dia,
                              horario
                            )
                          }
                        >
                          {horario}
                        </button>
                      )
                    }
                  )}
                </div>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                flexWrap: 'wrap',
                paddingTop: '24px',
              }}
            >
              <div>
                <strong
                  style={{
                    display: 'block',
                    color: '#304b46',
                    fontSize: '0.85rem',
                    marginBottom: '4px',
                  }}
                >
                  {totalHorariosSelecionados}{' '}
                  {totalHorariosSelecionados === 1
                    ? 'horário disponível'
                    : 'horários disponíveis'}
                </strong>

                {mensagem && (
                  <span
                    style={{
                      color: '#39746d',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                    }}
                  >
                    ✓ {mensagem}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="admin-acao concluir"
                onClick={salvarDisponibilidade}
                style={{
                  minHeight: '44px',
                  padding: '0 20px',
                }}
              >
                Salvar disponibilidade
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default HorariosAdmin