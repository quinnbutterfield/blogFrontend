import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('Correct event handler is called from new blog form', () => {
  /* const blog = {
     author: 'fred',
     title: 'a blog',
     url: 'www.google.com',
     likes: 441
   }

   const user = {
     id: 'useridstring'
   } */

  const mockSetBlogs = jest.fn()
  const mockShowError = jest.fn()

  let component = render(
    <BlogForm {...{ mockSetBlogs, mockShowError }} />
  )

  const author = component.container.querySelector('#author')
  fireEvent.change(author, { target: { value: 'fred' } })
  component.debug()
  expect(author.value).toBe('fred')
})
