/*
 * created by Gareth Loughins - category Store
 */

Ext.define('MyShoppingCartApp.store.categoryStore', {
    extend: 'Ext.data.Store',

    requires: [
        'MyShoppingCartApp.model.categoryModel'
    ],

    config: {
        data: [
            {
                categoryName: "Women's Footwear"
            },
            {
                categoryName: "Men's Footwear"
            },
            {
                categoryName: "Women's Casualwear"
            },
            {
                categoryName: "Men's Casualwear"
            },
            {
                categoryName: "Women's Formalwear"
            },
            {
                categoryName: "Men's Formalwear"
            }
        ],
        model: 'MyShoppingCartApp.model.categoryModel',
        storeId: 'categoryStore'
    }
});