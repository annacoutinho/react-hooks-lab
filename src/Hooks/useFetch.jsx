import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [dados, setDados] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await fetch(url)
        if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`)
        const dados = await resposta.json()
        setDados(dados)
      } catch (erro) {
        setErro(erro)
      } finally {
        setCarregando(false)
      }
    }

    fetchData()
  }, [url])

  return { dados, carregando, erro }
}

export default useFetch
