import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './EstilosGerais.css'

function DadosPaciente() {
  const location = useLocation()
  const navigate = useNavigate()

  const especialidade = location.state?.especialidade || ''
  const profissional = location.state?.profissional || ''
  const data = location.state?.data || ''
  const horario = location.state?.horario || ''

  const [dadosPaciente, setDadosPaciente] = useState({
    nome: '',
    telefone: '',
    email: '',
    nascimento: '',
  })

  const [erroTelefone, setErroTelefone] = useState('')
  const [erroNascimento, setErroNascimento] = useState('')

  function formatarTelefone(valor) {
    const numeros = valor
      .replace(/\D/g, '')
      .slice(0, 11)

    if (numeros.length === 0) {
      return ''
    }

    if (numeros.length <= 2) {
      return `(${numeros}`
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7)}`
  }

  function validarTelefone(telefone) {
    const numeros =
      telefone.replace(/\D/g, '')

    return numeros.length === 11
  }

  function formatarDataNascimento(valor) {
    const numeros = valor
      .replace(/\D/g, '')
      .slice(0, 8)

    if (numeros.length <= 2) {
      return numeros
    }

    if (numeros.length <= 4) {
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`
    }

    return `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4)}`
  }

  function validarDataNascimento(dataNascimento) {
    const partes = dataNascimento.split('/')

    if (partes.length !== 3) {
      return false
    }

    const dia = Number(partes[0])
    const mes = Number(partes[1])
    const ano = Number(partes[2])

    if (
      partes[0].length !== 2 ||
      partes[1].length !== 2 ||
      partes[2].length !== 4
    ) {
      return false
    }

    const dataCriada = new Date(
      ano,
      mes - 1,
      dia
    )

    const dataValida =
      dataCriada.getFullYear() === ano &&
      dataCriada.getMonth() === mes - 1 &&
      dataCriada.getDate() === dia

    if (!dataValida) {
      return false
    }

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    if (dataCriada > hoje) {
      return false
    }

    return true
  }

  function atualizarCampo(event) {
    const { name, value } = event.target

    if (name === 'telefone') {
      const telefoneFormatado =
        formatarTelefone(value)

      setDadosPaciente((dadosAnteriores) => ({
        ...dadosAnteriores,
        telefone: telefoneFormatado,
      }))

      if (erroTelefone) {
        setErroTelefone('')
      }

      return
    }

    if (name === 'nascimento') {
      const dataFormatada =
        formatarDataNascimento(value)

      setDadosPaciente((dadosAnteriores) => ({
        ...dadosAnteriores,
        nascimento: dataFormatada,
      }))

      if (erroNascimento) {
        setErroNascimento('')
      }

      return
    }

    setDadosPaciente((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value,
    }))
  }

  function formularioPreenchido() {
    return (
      dadosPaciente.nome.trim() !== '' &&
      validarTelefone(dadosPaciente.telefone) &&
      dadosPaciente.email.trim() !== '' &&
      dadosPaciente.nascimento.length === 10
    )
  }

  function voltarParaDataHorario() {
    navigate('/agendamento/data-horario', {
      state: {
        especialidade,
        profissional,
      },
    })
  }

  function continuarAgendamento(event) {
    event.preventDefault()

    if (
      !validarTelefone(
        dadosPaciente.telefone
      )
    ) {
      setErroTelefone(
        'Informe um telefone válido.'
      )

      return
    }

    if (
      !validarDataNascimento(
        dadosPaciente.nascimento
      )
    ) {
      setErroNascimento(
        'Informe uma data de nascimento válida.'
      )

      return
    }

    setErroTelefone('')
    setErroNascimento('')

    navigate('/agendamento/confirmacao', {
      state: {
        especialidade,
        profissional,
        data,
        horario,
        dadosPaciente,
      },
    })
  }

  return (
    <main className="agendamento-page">
      <section className="agendamento-container">

        <header className="agendamento-header">
          <span className="agendamento-etapa">
            Agendamento • Etapa 4 de 5
          </span>

          <h1>Agora, seus dados</h1>

          <p>
            Preencha seus dados para continuarmos com o
            agendamento da consulta.
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

        <form
          className="dados-form"
          onSubmit={continuarAgendamento}
        >

          <div className="dados-form-header">

            <span className="data-horario-numero">
              4
            </span>

            <div>

              <h2>Dados do paciente</h2>

              <p>
                Informe os dados da pessoa que será atendida.
              </p>

            </div>

          </div>

          <div className="dados-grid">

            <div className="campo-form campo-completo">

              <label htmlFor="nome">
                Nome completo
              </label>

              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={dadosPaciente.nome}
                onChange={atualizarCampo}
                autoComplete="name"
                required
              />

            </div>

            <div className="campo-form">

              <label htmlFor="telefone">
                Telefone
              </label>

              <input
                id="telefone"
                name="telefone"
                type="tel"
                inputMode="numeric"
                placeholder="(00) 00000-0000"
                maxLength="15"
                value={dadosPaciente.telefone}
                onChange={atualizarCampo}
                autoComplete="tel"
                required
              />

              {erroTelefone && (
                <span className="campo-ajuda">
                  {erroTelefone}
                </span>
              )}

            </div>

            <div className="campo-form">

              <label htmlFor="nascimento">
                Data de nascimento
              </label>

              <input
                id="nascimento"
                name="nascimento"
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/AAAA"
                maxLength="10"
                value={dadosPaciente.nascimento}
                onChange={atualizarCampo}
                autoComplete="bday"
                required
              />

              {erroNascimento && (
                <span className="campo-ajuda">
                  {erroNascimento}
                </span>
              )}

            </div>

            <div className="campo-form campo-completo">

              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={dadosPaciente.email}
                onChange={atualizarCampo}
                autoComplete="email"
                required
              />

              <span className="campo-ajuda">
                Usaremos este e-mail para as informações
                do agendamento.
              </span>

            </div>

          </div>

          <div className="agendamento-acoes">

            <button
              className="voltar-button"
              type="button"
              onClick={voltarParaDataHorario}
            >
              ← Voltar
            </button>

            <button
              className="continuar-button"
              type="submit"
              disabled={!formularioPreenchido()}
            >
              Revisar agendamento →
            </button>

          </div>

        </form>

      </section>
    </main>
  )
}

export default DadosPaciente