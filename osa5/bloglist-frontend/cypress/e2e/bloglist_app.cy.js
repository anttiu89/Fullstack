describe("Bloglist ", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Testaaja",
      username: "testi",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user) 
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function() {
    cy.contains("log in to application")
  })

  it("user can log in", function() {
    cy.get("#username").type("testi")
    cy.get("#password").type("salainen")
    cy.get("#login-button").click()

    cy.contains("Testaaja logged in")
  })

  describe("when logged in", function() {
    // ...
  })
})
