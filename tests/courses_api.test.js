const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Course = require('../models/course')
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
    courses: [],
  },
  {
    name: 'TestPerson20',
    email: 'test@test20.com',
    password: 'testtest20',
    courses: [],
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('courses are returned as json', async () => {
  const response = await api.get('/api/users')
  const creator = response.body.users[0].id

  const initialCourses = [
    {
      title: 'Course10',
      description: 'desc10',
      labs: [{ name: 'lab10', password: '123' }],
      creator: creator,
    },
    {
      title: 'Course20',
      description: 'desc20',
      labs: [
        { name: 'lab20', password: '123' },
        { name: 'lab21', password: '123' },
      ],
      creator: creator,
    },
  ]

  await Course.deleteMany({})
  let courseObject = new Course(initialCourses[0])
  await courseObject.save()
  courseObject = new Course(initialCourses[1])
  await courseObject.save()

  await api
    .get('/api/courses')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two courses', async () => {
  const response = await api.get('/api/courses')
  assert.strictEqual(response.body.courses.length, 2)
})

test('the second lab of the second course is lab21', async () => {
  const response = await api.get('/api/courses')
  const contents = response.body.courses.map((p) => p.labs)
  assert.strictEqual(Object.values(contents[1][1]).includes('lab21'), true)
})

test('the first course can be retrieved by its id', async () => {
  const response = await api.get('/api/courses')
  const courseById = await api.get(
    `/api/courses/${response.body.courses[0].id}`
  )

  const title = courseById.body.course.title
  assert.strictEqual(title, 'Course10')
})

describe('Create, edit and delete', () => {
  test('a course can be created, edited and deleted', async () => {
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
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.notStrictEqual(res.body.token.length, 0)

    const authorization = `bearer ${res.body.token}`

    const newCourse = {
      title: 'Course30',
      description: 'desc30',
      labs: [
        { name: 'lab30', password: '123' },
        { name: 'lab31', password: '123' },
      ],
      creator: res.body.userId,
    }

    // CREATE
    await api
      .post('/api/courses')
      .set('Authorization', authorization)
      .send(newCourse)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseCourses1 = await api.get('/api/courses')
    assert.strictEqual(responseCourses1.body.courses.length, 3)
    const contents1 = responseCourses1.body.courses.map((p) => p.labs)
    assert.strictEqual(Object.values(contents1[2][1]).includes('lab31'), true)

    // EDIT
    const editedCourse = {
      title: 'Course300',
      description: 'desc300',
      creator: res.body.userId,
    }

    await api
      .patch(`/api/courses/${responseCourses1.body.courses[2].id}`)
      .set('Authorization', authorization)
      .send(editedCourse)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responseCourses2 = await api.get('/api/courses')
    assert.strictEqual(responseCourses2.body.courses.length, 3)
    const contents2 = responseCourses2.body.courses.map((p) => p.title)
    assert.strictEqual(Object.values(contents2).includes('Course300'), true)

    // DELETE
    await api
      .delete(`/api/courses/${responseCourses1.body.courses[2].id}`)
      .set('Authorization', authorization)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responseCourses3 = await api.get('/api/courses')
    assert.strictEqual(responseCourses3.body.courses.length, 2)
    const contents3 = responseCourses3.body.courses.map((p) => p.title)
    assert.strictEqual(Object.values(contents3).includes('Course300'), false)
  })
})

describe('Retrieve course by user id', () => {
  test('a user created course can be retrieved by user id', async () => {
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
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.notStrictEqual(res.body.token.length, 0)
    const authorization = `bearer ${res.body.token}`

    const newCourse = {
      title: 'Course40',
      description: 'desc40',
      labs: [{ name: 'lab40', password: '123' }],
      creator: res.body.userId,
    }

    // CREATE
    await api
      .post('/api/courses')
      .set('Authorization', authorization)
      .send(newCourse)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // RETRIEVE
    const responseCourses = await api
      .get(`/api/courses/user/${res.body.userId}`)
      .set('Authorization', authorization)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await Course.deleteMany({})
  await User.deleteMany({})
  await mongoose.connection.close()
})
