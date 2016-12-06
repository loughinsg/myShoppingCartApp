/*
 * created by Gareth Loughins - product Model structure
 */

Ext.define('MyShoppingCartApp.model.productModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'productId',
                type: 'int'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'category',
                type: 'string'
            },
            {
                name: 'price',
                type: 'float'
            },
            {
                name: 'oldPrice',
                type: 'float'
            },
            {
                name: 'stock',
                type: 'int'
            },
            {
                name: 'noInCart',
                type: 'int'
            },
            {
                name: 'inWishList',
                type: 'boolean'
            }
        ]
    }
});