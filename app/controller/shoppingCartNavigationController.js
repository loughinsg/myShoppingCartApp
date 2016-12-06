/**
 * Created by LoughinsG on 05/12/2016.
 */
Ext.define('MyShoppingCartApp.controller.shoppingCartNavigationController', {
    extend: 'Ext.app.Controller',

    config:{
        view:[
            'shoppingCartNavigationView'
        ],

        refs:{
            navigationView: 'navigationview#shoppingCartNavigationView',
            shoppingCartButton: 'button#shoppingCartButton',
            wishListButton: 'button#wishListButton',
            homeButton: 'button#homeButton'
        },
        control:{
            "#navBar #shoppingCartButton":{
                tap: 'onShoppingCartButtonTap'
            },
            "#navBar #wishListButton":{
                tap: 'onWishlistButtonTap'
            },
            "#navBar #homeButton":{
                tap: 'onHomeButtonTap'
            }
        }
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    onShoppingCartButtonTap: function(button, e, eOpts){
        console.log("Cart button tapped");

        //lets filter the products store by items in the cart
        var navView = this.getNavigationView();

        //open the cart view
        navView.push({
            xtype: 'cartContainer'
        });

    },

    onWishlistButtonTap: function(button, e, eOpts){
        console.log("Wishlist button tapped");
        var navView = this.getNavigationView();
        //open the cart view
        navView.push({
            xtype: 'wishListView'
        });
    },

    onHomeButtonTap: function(button,e,eOpts){
        var navView = this.getNavigationView();
        //open the cart view
        navView.reset();
    }


});