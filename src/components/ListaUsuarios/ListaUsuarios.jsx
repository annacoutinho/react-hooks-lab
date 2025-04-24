import { useState, useRef } from 'react'
import useFetch from '../../Hooks/useFetch'
import usePrevious from '../../Hooks/usePrevious'
import useToggle from '../../Hooks/UseToggle'
import useLocalStorage from '../../Hooks/useLocalStorage'
import useDebounce from '../../Hooks/userDebouger'
import useInterval from '../../Hooks/UseInterval'
import useWindowSize from '../../Hooks/UseWindowSize'
import useOnClickOutside from '../../Hooks/useOnClickOutside'
import useHover from '../../Hooks/useHover'
import useMediaQuery from '../../Hooks/UseMediaQuery'
import './ListaUsuarios.css'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const ListaUsuarios = () => {
  const [url, setUrl] = useState(API_URL)
  const { dados, carregando, erro } = useFetch(url)

  const [busca, setBusca] = useLocalStorage('busca', '')
  const prevBusca = usePrevious(busca)
  const [visivel, alternarVisibilidade] = useToggle(true)

  const buscaDebounced = useDebounce(busca, 500)
  const listaRef = useRef(null)

  const usuariosFiltrados = dados
    ? dados.filter((usuario) =>
        usuario.name.toLowerCase().includes(buscaDebounced.toLowerCase()),
      )
    : []

  useInterval(() => {
    setUrl(API_URL)
  }, 10000)

  const { width } = useWindowSize()

  const isMobile = useMediaQuery('(max-width: 600px)')
  const isTablet = useMediaQuery('(max-width: 768px)')

  useOnClickOutside(listaRef, () => {
    if (visivel) alternarVisibilidade()
  })

  const [hovered, setHovered] = useState(false)
  const hoverState = useHover()

  return (
    <div className="container">
      <h1 className="title">Lista de Usuários</h1>

      {carregando && <p>Carregando usuários...</p>}
      {erro && (
        <p className="error">Erro ao carregar usuários: {erro.message}</p>
      )}

      {isMobile && (
        <p className="warning">
          Use um dispositivo maior para melhor experiência!
        </p>
      )}

      <label htmlFor="busca">Buscar Usuário:</label>
      <input
        type="text"
        id="busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Digite um nome..."
      />

      {prevBusca && (
        <p className="prev-search">
          Última busca: <strong>{prevBusca}</strong>
        </p>
      )}

      <button onClick={alternarVisibilidade}>
        {visivel ? 'Ocultar Lista' : 'Mostrar Lista'}
      </button>

      {visivel && (
        <>
          {usuariosFiltrados.length > 0 ? (
            <ul
              ref={listaRef}
              className={`user-list ${isTablet ? 'mobile' : ''}`}
            >
              {usuariosFiltrados.map((usuario) => (
                <li
                  key={usuario.id}
                  className="user-item"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <strong>{usuario.name}</strong> <br />
                  {usuario.email} <br />
                  {usuario.phone}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </>
      )}
    </div>
  )
}

export default ListaUsuarios
