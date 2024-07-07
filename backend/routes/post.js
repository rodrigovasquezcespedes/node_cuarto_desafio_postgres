const express = require('express')
const router = express.Router()
const { getPost, getPostId, createPost, deletePost, updatePost, updateLike } = require('../controllers/postsController')

router.get('/posts', async (req, res) => {
  try {
    const posts = await getPost()
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/posts', async (req, res) => {
  const { id } = req.params
  try {
    const posts = await getPostId(id)
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/posts', async (req, res) => {
  try {
    await createPost(req.body)
    res.status(201).send('Post creado con exito')
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deletedPost = await deletePost(id)
    res.status(200).json({ message: 'Post eliminado', post: deletedPost })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/posts/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updatedPost = await updatePost(id, req.body)
    res.status(200).json({ message: 'Post actualizado', post: updatedPost })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updateLikes = await updateLike(id)
    res.status(200).json({ message: 'Post actualizado', post: updateLikes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
module.exports = router
