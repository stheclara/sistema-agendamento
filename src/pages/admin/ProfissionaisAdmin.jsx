import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

function ProfissionaisAdmin() {
  const navigate = useNavigate()

  const profissionais = [
    {
      id: 1,
      nome: 'Dra. Helena Martins',
      especialidade: 'Clínica Geral',
    },
    {
      id: 2,
      nome: 'Dr. Rafael Almeida',
      especialidade: 'Clínica Geral',
    },
    {
      id: 3,
      nome: 'Dr. Lucas Ferreira',
      especialidade: 'Cardiologia',
    },
    {
      id: 4,
      nome: 'Dra. Marina Costa',
      especialidade: 'Cardiologia',
    },
    {
      id: 5,
      nome: 'Dra. Laura Mendes',
      especialidade: 'Dermatologia',
    },
    {
      id: 6,
      nome: 'Dr. André Ribeiro',
      especialidade: 'Dermatologia',
    },
    {
      id: 7,
      nome: 'Dra. Camila Nogueira',
      especialidade: 'Ginecologia',
    },
    {
      id: 8,
      nome: 'Dra. Beatriz Lima',
      especialidade: 'Ginecologia',
    },
    {
      id: 9,
      nome: 'Dra. Sofia Carvalho',
      especialidade: 'Pediatria',
    },
    {
      id: 10,
      nome: 'Dr. Gabriel Rocha',
      especialidade: 'Pediatria',
    },
    {
      id: 11,
      nome: 'Isabela Freitas',
      especialidade: 'Psicologia',
    },
    {
      id: 12,
      nome: 'Daniel Moreira',
      especialidade: 'Psicologia',
    },
  ]

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

  function abrirPacientes() {
    navigate('/admin/pacientes')
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
            className="admin-menu-item ativo"
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

          <span className="admin-label">
            Administração
          </span>

          <h1>Profissionais</h1>

          <p>
            Consulte os profissionais e as especialidades
            disponíveis na Clínica Lume.
          </p>

        </header>

        <section className="admin-agendamentos">

          <div className="admin-secao-titulo">

            <div>

              <h2>Equipe da clínica</h2>

              <p>
                {profissionais.length} profissionais cadastrados
              </p>

            </div>

          </div>

          <div className="admin-tabela-container">

            <table className="admin-tabela">

              <thead>

                <tr>
                  <th>Profissional</th>
                  <th>Especialidade</th>
                </tr>

              </thead>

              <tbody>

                {profissionais.map(
                  (profissional) => (

                    <tr key={profissional.id}>

                      <td>
                        {profissional.nome}
                      </td>

                      <td>
                        {profissional.especialidade}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      </section>

    </main>
  )
}

export default ProfissionaisAdmin