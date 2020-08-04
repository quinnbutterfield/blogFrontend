import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component

  const mockAddLike = jest.fn()
  const mockRemoveBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      author: 'fred',
      title: 'a blog',
      url: 'www.google.com',
      likes: 441
    }

    const user = {
      id: 'useridstring'
    }

    component = render(

      <Blog blog={blog} addLike={mockAddLike}
        removeBlog={mockRemoveBlog} user={user} />

    )
  })

  test('renders only title when unexpanded', () => {

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'a blog'
    )
    expect(div).not.toHaveTextContent(
      'www.google.com'
    )

  })

  test('additionally renders likes and url when expanded', () => {

    const div = component.container.querySelector('.blog')
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(div).toHaveTextContent(
      'a blog'
    )
    expect(div).toHaveTextContent(
      'www.google.com'
    )
    expect(div).toHaveTextContent(
      '441'
    )
  })

  test('clicking the like button twice will call the add like function twice', () => {

    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockAddLike.mock.calls).toHaveLength(2)

  })


})

