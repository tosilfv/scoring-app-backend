const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Place = require('../models/place')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
  {
    name: 'TestPerson10',
    email: 'test@test10.com',
    password: 'testtest10',
    places: [],
  },
  {
    name: 'TestPerson20',
    email: 'test@test20.com',
    password: 'testtest20',
    places: [],
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('places are returned as json', async () => {
  const response = await api.get('/api/users')
  const creator = response.body.users[0].id

  const initialPlaces = [
    {
      title: 'Place10',
      description: 'desc10',
      address: 'addr10',
      creator: creator,
    },
    {
      title: 'Place20',
      description: 'desc20',
      address: 'addr20',
      creator: creator,
    },
  ]

  await Place.deleteMany({})
  let placeObject = new Place(initialPlaces[0])
  await placeObject.save()
  placeObject = new Place(initialPlaces[1])
  await placeObject.save()

  await api
    .get('/api/places')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two places', async () => {
  const response = await api.get('/api/places')

  assert.strictEqual(response.body.places.length, 2)
})

test('the address of the second place is addr20', async () => {
  const response = await api.get('/api/places')

  const contents = response.body.places.map((p) => p.address)
  assert.strictEqual(contents.includes('addr20'), true)
})

test('the first place can be retrieved by its id', async () => {
  const response = await api.get('/api/places')
  const placeById = await api.get(`/api/places/${response.body.places[0].id}`)

  const title = placeById.body.place.title
  assert.strictEqual(title, 'Place10')
})

describe('Create, edit and delete', () => {
  test('a place can be created, edited and deleted', async () => {
    // REGISTER
    const newUser = {
      name: 'TestPerson30',
      email: 'test@test30.com',
      password: '123456',
    }

    await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // LOGIN
    const existingUser = {
      email: 'test@test30.com',
      password: '123456',
    }

    const res = await api
      .post('/api/users/login')
      .send(existingUser)
      .expect(303)
      .expect('Content-Type', /application\/json/)

    assert.notStrictEqual(res.body.token.length, 0)

    const authorization = `bearer ${res.body.token}`

    const newPlace = {
      title: 'Place30',
      description: 'desc30',
      address: 'addr30',
      creator: res.body.userId,
    }

    // CREATE
    await api
      .post('/api/places')
      .set('Authorization', authorization)
      .send(newPlace)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responsePlaces1 = await api.get('/api/places')
    assert.strictEqual(responsePlaces1.body.places.length, 3)
    const contents1 = responsePlaces1.body.places.map((p) => p.address)
    assert.strictEqual(contents1.includes('addr30'), true)

    // EDIT
    const editedPlace = {
      title: 'Place300',
      description: 'desc300',
      creator: res.body.userId,
    }

    await api
      .patch(`/api/places/${responsePlaces1.body.places[2].id}`)
      .set('Authorization', authorization)
      .send(editedPlace)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responsePlaces2 = await api.get('/api/places')
    assert.strictEqual(responsePlaces2.body.places.length, 3)
    const contents2 = responsePlaces2.body.places.map((p) => p.title)
    assert.strictEqual(contents2.includes('Place300'), true)

    // DELETE
    await api
      .delete(`/api/places/${responsePlaces1.body.places[2].id}`)
      .set('Authorization', authorization)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responsePlaces3 = await api.get('/api/places')
    assert.strictEqual(responsePlaces3.body.places.length, 2)
    const contents3 = responsePlaces3.body.places.map((p) => p.title)
    assert.strictEqual(contents3.includes('Place300'), false)
  })
})

describe('Retrieve place by user id', () => {
  test('a user created place can be retrieved by user id', async () => {
    // REGISTER
    const newUser = {
      name: 'TestPerson40',
      email: 'test@test40.com',
      password: '123456',
    }

    await api
      .post('/api/users/signup')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // LOGIN
    const existingUser = {
      email: 'test@test40.com',
      password: '123456',
    }

    const res = await api
      .post('/api/users/login')
      .send(existingUser)
      .expect(303)
      .expect('Content-Type', /application\/json/)

    assert.notStrictEqual(res.body.token.length, 0)

    const authorization = `bearer ${res.body.token}`

    const newPlace = {
      title: 'Place40',
      description: 'desc40',
      address: 'addr40',
      creator: res.body.userId,
    }

    // CREATE
    await api
      .post('/api/places')
      .set('Authorization', authorization)
      .send(newPlace)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // RETRIEVE
    const responsePlaces = await api
      .get(`/api/places/user/${res.body.userId}`)
      .set('Authorization', authorization)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
