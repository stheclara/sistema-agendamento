import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

function LoginAdmin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function entrar(event) {
    event.preventDefault()

    const emailCorreto =
      email.trim().toLowerCase() ===
      'colaborador@clinicalume.com.br'

    const senhaCorreta =
      senha === 'Lume123'

    if (!emailCorreto || !senhaCorreta) {
      setErro('E-mail ou senha incorretos.')
      return
    }

    sessionStorage.setItem(
      'lumeAdminAutenticado',
      'true'
    )

    navigate('/admin')
  }

  function voltarParaSite() {
    navigate('/')
  }

  return (
    <main className="login-admin-page">

      <section className="login-admin-card">

        <div className="login-admin-logo">
          <span className="login-admin-logo-symbol">
            L
          </span>

          <div>
            <strong>Clínica Lume</strong>
            <span>Saúde e cuidado</span>
          </div>
        </div>

        <div className="login-admin-header">
          <span className="login-admin-label">
            Área do colaborador
          </span>

          <h1>Bem-vindo</h1>

          <p>
            Entre com suas credenciais para acessar
            o sistema administrativo da clínica.
          </p>
        </div>

        <form
          className="login-admin-form"
          onSubmit={entrar}
        >

          <div className="login-admin-campo">
            <label htmlFor="admin-email">
              E-mail
            </label>

            <input
              id="admin-email"
              type="email"
              placeholder="seuemail@clinicalume.com.br"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setErro('')
              }}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-admin-campo">
            <label htmlFor="admin-senha">
              Senha
            </label>

            <input
              id="admin-senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => {
                setSenha(event.target.value)
                setErro('')
              }}
              autoComplete="current-password"
              required
            />
          </div>

          {erro && (
            <p className="login-admin-erro">
              {erro}
            </p>
          )}

          <button
            className="login-admin-entrar"
            type="submit"
          >
            Entrar
          </button>

        </form>

        <button
          className="login-admin-voltar"
          type="button"
          onClick={voltarParaSite}
        >
          ← Voltar para o site
        </button>

        <p className="login-admin-aviso">
          Acesso exclusivo para colaboradores da Clínica Lume.
        </p>

      </section>

    </main>
  )
}

export default LoginAdmin