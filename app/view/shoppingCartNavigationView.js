/*
 * created by Gareth Loughins - shopping cart Navigation view
 */

Ext.define('MyShoppingCartApp.view.shoppingCartNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.shoppingCartNavigationView',

    requires: [
        'MyShoppingCartApp.view.categoriesContainer',
        'Ext.navigation.Bar',
        'Ext.Button'
    ],

    config: {
        itemId: 'shoppingCartNavigationView',
        hidden: false,
        defaultBackButtonText: '',
        navigationBar: {
            docked: 'top',
            backButton : {

            },
            itemId: 'navBar',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    align: 'right',
                    itemId: 'homeButton',
                    text: 'Home'
                },
                {
                    xtype: 'button',
                    align: 'right',
                    id: 'wishListButton',
                    itemId: 'wishListButton',
                    text: 'Wish List'
                },
                {
                    xtype: 'button',
                    align: 'right',
                    id: 'shoppingCartButton',
                    itemId: 'shoppingCartButton',
                    text: 'Cart'
                }
            ]
        },
        items: [
            {
                xtype: 'categoriescontainer'
            }
        ]
    }
});