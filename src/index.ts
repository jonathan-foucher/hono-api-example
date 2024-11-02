import { Hono } from 'hono'
import movieController from './controllers/movie.ts'

const HTTP_PORT: number = parseInt(process.env.HTTP_PORT || '8080', 10)

const app = new Hono()

app.route('/api/movies', movieController)

export default {
  port: HTTP_PORT,
  fetch: app.fetch
}
