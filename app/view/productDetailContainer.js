/*
 * created by Gareth Loughins - product detail view
 */

Ext.define('MyShoppingCartApp.view.productDetailContainer', {
    extend: 'Ext.Container',
    alias: 'widget.productDetailContainer',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.TitleBar',
        'Ext.Label'
    ],

    config: {
        itemId: 'productDetailContainer',
        items: [
            {
                xtype: 'toolbar',
                itemId: 'productDetailButtonToolbar',
                docked: 'bottom',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'addToWishListButton',
                        text: 'Add To Wishlist'
                    },
                    {
                        xtype: 'button',
                        itemId: 'addToCartButton',
                        text: 'Add To Cart'
                    }
                ]
            },
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'productDetailTitleBar',
                title: 'Product Details'
            },
            {
                xtype: 'container',
                height: '25%',
                itemId: 'productDescDataContainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        html: 'Product Description:',
                        itemId: 'productDescLabel',
                        style: 'color: red',
                        width: '35%'
                    },
                    {
                        xtype: 'label',
                        html: 'Product Description Data',
                        itemId: 'productDescLabelData',
                        width: '65%'
                    }
                ]
            },
            {
                xtype: 'container',
                height: '25%',
                itemId: 'productPriceDataContainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        html: 'Product Price:',
                        itemId: 'productPriceLabel',
                        style: 'color: red',
                        width: '35%'
                    },
                    {
                        xtype: 'label',
                        html: 'Product Price Data',
                        itemId: 'productPriceDataLabel',
                        width: '65%'
                    }
                ]
            },
            {
                xtype: 'container',
                height: '25%',
                itemId: 'productQuantityDataContainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        html: 'Quantity in Stock:',
                        itemId: 'productQuantityLabel',
                        style: 'color: red',
                        width: '35%'
                    },
                    {
                        xtype: 'label',
                        html: 'Product Quantity in Stock Data',
                        itemId: 'productQuantityDataLabel',
                        width: '65%'
                    }
                ]
            },
            {
                xtype: 'container',
                height: '13%',
                itemId: 'productWishListCommentsContainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        html: '',
                        itemId: 'productWishListCommentsLabel',
                        style: 'color: blue',
                        width: '100%'
                    }
                ]
            },
            {
                xtype: 'container',
                height: '12%',
                itemId: 'productCartCommentsContainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'label',
                        html: '',
                        itemId: 'productCartCommentsLabel',
                        style: 'color: blue',
                        width: '100%'
                    }
                ]
            }
        ]
    }

});