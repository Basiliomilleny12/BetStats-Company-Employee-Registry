import { useState } from "react";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [times, setTimes] = useState([
    {
      id: uuidv4(),
      nome: 'Desenvolvimento',
      cor: '#57C278'
    },
    {
      id: uuidv4(),
      nome: 'Operação',
      cor: '#82CFFA'
    },
    {
      id: uuidv4(),
      nome: 'Marketing',
      cor: '#A6D157'
    },
   
  ]);

  const inicial = [
    {
      id: uuidv4(),
      favorito: false,
      nome: 'Paulo Mendes',
      cargo: 'CEO e Desenvolvedor de software Full Stack',
      imagem: 'https://avatars.githubusercontent.com/u/82844307?v=4',
      time: times[0].nome
    },
    {
      id: uuidv4(),
      favorito: false,
      nome: 'Milleny Basilio',
      cargo: 'Estagiária Front-End',
      imagem: 'https://avatars.githubusercontent.com/u/120434025?s=400&u=6286fbedbb15b7b18672748b456c0d56dc524845&v=4',
      time: times[0].nome
    }
  ]

  const [colaboradores, setColaboradores] = useState(inicial)

  function deletarColaborador(id) {
    setColaboradores(colaboradores.filter(colaborador => colaborador.id !== id));
  }

  function mudarCor(cor, id) {
    setTimes(times.map(time => {
      if(time.id === id) {
        time.cor = cor;
      }
      return time;
    }));
  }

  function cadastrarTime({ nome, cor }) {
    setTimes([...times, { nome, cor, id: uuidv4() }])
  }

  function resolverFavorito(id) {
    setColaboradores(colaboradores.map(colaborador => {
      if(colaborador.id === id) colaborador.favorito = !colaborador.favorito;
      return colaborador;
    }))
  }


  return (
    <div>
      <Banner />
      <Formulario aoCriarTime={cadastrarTime} times={times.map(time => time.nome)} aoCadastrar={colaborador => setColaboradores([...colaboradores, colaborador])} />
      <section className="times">
        <h1>Minha organização</h1>
        {times.map((time, indice) => <Time mudarCor={mudarCor} key={indice} time={time} colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)} aoDeletar={deletarColaborador} aoFavoritar={resolverFavorito} />)}
      </section>
      <Rodape />
    </div>
  );
}

export default App;
