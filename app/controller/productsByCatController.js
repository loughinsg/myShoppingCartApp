/*
 * created by Gareth Loughins - products by category controller
 */

Ext.define('MyShoppingCartApp.controller.productsByCatController', {
    extend: 'Ext.app.Controller',

    config: {
        categoryName: null,

        requires:[
            'MyShoppingCartApp.controller.shoppingCartHelperClass'
        ],

        views: [
            'productsByCatView'
        ],


        refs: {
            navView: 'navigationview#shoppingCartNavigationView',
            productsByCatView: 'container#productsByCatView',
            categoryByNameTitleBar: 'titlebar#categoryByNameTitleBar'
        },
        control:{
            productsByCatView:{
                initialize: 'onInitializeProductsByCatScreen',
                show: 'show'
            },

            "list#productByCatList": {
                itemtap: 'onProductItemTap'
            }
        }
    },

    /**
     * on initialisation of the controller
     *
     * @param component
     * @param eOpts
     * @returns{void}
     */
    onInitializeProductsByCatScreen: function(component, eOpts){
        this.setCategoryName(component.getInitialConfig().categoryName);
        this.getCategoryByNameTitleBar().setTitle(component.getInitialConfig().categoryName);

    },

    /**
     * on the show event
     *
     * @param component
     * @param eOpts
     * @returns {void}
     */
    show: function(component, eOpts) {
        var productsStore = Ext.getStore('productsStore');
        productsStore.filterProductsByCategory(this.getCategoryName());
    },


    /**
     * tap event when selecting a product item
     *
     * @param dataview
     * @param index
     * @param target
     * @param record
     * @param e
     * @param eOpts
     * @returns {void}
     */
    onProductItemTap: function(dataview, index, target, record, e, eOpts){

        var navView = this.getNavView(),
            productId = record.get('productId');

        //load mask so user cannot do anything until store is loaded
        Ext.Viewport.setMasked({
            xtype    : 'loadmask',
            indicator: true,
            message  : "Retrieving Product Detail..."
        });

        //call the API to get the details of a product
        shoppingCartHelper.callAPIToRetrieveProductDetail(productId,function(responseText){
            var productDetailObject = JSON.parse(responseText);

            Ext.Viewport.setMasked(false);


            //this API call always appears to bring back the same product despite what product id
            //is passed through as the argument.  So, I have decided to use the current store as it
            //contains all of the products details anyway.  The call to API is still here for the benefit
            //of the reviewer, although it is redundant

            var productsStore = Ext.getStore('productsStore'),
                storeIndex = productsStore.findExact("productId",productId),
                productRecord = productsStore.getAt(storeIndex);

            productDetailObject = productRecord.getData();

            navView.push({
                xtype: 'productDetailContainer',
                productDetailObject: productDetailObject
            });
        }.bind(this));
    }

});