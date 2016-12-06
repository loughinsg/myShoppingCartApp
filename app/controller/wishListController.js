/**
 * Created by LoughinsG on 06/12/2016.
 */
Ext.define('MyShoppingCartApp.controller.wishlistController', {
    extend: 'Ext.app.Controller',

    views:[
        'wishListView'
    ],

    requires:[
        'MyShoppingCartApp.controller.shoppingCartHelperClass'
    ],

    config: {
        refs: {
            navView: 'navigationview#shoppingCartNavigationView',
            wishlistList: 'list#wishlistList',
            wishlistContainer: 'container#wishlistContainer'
        },
        control:{
            wishlistContainer:{
                initialize: 'initialiseWishlist',
                show: 'show',
                deactivate: 'deactivate'
            },
            "list#wishlistList": {
                itemtap: 'onWishListItemTap'
            }
        }

    },

    show: function(component, eOpts) {
        //filter the store by wish list items on the painted event to ensure the screen is refreshed
        //if this screen is a result of the back button tap
        var productsStore = Ext.getStore('productsStore');
        productsStore.filterProductsByWishListItems();

        //disable the wishlist button as we are on that screen already
        this.getNavView().getNavigationBar().rightBox.items.items[1].setDisabled(true);

    },

    deactivate: function(oldActiveItem, container, newActiveItem, eOpts){
        //when we are deactivating the view lets enable the wish list button again
        this.getNavView().getNavigationBar().rightBox.items.items[1].setDisabled(false);

    },


    initialiseWishlist: function(){

    },

    onWishListItemTap: function(dataview, index, target, record, e, eOpts){
        //show a message box asking the user what option they prefer

        Ext.Msg.show({

            title: 'Option Confirmation',
            message: 'Select an action...',

            scope: this,
            buttons : [

                {

                    itemId : 'removeWishlist',
                    id: 'removeWishlist',
                    text   : 'Remove'
                },
                {

                    itemId : 'addToCart',
                    id : 'addToCart',
                    text   : 'Add to cart'
                },
                {

                    itemId : 'doNothing',
                    id : 'doNothing',
                    text   : 'Cancel'
                }
            ],
            fn: function(btn) {
                var productsStore = Ext.getStore('productsStore'),
                    storeIndex,productRecord,
                    currentNoInCart,currentNoInStock,
                    productId = record.get('productId');

                storeIndex = productsStore.findExact("productId",productId);
                productRecord = productsStore.getAt(storeIndex);
                currentNoInCart = productRecord.get('noInCart');
                currentNoInStock = productRecord.get('stock');

                if (btn === 'removeWishlist'){
                    console.log("Remove item from wish list");
                    productRecord.set("inWishList",false);
                }
                else if (btn === 'addToCart'){
                    console.log("Add item to cart");
                    if(currentNoInStock > 0){
                        Ext.Viewport.setMasked({
                            xtype    : 'loadmask',
                            indicator: true,
                            message  : "Posting product to Cart..."
                        });

                        //call API to ACCEPT a POST of an item into the shopping cart
                        shoppingCartHelper.callAPIToPostItemToCart(productId,function(result){

                            shoppingCartHelper.setTheCartID(JSON.parse(result).cartId);

                            Ext.Viewport.setMasked(false);

                            currentNoInCart++;
                            currentNoInStock--;

                            productRecord.set("noInCart",currentNoInCart);
                            productRecord.set("stock",currentNoInStock);
                            productRecord.set("inWishList",false);
                            Ext.Msg.alert("Item added to cart");
                        }.bind(this));
                    }
                    else{
                        Ext.Msg.alert("Currently out of stock");
                    }
                }
            }
        });


    }
});

