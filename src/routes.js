import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query
      const users = database.select('users', search ? {
        name: search,
        email: search,
      } : null)
      return res.end(JSON.stringify(users))
    }
  },
    {
      method: 'POST',
      path: buildRoutePath('/users'),
      handler: (req, res) => {
        const novo = {
          id: randomUUID(),
          name: req.body.name,
          email: req.body.email
        }
        database.insert('users', novo)
        return res.writeHead(201).end()
      }
    },
    {
      method: 'DELETE',
      path: buildRoutePath('/users/:userId'),
      handler: (req, res) => {
        database.delete('users', req.params.id)
        return res.writeHead(204).end()
      }
    },
    {
      method: 'PUT',
      path: buildRoutePath('/users/:userId'),
      handler: (req, res) => {
        const { name, email } = req.body
        database.update('users', req.params.id, { name, email })
        return res.writeHead(204).end()
      }
    },
]