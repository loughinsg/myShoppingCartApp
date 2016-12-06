/*
 * created by Gareth Loughins - shopping cart controller
 */

Ext.define('MyShoppingCartApp.controller.cartController', {
    extend: 'Ext.app.Controller',

    views:[
        'cartContainer'
    ],

    requires:[
        'MyShoppingCartApp.controller.shoppingCartHelperClass'
    ],

    config: {
        refs: {
            navView: 'navigationview#shoppingCartNavigationView',
            cartList: 'list#cartList',
            cartViewContainer: 'container#cartViewContainer' ,
            cartTitleBar: 'titlebar#cartTitleBar'
        },
        control:{
            cartViewContainer:{
                initialize: 'initialiseCart',
                show: 'show',
                deactivate: 'deactivate'
            },
            "list#cartList": {
                itemtap: 'onCartItemTap'
            }
        }

    },

    initialiseCart: function(){

    },

    show: function(component, eOpts) {
        var productsStore = Ext.getStore('productsStore');
        productsStore.filterProductsByCart();

        var cartPrice = this.calculatePriceOfCart(),
            decimalConverted = "£"+cartPrice.toFixed(2);

        this.getCartTitleBar().setTitle("Shopping Cart Value: " + decimalConverted);

        this.getNavView().getNavigationBar().rightBox.items.items[2].setDisabled(true);
    },

    deactivate: function(oldActiveItem, container, newActiveItem, eOpts){
        this.getNavView().getNavigationBar().rightBox.items.items[2].setDisabled(false);
    },

    /**
     * calculate the price of the cart
     *
     * @returns {number}
     */
    calculatePriceOfCart: function(){
        var price = 0,
            productsStore = Ext.getStore('productsStore');

        // Loop around each record in the store
        for (var i=0, len = productsStore.getCount(); i < len; i++) {
            var productRecord = productsStore.data.items[i].data,
                pricePerUnit = productRecord.price,
                noOfUnits = productRecord.noInCart,
                pricePerProduct = pricePerUnit * noOfUnits;

            price = price + pricePerProduct;
        }

        return price;
    },

    onCartItemTap: function(dataview, index, target, record, e, eOpts){

        //this will fire an event to remove the item from the cart
        Ext.Viewport.setMasked({
            xtype    : 'loadmask',
            indicator: true,
            message  : "Removing product from cart..."
        });

        var productsStore = Ext.getStore('productsStore'),
            productID = record.get('productId'),
            storeIndex = productsStore.findExact("productId",productID),
            productRecord = productsStore.getAt(storeIndex),
            currentNoInCart = productRecord.get('noInCart'),
            currentNoInStock = productRecord.get('stock'),
            cartID = shoppingCartHelper.getTheCartID();

        //get the cart id so we can call the API to remove the product
        shoppingCartHelper.callAPIToRemoveFromCart(cartID,function(result){
            var cartPrice;

            Ext.Viewport.setMasked(false);

            currentNoInStock = currentNoInStock +currentNoInCart;
            currentNoInCart = 0;
            productRecord.set("noInCart",currentNoInCart);
            productRecord.set("stock",currentNoInStock);
            cartPrice = this.calculatePriceOfCart();

            this.getCartTitleBar().setTitle("Shopping Cart Value: £"+cartPrice.toFixed(2));

            //refresh the list as the store was updated
            this.getCartList().refresh();

        }.bind(this));
    }

});