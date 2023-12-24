import axios from 'axios';
import { TSimplePokemonData } from '../type/type';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export default api;

export const getAllPokemonInfo = async (url: string) => {
  try {
    const request = await api.get(`${url}`)
    return request;
    
    
  } catch (e) {
    console.error(e);
  }
}

export const getData = async (setPokemonsData: React.Dispatch<React.SetStateAction<TSimplePokemonData[]>>) => {
  try {
    const request = await api.get(`/pokemon/`, {
      params: {
        limit: 1302,
      },
    });
      setPokemonsData(
        request.data.results
      );
    // console.log(request.data.results);
    
    // return request
  } catch (e) {
    console.error(e);
  }
};