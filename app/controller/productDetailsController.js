/*
 * created by Gareth Loughins - product detail controller
 */

Ext.define('MyShoppingCartApp.controller.productDetailsController', {
    extend: 'Ext.app.Controller',

    requires:[
        'MyShoppingCartApp.controller.shoppingCartHelperClass'
    ],

    config: {

        productDetailObject: {},

        refs: {
            navView: 'navigationview#shoppingCartNavigationView',
            productDetailContainer: 'container#productDetailContainer',
            wishListButtonReference: 'button#addToWishListButton',
            cartButtonReference: 'button#addToCartButton',
            productDescLabelData: 'label#productDescLabelData',
            productPriceLabelData: 'label#productPriceDataLabel',
            productQuantityDataLabel: 'label#productQuantityDataLabel',
            productWishListCommentsLabel: 'label#productWishListCommentsLabel',
            productCartCommentsLabel: 'label#productCartCommentsLabel'
        },
        control:{

            productDetailContainer:{
                initialize: 'onInitializeProductDetailScreen',
                show: 'show'
            },

            "#productDetailButtonToolbar #addToWishListButton":{
                tap: 'onWishListButtonTap'
            },

            "#productDetailButtonToolbar #addToCartButton":{
                tap: 'onCartButtonTap'
            }
        }
    },

    /**
     * on initialisation of the product detail controller
     *
     * @param component
     * @param eOpts
     */
    onInitializeProductDetailScreen: function(component,eOpts){
        this.setProductDetailObject(component.getInitialConfig().productDetailObject);
    },

    /**
     * show event for product detail
     *
     * @param component
     * @param eOpts
     * @returns{void}
     */
    show: function(component, eOpts){
        var productId = this.getProductDetailObject().productId,
            productsStore = Ext.getStore('productsStore');

        productsStore.clearFilter();
        var storeIndex = productsStore.findExact("productId",productId),
            productRecord = productsStore.getAt(storeIndex),
            productDetailObject;

        productDetailObject = productRecord.getData();
        this.setupLabelsAndButtons(productDetailObject);
    },


    /**
     * sets up labels and buttons on this view
     * @param productDetailObject
     * @returns {void}
     */
    setupLabelsAndButtons: function(productDetailObject){

        this.getProductDescLabelData().setHtml(productDetailObject.name);
        this.getProductPriceLabelData().setHtml("£"+productDetailObject.price.toFixed(2));
        this.getProductQuantityDataLabel().setHtml(productDetailObject.stock);

        if(productDetailObject.stock < 1){
            this.getCartButtonReference().setDisabled(true);
        }
        if (productDetailObject.noInCart > 0){
            this.getProductCartCommentsLabel().setHtml(productDetailObject.noInCart + " of these items have been added to your shopping cart");
        }
        else{
            this.getProductCartCommentsLabel().setHtml("");
        }
        if(productDetailObject.inWishList){
            this.getWishListButtonReference().setDisabled(true);
        }
        else{
            this.getWishListButtonReference().setDisabled(false);
        }

    },

    /**
     * wish list button tap event
     *
     * @param button
     * @param e
     * @param eOpts
     * @returns {void}
     */
    onWishListButtonTap: function(button, e, eOpts){

        // update store in indicate product added to wish list
        var productsStore = Ext.getStore('productsStore'),
            storeIndex,record,
            productId = this.getProductDetailObject().productId;


        storeIndex = productsStore.findExact("productId",productId);
        record = productsStore.getAt(storeIndex);
        record.set("inWishList",true);
        this.getWishListButtonReference().setDisabled(true);
        Ext.Msg.alert("Product added to Wishlist");

    },

    /**
     * on cart button tap event
     *
     * @param button
     * @param e
     * @param eOpts
     * @returns {void}
     */
    onCartButtonTap: function(button, e, eOpts){
        var productsStore = Ext.getStore('productsStore'),
            storeIndex,record,
            currentNoInCart,
            currentNoInStock,
            productId = this.getProductDetailObject().productId;


        storeIndex = productsStore.findExact("productId",productId);
        record = productsStore.getAt(storeIndex);
        currentNoInCart = record.get('noInCart');
        currentNoInStock = record.get('stock');


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

            record.set("noInCart",currentNoInCart);
            record.set("stock",currentNoInStock);

            this.getProductQuantityDataLabel().setHtml(currentNoInStock);

            //message to user to indicate item added to cart
            this.getProductCartCommentsLabel().setHtml(currentNoInCart + " of these items have been added to your shopping cart");
            if(currentNoInStock < 1){
                this.getCartButtonReference().setDisabled(true);
                this.getProductCartCommentsLabel().setHtml(currentNoInCart + " of these items have been added to your shopping cart.  There is no more in stock");
            }

        }.bind(this));
    }



});