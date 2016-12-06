/**
 * Created by LoughinsG on 06/12/2016.
 */

Ext.define('MyShoppingCartApp.controller.shoppingCartHelperClass', {
    extend: 'Ext.Base',

    alternateClassName: [
        'shoppingCartHelper'
    ],

    singleton: true,

    config: {
        cartID: null
    },

    setTheCartID: function(cartID){
        this.setCartID(cartID);
    },

    getTheCartID: function(){
        return this.getCartID();
    },

    //API calls

    /**
     * API call to retrieve all available products
     *
     * @param callback
     */
    callAPIToRetrieveAllProducts: function(callback){

        var request = new XMLHttpRequest();

        request.open('GET', 'https://private-anon-92ed47cddd-ddshop.apiary-mock.com/products');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
                callback(this.responseText);
            }
        };
        request.send();
    },


    /**
     * API call to retrieve a specific product detail
     *
     * @param productIdToRetrieve
     * @param callback
     */
    callAPIToRetrieveProductDetail: function(productIdToRetrieve,callback){
        var request = new XMLHttpRequest();

        request.open('GET', 'https://private-anon-92ed47cddd-ddshop.apiary-mock.com/products/' + productIdToRetrieve);

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
                callback(this.responseText);
            }
        };

        request.send();
    },

    /**
     * API call to post an item to the cart
     *
     * @param productId
     * @param callback
     */
    callAPIToPostItemToCart: function(productId,callback){
        var request = new XMLHttpRequest();

        request.open('POST', 'https://private-anon-92ed47cddd-ddshop.apiary-mock.com/cart');

        request.setRequestHeader('Content-Type', 'application/json');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);

                callback(this.responseText);
            }
        };

        var body = {
            'productId': productId
        };
        request.send(JSON.stringify(body));

    },

    /**
     * API call to remove item from the cart
     *
     * @param cartID
     * @param callback
     */
    callAPIToRemoveFromCart: function(cartID,callback){
        var request = new XMLHttpRequest();

        request.open('DELETE', 'https://private-anon-92ed47cddd-ddshop.apiary-mock.com/cart/'+ cartID);

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
                callback(this.responseText);
            }
        };

        request.send();

    }

});