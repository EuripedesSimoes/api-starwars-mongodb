// const API = 'https://sevencoders-starwars-wiki.herokuapp.com/films'
const API = 'https://www.swapi.tech/api/films'


async function PesquisarAPI() {
    try {
        const response = await fetch(API)
        const data = await response.json()

        const results = data?.result ?? data?.message?.result ?? []
        //console.log("dataaaa", data.result) // ou apenas a variável results
        //console.log("resuuuuult", results) // ou apenas a variável results
        return results // precisa retornar para usar depois, se não retorna undefined
    }
    catch (error) {
        console.error(error)
        return []
    }
}

export { PesquisarAPI }