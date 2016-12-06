/*
 created by Gareth Loughins - categories controller
 */

Ext.define('MyShoppingCartApp.controller.categoriesContainerController', {
    extend: 'Ext.app.Controller',

    requires:[
        'MyShoppingCartApp.controller.shoppingCartHelperClass'
    ],

    config: {
        views: [
            'categoriesContainer'
        ],

        refs: {
            navView: 'navigationview#shoppingCartNavigationView',
            categoriesContainer: 'container#categoriesContainer'
        },
        control:{
            categoriesContainer:{
                initialize: 'onInitializeCategoryScreen',
                show: 'show'
            },

            "list#categoriesList": {
                itemtap: 'onCategoryItemTap'
            }
        }
    },

    /**
     * initialising the category (home) screen
     * @returns {void}
     */
    onInitializeCategoryScreen: function(){

        //on initialisation of this screen we need to call the API to retrieve all products and
        //load them into the store

        var productsStore = Ext.getStore('productsStore'),
            valuesForStore = [];

        //load mask so user cannot do anything until store is loaded
        Ext.Viewport.setMasked({
            xtype    : 'loadmask',
            indicator: true,
            message  : "Retrieving Categories and Product Details"
        });

        shoppingCartHelper.callAPIToRetrieveAllProducts(function(responseText){

            var responseArray = JSON.parse(responseText);

            if(!Ext.isEmpty(responseArray)){

                responseArray.forEach(function(value, index, array){
                    value.noInCart = 0;
                    value.inWishList = false;
                    valuesForStore.push(value);
                });

                productsStore.loadProductsStore({
                    scope: this,
                    isInitialLoad: true,
                    productItems: valuesForStore,
                    success: function(){
                        console.log("Loaded Products Store successfully");
                        Ext.Viewport.setMasked(false);
                    },
                    failure: function(){
                        console.log("Failed to load Products Store");
                        Ext.Viewport.setMasked(false);
                    }
                })
            }
            else{
                Ext.Viewport.setMasked(false);
            }
        }.bind(this));

    },

    show: function(component, eOpts) {
        this.getNavView().getNavigationBar().leftBox.items.items[0].hide();
    },



    /**
     * tap event on an item from the category list
     *
     * @param dataview
     * @param index
     * @param target
     * @param record
     * @param e
     * @param eOpts
     * @returns {void}
     *
     */
    onCategoryItemTap: function(dataview, index, target, record, e, eOpts) {
        var navView = this.getNavView();

        navView.push({
            xtype: 'productsByCatView',
            categoryName: record.get('categoryName')
        });

    }
});