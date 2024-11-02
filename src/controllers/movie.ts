import { Hono } from 'hono'
import * as logger from '../utils/logger.ts'
import * as dbConnection from '../db-connection.ts'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { type Movie } from '../models/movie.ts'

const app = new Hono()

app.get(async (c) => {
    logger.info('Get all movies')
    return dbConnection.getAllMovies()
      .then(movies => c.json(snakecaseKeys(movies)))
  })
  .post(async (c) => {
    const movie: Movie = camelcaseKeys(await c.req.json())
    logger.info(`Post movie with id ${movie.id}`)
    return dbConnection.saveMovie(movie)
      .then(() => c.body(null))
  })
  .delete('/:movieId', async (c) => {
    const movieId: number = parseInt(c.req.param("movieId"), 10)
    logger.info(`Delete movie with id ${movieId}`)
    return dbConnection.deleteMoveById(movieId)
      .then(() => c.body(null))
  })

export default app
