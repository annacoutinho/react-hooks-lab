import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log('Erro ao carregar do localStorage', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.log('Erro ao salvar no localStorage:', error)
    }
  }, [key, storedValue]) 

  return [storedValue, setStoredValue] 
}
