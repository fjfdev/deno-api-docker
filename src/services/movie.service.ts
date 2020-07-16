import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { Movie } from "../models/movie.model.ts";

let moviesDB: Movie[] = [
  {
    id: "sw-anh",
    title: "Star Wars. A New Hope.",
    year: 1977,
  },
  {
    id: "sw-esb",
    title: "Star Wars. The Empire Strikes Back.",
    year: 1980,
  },
  {
    id: "sw-rj",
    title: "Star Wars. Return of the Jedi.",
    year: 1983,
  },
  {
    id: "sw-pm",
    title: "Star Wars. The Phantom Menace.",
    year: 1999,
  },
  {
    id: "sw-ac",
    title: "Star Wars. Attack of the Clones.",
    year: 2002,
  },
  {
    id: "sw-rs",
    title: "Star Wars. Revenge of the Sith.",
    year: 2005,
  },
  {
    id: "sw-fa",
    title: "Star Wars. The Force Awakens.",
    year: 2015,
  },
  {
    id: "sw-lj",
    title: "Star Wars. The Last Jedi.",
    year: 2017,
  },
  {
    id: "sw-rs",
    title: "Star Wars. The Rise of Skywalker.",
    year: 2019,
  },
];

export const getList = () => {
  return moviesDB;
};

export const getOne = (idMovie: string) => {
  return moviesDB.filter((movie) => movie.id === idMovie)[0];
};

export const addOne = (data: Omit<Movie, "id">) => {
  const movieData = { ...data, id: v4.generate() };
  moviesDB.push(movieData);
  return movieData.id;
};

export const updateOne = (id: string, newData: Omit<Movie, "id">) => {
  const newMovieData = { id, ...newData };
  let updated = false;

  moviesDB = moviesDB.map((movie) => {
    if (movie.id === id) {
      updated = true;
      return newMovieData;
    }
    return movie;
  });

  return updated ? newMovieData : null;
};

export const deleteOne = (id: string) => {
  const prevMoviesLength = moviesDB.length;
  moviesDB = moviesDB.filter((movie) => movie.id !== id);
  return prevMoviesLength !== moviesDB.length;
};
