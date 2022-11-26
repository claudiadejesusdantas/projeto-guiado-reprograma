import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import portfolioImg from '../assets/portfolio.svg'
import Axios from 'axios'
import { ArrowBendDownRight } from 'phosphor-react'

import styles from '../styles/pages/portfolio.module.css'

const list = [
  // {
  //   id: 1,
  //   nome: 'Quero ser dev',
  //   descricao: 'Um site com conteúdos de introdução à programação.',
  //   conteudo: 'Feito com html, css e js.',
  //   imagem: 'https://media.giphy.com/media/NpKOhpooYL1Rr7Uuav/giphy.gif',
  //   link: 'https://queroserdev.com/'
  // },
  {
    id: 2,
    nome: 'TODO list',
    descricao: 'Uma aplicação em react para fazer um todo list ',
    conteudo: 'React hooks e testar os componente com testing library.',
    imagem: 'https://media.giphy.com/media/OUxAsqI6AeAGqMQhFz/giphy.gif',
    link: 'https://thirsty-noyce-28045f.netlify.app/'
  },
  {
    id: 3,
    nome: 'Rick And Morty',
    descricao: 'Um site em react para demonstrar e buscar personagens de Ricky and Morty',
    conteudo: 'React: fundamentos, components, hooks, eventos e consumos de API.',
    imagem: 'https://media.giphy.com/media/fB9TNMAGEPmq3Z1Iye/giphy.gif',
    link: 'https://rickandmortytiktok.netlify.app/'
  },
  {
    id: 4,
    nome: 'Meu Portfolio',
    descricao: 'Um site em react para demonstrar meu portfolio',
    conteudo: 'React: fundamentos, components, rotas, hooks, eventos e consumos de API.',
    imagem: 'https://media.giphy.com/media/RaT2tOOlt1WPIb7sGA/giphy.gif',
    link: 'https://portfolio-aula-react.netlify.app/'
  }
]

export function Portfolio() {
  const [repositories, setRepositories] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [reposFiltrados, setReposFiltrados] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await Axios.get('https://api.github.com/users/simaraconceicao/repos')
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInput(event) {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    const result = repositories.filter(repo => {
      return repo.name.includes(inputValue)
    })

    setReposFiltrados(result)
  }, [inputValue, repositories])

  return (
    <>
      <Header title="Meu Portfolio" image={portfolioImg} />
      <div className={styles.projectsContainer}>
        <h2 className={styles.projectsTitle}>Favoritos</h2>
        <div className={styles.cardsContainer}>
          {list.map(project => {
            return(
              <div className={styles.card} key={project.id}>
                <h1>{project.nome}</h1>
                <img className={styles.cardImage} src={project.imagem} />
                <p className={styles.cardText}>{project.descricao}</p>
                <a className={styles.cardLink} href={project.link} target="_blank" rel="noreferrer">
                  Ver projeto
                </a>
              </div>
            )
          })}
        </div>
        <div className={styles.projectsContainer}>
          <h2 className={styles.projectsTitle}>Outros projetos no meu Github</h2>
          <input placeholder="Busque pelo nome" className={styles.projectsInput} onChange={handleInput}/>
          <div className={styles.projectsContainer}>
            <div className={styles.cardsRepoContainer}>
              {
                reposFiltrados.map(repo => {
                  return (
                    <div className={styles.cardRepo}>
                      <h3 className={styles.cardRepoText} key={repo.id}>{repo.name}</h3>
                      <p className={styles.cardRepoText}>{repo.description}</p>
                      <a className={styles.cardRepoLink}href={repo.html_url} target="_blank" rel="noreferrer">
                        <ArrowBendDownRight size={32} weight="thin" color="#fff" />
                      </a>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}