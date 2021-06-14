/// <reference types="Cypress" />
describe('My Delta Exchange Test Suite', function()
{
    before(function () {
        cy.fixture('example').then(function (data) {
           this.data = data
        })
    })
    it('My First Test Case', function()
     {
        Cypress.env('url')
        cy.visit(Cypress.env('url'))
        //Click on SignIn button
        cy.get('a[class="login"]').click()
        cy.get('input[id="email"]').type(this.data.email).should('have.value', this.data.email).scrollIntoView()
        cy.get('input[id="passwd"]').type(this.data.password).should('have.value', this.data.password).scrollIntoView()
        cy.get('i[class="icon-lock left"]').click({force: true})
        //Navigate to Dresses Page
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').scrollIntoView().click({force: true})
        cy.get('.first-in-line.first-item-of-tablet-line > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click({force: true}).scrollIntoView()
        cy.get('.continue > span').click({force: true}).scrollIntoView()
        cy.get('a[title="View my shopping cart"]').scrollIntoView().click({force: true})
        cy.contains('Printed Dress')
        cy.get('span[class="heading-counter"] span[id="summary_products_quantity"]').should('have.text', '1 Product').scrollIntoView()
        cy.get('i[class="icon-plus"]').click()
        cy.wait(4000)
        cy.get('span[class="heading-counter"] span[id="summary_products_quantity"]').should('have.text', '2 Products').scrollIntoView()
        cy.get('span[id="total_price"]').should('have.text', '$54.00')
        cy.wait(4000)
        
        var sum=0
        cy.get('span[id="total_product_price_3_13_519738"]').each(($el, index, $list) => {
            const amount=$el.text()
            var res=amount.split("$")
            var res1=res[1].trim()
            sum=Number(sum)+Number(res1)
        }).then(function()
        {
            cy.log(sum)
        })
        cy.get('span[id="total_price"]').then(function(element)
        {
            const actual_amount=element.text()
            const final_sum= sum+2        
            var expected_amount= parseFloat(final_sum).toFixed(2)
            cy.log("actual_amount",actual_amount)
            cy.log("final_sum",final_sum)
            cy.log("expected_amount",expected_amount)
            expect("$"+expected_amount).to.equal(actual_amount)
        })
        cy.get('a[class="button btn btn-default standard-checkout button-medium"]').click()

        //Address Page
        cy.get('h1[class="page-heading"]').should('have.text', 'Addresses').scrollIntoView()
        cy.get('textarea[class="form-control"]').type('Hello,This is my First Order check.').scrollIntoView()
        cy.get('button[class="button btn btn-default button-medium"]').click()
        
        //Shipping Page
        cy.get('h1[class="page-heading"]').should('have.text', 'Shipping').scrollIntoView()
        cy.get('button[class="button btn btn-default standard-checkout button-medium"]').click().scrollIntoView()
        cy.get('p[class="fancybox-error"]').should('have.text', 'You must agree to the terms of service before continuing.').scrollIntoView()
        cy.get('a[class="fancybox-item fancybox-close"]').click()
        cy.get('input[id="cgv"]').check().should('be.checked').scrollIntoView()
        cy.get('button[class="button btn btn-default standard-checkout button-medium"]').click()

        //Payment Page
        cy.get('h1[class="page-heading"]').should('have.text', 'Please choose your payment method').scrollIntoView()
        cy.get('a[class="cheque"]').click({force: true})
        cy.get('h3[class="page-subheading"]').should('have.text','Check payment').scrollIntoView()
        cy.get('button[class="button btn btn-default button-medium"]').click({force: true})
        cy.get('p[class="alert alert-success"]').should('have.text','Your order on My Store is complete.').scrollIntoView()
        
        //cy.get('a[class="button-exclusive btn btn-default"]').click()
    })
})