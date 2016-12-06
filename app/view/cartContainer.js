/*
 * created by Gareth Loughins - shopping cart view
 */

Ext.define('MyShoppingCartApp.view.cartContainer', {
    extend: 'Ext.Container',
    alias: 'widget.cartContainer',

    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.Label'
    ],

    config: {
        itemId: 'cartViewContainer',
        height: '100%',
        layout: 'fit',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'cartTitleBar',
                title: 'Shopping Cart Value: £0.00'
            },
            {
                xtype: 'list',
                cls:'productsListView',
                pressedCls: '',
                scrollToTopOnRefresh: false,
                pinHeaders: false,
                itemId: 'cartList',
                itemTpl: Ext.create('Ext.XTemplate', 
                    '<div class="list-item">{[this.getCartProducts(values)]}</div>',
                    {
                        getCartProducts: function(values) {
                            var contentString = "";

                            contentString = "<div> <div style = 'color: red'>Product Name: </div>" + values.name + "</div><br>";
                            contentString = contentString + "<div> <div style = 'color: red'>Product price per unit: </div>" + "£"+values.price.toFixed(2) + "</div><br>";
                            contentString = contentString + "<div> <div style = 'color: red'>No. of Units: </div>" + values.noInCart + "</div><br>";
                            contentString = contentString + "<div><b>Tap to remove from cart</b></div>";

                            return contentString;
                        }
                    }
                ),
                store: 'productsStore'
            }
        ],
        listeners: [
            {
                fn: 'onShoppingCartPainted',
                event: 'painted'
            }
        ]

    },

    onShoppingCartPainted: function(element, eOpts) {
        this.fireEvent('onShoppingCartPainted');
    }

});