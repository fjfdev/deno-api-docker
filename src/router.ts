import { Router } from "https://deno.land/x/oak/mod.ts";

import { getInfo } from "./controllers/info.controller.ts";
import {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} from "./controllers/movie.controller.ts";

const router = new Router();

router
  .get("/", getInfo)
  .get("/api/movie", getMovies)
  .get("/api/movie/:id", getMovie)
  .post("/api/movie", addMovie)
  .put("/api/movie/:id", updateMovie)
  .delete("/api/movie/:id", deleteMovie);

export default router;
