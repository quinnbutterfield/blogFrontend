describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Quinn Butterfield',
      username: 'quinn',
      password: 'password'

    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('log in')
    cy.contains('WELCOME TO THE BLOGOSPHERE')
    
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('quinn')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Quinn Butterfield logged-in')
    })
    it('fails with wrong password', function () {
      cy.contains('log in').click()
      cy.get('#username').type('quinn')
        .get('#password').type('wrong')
        .get('#login-button').click()

      cy.get('.error')
        .should('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('contain', 'Wrong credentials')

      cy.get('html').should('not.contain', 'Quinn Butterfield logged in')
    })

    describe('When a user is logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'quinn', password: 'password' })
      })
      it('A blog can be created and deleted by its creator', function () {
        const blog = {
          author: 'fred',
          title: 'a blog',
          url: 'www.google.com',
          likes: 441
        }
        cy.contains('new blog').click()
        cy.get('#title').type(blog.title)
          .get('#author').type(blog.author)
          .get('#url').type(blog.url)
          .get('#create-button').click()
        cy.get('.notif')
          .contains('was created')
        cy.get('.blog')
          .contains(blog.title)
          .contains('view')

        cy.get('.blog')
          .contains('view').click()
        cy.get('.blog')
          .contains('remove')


      })

      describe('And a blog is in the list', function () {
        beforeEach(function () {
          const blog = {
            author: 'fred',
            title: 'a blog',
            url: 'www.google.com',
            likes: 441
          }
          cy.createBlog(blog)
        })
        it('A blog can be liked by the user', function () {
          cy.get('.blog')
            .contains('view').click()
          cy.get('.blog').contains('likes: 441')
            .contains('like').click()
          cy.get('.blog').contains('likes: 442')
        })


      })
      describe('And a few blogs are in the list', function () {
        beforeEach(function () {
          const blog = {
            author: 'fred',
            title: 'a blog',
            url: 'www.google.com',
            likes: 441
          }
          cy.createBlog(blog)
          cy.createBlog({ ...blog, likes: 30 })
          cy.createBlog({ ...blog, likes: 6000 })
        })

        it('The blogs are sorted by the number of likes', function () {
          //cy.get('.toggleButton').click({ multiple: true })
          cy.get('.blog').then(blogs => {
            cy.wrap(blogs[0]).contains('view').click()
            cy.wrap(blogs[0]).contains('6000')
            cy.wrap(blogs[1]).contains('view').click()
            cy.wrap(blogs[1]).contains('441')
            cy.wrap(blogs[2]).contains('view').click()
            cy.wrap(blogs[2]).contains('30')
          })



        })
      })
    })

  })
})