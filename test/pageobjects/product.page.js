const faker = require("faker");



class LoginPage {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('#user-name') }
    get inputPassword () { return $('#password') }
    get btnSubmit () { return $('#login-button') }
    get addToFleeceProductBtn() {return $('.inventory_item:nth-child(1) button')}
    get addToBikeProductBtn() { return $('.inventory_item:nth-child(3) button')}
    get shoppingCartIcon() {return $('.shopping_cart_link')}
    get checkoutBtn() {return $('.checkout_button')}
    get inputFirstname() {return $('#first-name')}
    get inputLastname() {return $('#last-name')}
    get inputZipCode() {return $('#postal-code')}
    get continueBtn() {return $('input[value="CONTINUE"]')}
    get FinishBtn() {return $('.cart_button')} 
    get logoutSidebarLink() { return $('=Logout')}
    get sideBarMenu() {return $('.bm-burger-button > button:nth-child(2)')} 
    get shoppingbadge() { return $('.shopping_cart_badge')}
    get fleeceinventoryItemSelector () { return $('#item_5_title_link > div')}
    get bikeinventoryItemSelector() {return $('#item_0_title_link > div')}

    
    async goToAppUrl() {
        await browser.url("https://www.saucedemo.com/")
    }

    async login (username, password) {
        await this.goToAppUrl()
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
    }

    async logout() {
        await(await this.sideBarMenu).click() 
        await(await this.logoutSidebarLink).click() 
    }

     async inputCheckoutInfo() {
         const firstName = await faker.name.firstName()
         const lastName = await faker.name.lastName()
         const zipCode = await faker.address.zipCode()
         await(await this.inputFirstname).setValue(firstName)
         await(await this.inputLastname).setValue(lastName)
         await(await this.inputZipCode).setValue(zipCode)
        
     }
    async addProductToCart() {
          await(await this.addToFleeceProductBtn).click()
          await(await this.addToBikeProductBtn).click()      
    }

    async checkoutProducts() {
          await(await this.shoppingCartIcon).click()
          await(await this.checkoutBtn).click() 
          await this.inputCheckoutInfo()
          await(await this.continueBtn).click()
          await(await this.FinishBtn).click() 
    }
}

module.exports = new LoginPage();
