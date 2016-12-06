/*
 * created by Gareth Loughins - category Model structure
 */

Ext.define('MyShoppingCartApp.model.categoryModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'categoryName'
            }
        ]
    }
});