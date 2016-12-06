/*
 * created by Gareth Loughins - products store
 */

Ext.define('MyShoppingCartApp.store.productsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.productsStore',

    requires: [
        'MyShoppingCartApp.model.productModel'
    ],

    config: {
        data: [
            {
                productId: 1,
                name: 'Almond Toe Court Shoes, Patent Black',
                category: 'Womens Footwear',
                price: 99,
                oldPrice: null,
                stock: 5,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 2,
                name: 'Suede Shoes, Blue',
                category: 'Womens Footwear',
                price: 42,
                oldPrice: null,
                stock: 4,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 3,
                name: 'Leather Driver Saddle Loafers, Tan',
                category: 'Mens Footwear',
                price: 34,
                oldPrice: null,
                stock: 12,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 4,
                name: 'Flip Flops, Red',
                category: 'Mens Footwear',
                price: 19,
                oldPrice: null,
                stock: 6,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 5,
                name: 'Flip Flops, Blue',
                category: 'Mens Footwear',
                price: 19,
                oldPrice: null,
                stock: 0,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 6,
                name: 'Gold Button Cardigan, Black',
                category: 'Womens Casualwear',
                price: 167,
                oldPrice: null,
                stock: 6,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 7,
                name: 'Cotton Shorts, Medium Red',
                category: 'Womens Casualwear',
                price: 30,
                oldPrice: null,
                stock: 5,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 8,
                name: 'Fine Stripe Short Sleeve Shirt, Grey',
                category: 'Mens Casualwear',
                price: 49.99,
                oldPrice: null,
                stock: 9,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 9,
                name: 'Fine Stripe Short Sleeve Shirt, Green',
                category: 'Men\'s Casualwear',
                price: 39.99,
                oldPrice: 49.99,
                stock: 3,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 10,
                name: 'Sharkskin Waistcoat, Charcoal',
                category: 'Mens Formalwear',
                price: 75,
                oldPrice: null,
                stock: 2,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 11,
                name: 'Lightweight Patch Pocket Blazer, Deer',
                category: 'Mens Formalwear',
                price: 175,
                oldPrice: null,
                stock: 1,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 12,
                name: 'Bird Print Dress, Black',
                category: 'Womens Formalwear',
                price: 270,
                oldPrice: null,
                stock: 10,
                noInCart: 0,
                inWishList: false
            },
            {
                productId: 13,
                name: 'Mid Twist Cut-Out Dress, Pink',
                category: 'Womens Formalwear',
                price: 540,
                oldPrice: null,
                stock: 5,
                noInCart: 0,
                inWishList: false
            }
        ],
        model: 'MyShoppingCartApp.model.productModel',
        storeId: 'productsStore',
        proxy:{
            type:'ajax',
            reader: {
                type: 'array'
            }
        }
    },

    loadProductsStore: function(options) {

        var productItems = options.productItems,
            productItemTemplate,
            productModel = Ext.ModelManager.getModel('MyShoppingCartApp.model.productModel'),
            dynamicFields =[];

        if (options.isInitialLoad){

            productItemTemplate = productItems[0]; //assuming all records returned have the same fields
            this.removeAll(true);
            this.clearFilter();

            //build up a list of dynamic fields which originate from API call
            for(var key in productItemTemplate){
                if(productItemTemplate.hasOwnProperty(key)){
                    dynamicFields.push(key);
                }
            }

            productModel.setFields(dynamicFields);
            this.setFields(dynamicFields);
            this.setData(productItems);
        }

        options.success.call(options.scope);
    },

    filterProductsByCategory: function(category){
        this.clearFilter();
        this.filter("category",category);
    },

    filterProductsByCart: function(){
        this.clearFilter();

        //filter by the number of items in cart
        this.filterBy(function(record){
            var doesMatchSearchCriteria = false,
                noInCart = record.get("noInCart");

            if(noInCart > 0){
                doesMatchSearchCriteria = true;
            }
            return doesMatchSearchCriteria;
        });
    },

    filterProductsByWishListItems: function(){
        this.clearFilter();

        //filter by the number of items in wishlist
        this.filterBy(function(record){
            var doesMatchSearchCriteria = false,
                inWishList = record.get("inWishList");

            if(inWishList){
                doesMatchSearchCriteria = true;
            }
            return doesMatchSearchCriteria;
        });
    }

});