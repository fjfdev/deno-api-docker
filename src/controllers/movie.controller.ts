import { Request, Response } from "https://deno.land/x/oak/mod.ts";

import { Movie } from "../models/movie.model.ts";
import {
  addOne,
  getList,
  getOne,
  updateOne,
  deleteOne,
} from "../services/movie.service.ts";

export const getMovies = ({ response }: { response: Response }) => {
  const data = getList();

  response.body = {
    success: true,
    data,
  };
};

export const getMovie = ({
  response,
  params,
}: {
  response: Response;
  params: { id: string };
}) => {
  const idMovie = params.id;
  const data = getOne(idMovie);

  if (data) {
    response.body = {
      success: true,
      data,
    };
  } else {
    response.status = 204;
    response.body = {
      success: true,
      msg: "Bad data provided. Movie not found.",
    };
  }
};

export async function addMovie({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data",
    };
    return;
  }

  const body = await request.body();
  const movieData = await body.value;

  if (!checkPayload(movieData)) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No valid data for movie. It should contain (title, year)",
    };
    return;
  }

  const id = await addOne(movieData);

  response.status = 201;
  response.body = {
    success: true,
    message: `Movie added with id:${id}`,
  };
}

export const updateMovie = async ({
  request,
  response,
  params,
}: {
  request: Request;
  response: Response;
  params: { id: string };
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data",
    };
    return;
  }

  const movieId = params.id;
  const body = await request.body();
  const newMovieData = await body.value;
  console.log(newMovieData, checkPayload(newMovieData));

  if (!checkPayload(newMovieData)) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No valid data for movie. It should contain (title, year)",
    };
    return;
  }

  const data = updateOne(movieId, newMovieData);

  if (data) {
    response.status = 200;
    response.body = {
      success: true,
      data,
    };
    return;
  }

  response.status = 204;
  response.body = {
    success: false,
    msg: "Bad data provided. Movie not found.",
  };
};

export const deleteMovie = ({
  response,
  params,
}: {
  request: Request;
  response: Response;
  params: { id: string };
}) => {
  const movieId = params.id;
  const success = deleteOne(movieId);
  response.status = success ? 200 : 204;
  response.body = {
    success,
  };
};

const checkPayload = (payloadData: Omit<Movie, "id">) => {
  const { title, year } = payloadData;
  return title !== undefined && year !== undefined;
};
