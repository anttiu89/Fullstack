describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Testaaja",
      username: "testi",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    const user2 = {
      name: "Testaaja2",
      username: "testi2",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user2)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.contains("log in to application")
  })

  describe("Login",function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("testi")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()

      cy.contains("Testaaja logged in")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("testi")
      cy.get("#password").type("nenialas")
      cy.get("#login-button").click()

      cy.get(".errorMessage").contains("wrong username or password")
      cy.get(".errorMessage").should("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.get("#username").type("testi")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()
    })

    it("A blog can be created", function() {
      cy.contains("create new blog").click()
      cy.get("#Title").type("TestTitle")
      cy.get("#Author").type("TestAuthor")
      cy.get("#Url").type("https://test.com")
      cy.get("#Create").click()

      cy.contains("TestTitle")
      cy.contains("TestAuthor")
    })

    it("A blog can be liked", function() {
      cy.contains("create new blog").click()
      cy.get("#Title").type("TestTitle")
      cy.get("#Author").type("TestAuthor")
      cy.get("#Url").type("https://test.com")
      cy.get("#Create").click()

      cy.get("#View").click()
      cy.contains("0")
      cy.get("#Like").click()
      cy.contains("1")
      cy.contains("a blog " + "TestTitle" + " by " + "TestAuthor" + " updated")
    })

    it("A blog can be removed", function() {
      cy.contains("create new blog").click()
      cy.get("#Title").type("TestTitle")
      cy.get("#Author").type("TestAuthor")
      cy.get("#Url").type("https://test.com")
      cy.get("#Create").click()

      cy.get("#View").click()
      cy.get("#Remove").click()
      cy.contains("a blog " + "TestTitle" + " by " + "TestAuthor" + " removed").click()
    })

    it("A blog can not be removed by wrong user", function() {
      cy.contains("create new blog").click()
      cy.get("#Title").type("TestTitle")
      cy.get("#Author").type("TestAuthor")
      cy.get("#Url").type("https://test.com")
      cy.get("#Create").click()

      cy.get("#Logout").click()
      cy.get("#username").type("testi2")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()

      cy.get("#View").click()
      cy.get("#Remove").should("not.exist")
    })

    it("A blog which is liked most is on top", function() {
      cy.contains("create new blog").click()
      cy.get("#Title").type("The title with the most likes")
      cy.get("#Author").type("TestAuthor")
      cy.get("#Url").type("https://test.com")
      cy.get("#Create").click()

      cy.contains("create new blog").click()
      cy.get("#Title").type("The title with the second most likes")
      cy.get("#Author").type("TestAuthor")
      cy.get("#Url").type("https://test.com")
      cy.get("#Create").click()
      cy.wait(1000)

      cy.get(".buttonView").eq(1).click()
      cy.get(".buttonLike").eq(0).click()
      cy.get(".buttonHide").eq(0).click()
      cy.wait(1000)

      cy.get(".buttonView").eq(1).click()
      cy.get(".buttonLike").eq(0).click()
      cy.get(".buttonLike").eq(0).click()
      cy.get(".buttonHide").eq(0).click()

      cy.get(".blog").eq(0).should("contain", "The title with the most likes")
      cy.get(".blog").eq(1).should("contain", "The title with the second most likes")
    })
  })
})
