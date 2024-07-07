const { pool } = require('../config/db')

const getPost = async () => {
  try {
    const query = 'SELECT * FROM posts'
    const { rows } = await pool.query(query)
    return rows
  } catch (error) {
    console.error(`Error al obtener los posts: ${error.message}`)
    throw new Error(`Error al obtener los posts: ${error.message}`)
  }
}

const createPost = async ({ titulo, url, descripcion, likes = 0 }) => {
  try {
    const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [titulo, url, descripcion, likes]
    const { rows } = await pool.query(query, values)
    return rows
  } catch (error) {
    console.error(`Error al guardar el post: ${error.message}`)
    throw new Error(`Error al guardar el post: ${error.message}`)
  }
}

const deletePost = async (id) => {
  try {
    const query = 'DELETE FROM posts WHERE id=$1 RETURNING *'
    const values = [id]
    const { rows } = await pool.query(query, values)

    if (rows.length === 0) {
      throw new Error('Post not found')
    }

    return rows
  } catch (error) {
    console.error(`Error al eliminar el post: ${error.message}`)
    throw new Error(`Error al eliminar el post: ${error.message}`)
  }
}

const updatePost = async (id, post) => {
  const { titulo, img, descripcion, likes } = post
  try {
    const query = 'UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5 RETURNING *'
    const values = [titulo, img, descripcion, likes, id]
    const { rows } = await pool.query(query, values)

    if (rows.length === 0) {
      throw new Error('Post not found')
    }

    return rows[0]
  } catch (error) {
    console.error(`Error al actualizar el post: ${error.message}`)
    throw new Error(`Error al actualizar el post: ${error.message}`)
  }
}

module.exports = { getPost, createPost, deletePost, updatePost }
