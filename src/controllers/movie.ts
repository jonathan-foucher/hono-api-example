import { Hono } from 'hono'
import * as logger from '../utils/logger.ts'
import { type Movie } from '../models/movie.ts'

const app = new Hono()

app.get((c) => {
    logger.info('Get all movies')
    return c.text('Get all movies')
  })
  .post(async (c) => {
    const movie: Movie = await c.req.json()
    logger.info(`Post movie with id ${movie.id}`)
    return c.text(`Post movie with id ${movie.id}`)
  })
  .delete('/:movieId', (c) => {
    const movieId: number = parseInt(c.req.param("movieId"), 10)
    logger.info(`Delete movie with id ${movieId}`)
    return c.text(`Delete movie with id ${movieId}`)
  })

export default app
