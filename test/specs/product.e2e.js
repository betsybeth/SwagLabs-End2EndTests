const LoginPage = require('../pageobjects/product.page');
const expect =  require('chai').expect

  
describe('Swag Labs application', () => {

    before( async() => {
        await LoginPage.login('standard_user', 'secret_sauce');
    })

    it('should login with valid credentials', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        expect( await browser.getUrl()).to.equal("https://www.saucedemo.com/inventory.html")
        
    });

     
    it("should add two Products to cart", async() => {
        await LoginPage.addProductToCart()
        const getShoppingBadgeText = await (await LoginPage.shoppingbadge).getText()
        const fleeceItemText = await (await LoginPage.fleeceinventoryItemSelector).getText()
        const bikeItemText = await (await LoginPage.bikeinventoryItemSelector).getText()
        // Asserts two products have been added to the cart
        expect(getShoppingBadgeText ).to.equal("2")
        expect(fleeceItemText).to.equal("Sauce Labs Fleece Jacket")
        expect(bikeItemText).to.equal("Sauce Labs Bike Light")
      
    })

    it("should checkout Product for payment", async() => {
        await LoginPage.checkoutProducts()
        expect(await browser.getUrl()).to.equal("https://www.saucedemo.com/checkout-complete.html")

    })
    
    it('should logout successfully', async() => {
        await LoginPage.logout()
        expect( await browser.getUrl()).to.equal("https://www.saucedemo.com/index.html")
    })
    
})

