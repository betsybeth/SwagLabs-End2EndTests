const LoginPage = require('../pageobjects/login.page');
const expect =  require('chai').expect


describe('My Login application', () => {

    before( async() => {
          await LoginPage.open()
          await LoginPage.login('standard_user', 'secret_sauce');
    })
    
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        expect( await browser.getUrl()).to.equal("https://www.saucedemo.com/inventory.html")
        
    });

    it("should add two Products to cart", async() => {
        await LoginPage.addProductToCart()
        const getShoppingBadgeText = await (await LoginPage.shoppingbadge).getText()
        // Asserts two products have been added to the cart
        expect(getShoppingBadgeText ).to.equal("2")
    })

    it("should checkout Product for payment", async() => {
        await LoginPage.checkoutProducts()
        expect(await browser.getUrl()).to.equal("https://www.saucedemo.com/checkout-complete.html")

    })

    it('should logout successfully', async() => {
        await LoginPage.logout()
        expect( await browser.getUrl()).to.equal("https://www.saucedemo.com/index.html")
    })
});
