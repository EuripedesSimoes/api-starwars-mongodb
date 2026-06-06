import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Ys_Dana from './assets/Ys_Dana_Wallpaper_1080x1920.png'
import './App.css'
import { PesquisarAPI } from './api/starwars-api'
import GameCard from './components/GameCard'
import SteamHoverCard from './components/SteamHoverCard'
import SteamSliderCard from './components/SteamSliderCard'

export type CardSize = "small" | "medium" | "large" | "steam" | "slider";
function App() {


    // const [count, setCount] = useState(0)
    const list = [1, 2, 3, 4]
    const game = {
        id: 1,
        title: "Ys VIII: Lacrimosa of Dana",
        cover: Ys_Dana,
        // title: "Teste",
        // cover: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
        estimatedHours: 55,
        playedHours: 78,
        platform: "Steam",
        startedAt: "01/05/2026",
        finishedAt: "20/05/2026",
        releasedYear: 2016,
        // status: "Finalizado",
        description:
            "Um dos melhores RPGs já feitos.",
    };


    const [size, setSize] = useState<CardSize>("steam");
    const [resultados, setResultados] = useState<any[]>([])
    // tipo any[] para aceitar qualquer formato de resultado, mas idealmente deveria ser um tipo específico

    const buscarResultados = async () => {
        const dados = await PesquisarAPI() // dados === return results
        setResultados(dados) // dados/results vira o valor de resultados, que é o estado usado para renderizar os resultados na tela
        console.log("dados pegos", dados)
    }

       // 2. DISPARADOR: Executa a função buscarResultados assim que o componente aparece na tela
    useEffect(() => {
        buscarResultados();
    }, []); // Array vazio significa: "execute apenas uma vez quando a página carregar"


    return (
        <>
            <div className="flex bg-green-200 flex-row justify-center items-center w-full gap-4 m-2">
                {/* <img src={heroImg} className="base" width="170" height="179" alt="Imagem de Stawars" /> */}
                <img src={reactLogo} className="framework" alt="React logo" />
                {/* <img src={viteLogo} className="vite" alt="Vite logo" /> */}
                <p className='text-3xl font-bold text-white'>StarWars Wiki</p>
            </div>

            <div className='flex flex-col justify-center items-center 
            w-full h-full m-2 bg-red-200'>

                <div className='w-full'>
                    <p className='text-2xl font-bold text-gray-700'>Bem-vindo à StarWars Wiki!</p>
                </div>

                <div className='grid grid-cols-3 gap-2'>
                    <div className='bg-gray-600 w-auto h-auto p-2 rounded-lg gap-2 flex'>

                        <button onClick={buscarResultados} className='bg-gray-500 hover:bg-gray-400 hover:cursor-pointer text-white py-1 px-3 rounded'>
                            Pesquisar</button>
                        <button onClick={() => setResultados([])} className='bg-gray-500 hover:bg-gray-400 hover:cursor-pointer text-white py-1 px-3 rounded'>
                            Zerar
                        </button>
                    </div>
                    {/* {
                        list.map((itemlist) => (
                            <>
                                <div key={itemlist} className='bg-gray-600 w-48 h-100'>

                                    <button onClick={() => PesquisarAPI()}>Peswquisar</button>
                                </div>
                            </>
                        ))
                    } */}


                    {/* <div className='grid grid-cols-3 gap-2'>
                    {films.length === 0
                        ? <div className='col-span-3 text-center text-gray-700'>Nenhum filme carregado</div>
                        : films.map((film) => (
                            <div key={film.uid} className='bg-gray-600 w-48 h-100 p-3 text-white'>
                                <p className='font-bold text-lg'>{film.properties.title}</p>
                                <p className='text-sm mt-2'>{film.properties.opening_crawl?.slice(0, 80)}...</p>
                            </div>
                        ))}
                </div> */}
                </div>

            </div>
            {/* CONTROLES */}
            <div className="flex gap-2 p-3 border-b border-zinc-800">
                <button
                    onClick={() => setSize("small")}
                    className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
                >
                    Pequeno
                </button>

                <button
                    onClick={() => setSize("medium")}
                    className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
                >
                    Médio
                </button>

                <button
                    onClick={() => setSize("large")}
                    className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
                >
                    Grande
                </button>

                <button
                    onClick={() => setSize("steam")}
                    className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
                >
                    Steam
                </button>

                <button
                    onClick={() => setSize("slider")}
                    className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
                >
                    Slider
                </button>
            </div>
            <div className="h-auto w-full grid grid-cols-4 gap-4 bg-zinc-950 p-10">
                <GameCard game={game} tamanho={size} />
                {/* <SteamHoverCard game={game} /> */}
                {/* <SteamHoverCard game={game} />
                <SteamHoverCard game={game} />
                <SteamSliderCard game={game} />
                <SteamSliderCard game={game} /> */}

                {resultados.length === 0 ? (
                    <p className="text-white col-span-4">Nenhum resultado carregado</p>
                ) : (
                    resultados.map((resultado, index) => {
                        const title = resultado?.properties?.title ?? resultado?.name ?? resultado?.title ?? `Resultado ${index + 1}`
                        // const title = resultado?.properties?.title ?? resultado?.name ?? resultado?.title ?? `Resultado ${index + 1}`
                        return (
                            <div key={resultado?.uid ?? index} className="p-3 bg-zinc-800 h-auto rounded text-white">
                                <p className="font-bold">{title}</p>
                                <p className="font-bold">{resultado?.properties?.episode_id}</p>
                                {/* <pre className="text-xs mt-2 whitespace-pre-wrap break-words">{JSON.stringify(resultado, null, 2)}</pre> */}
                            </div>
                        )
                    })
                )}
            </div>
        </>
    )
}


export default App