const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialUsers = [
  {
    name: 'TestPerson1',
    email: 'test@test1.com',
    password: 'testtest1',
    courses: [],
    isAdmin: false,
  },
  {
    name: 'TestPerson2',
    email: 'test@test2.com',
    password: 'testtest2',
    courses: [],
    isAdmin: false,
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two users', async () => {
  const response = await api.get('/api/users')

  assert.strictEqual(response.body.users.length, 2)
})

test('the name of the first user is TestPerson1', async () => {
  const response = await api.get('/api/users')

  const contents = response.body.users.map((u) => u.name)
  assert.strictEqual(contents.includes('TestPerson1'), true)
})

describe('Register and login', () => {
  test('a valid user can be added and logged in', async () => {
    // REGISTER
    const newUser = {
      name: 'TestPerson3',
      email: 'test@test3.com',
      password: '123456',
    }

    const response = await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const contents = response.body
    const usersResponse = await api.get('/api/users')

    assert.strictEqual(usersResponse.body.users.length, initialUsers.length + 1)
    assert(Object.values(contents).includes('test@test3.com'))
    assert(Object.hasOwn(contents, 'userId'))
    assert(Object.hasOwn(contents, 'email'))
    assert(Object.hasOwn(contents, 'token'))

    // LOGIN
    const existingUser = {
      email: 'test@test3.com',
      password: '123456',
    }

    await api
      .post('/api/users/login')
      .send(existingUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
