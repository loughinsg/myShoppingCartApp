/**
 * Created by LoughinsG on 06/12/2016.
 */

Ext.define('MyShoppingCartApp.view.wishListView', {
    extend: 'Ext.Container',
    alias: 'widget.wishListView',

    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.Label',
        'Ext.MessageBox'
    ],

    config: {
        itemId: 'wishlistContainer',
        height: '100%',
        layout: 'fit',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'wishlistTitleBar',
                title: 'Your Wish List'
            },
            {
                xtype: 'list',
                cls:'productsListView',
                pressedCls: '',
                scrollToTopOnRefresh: false,
                pinHeaders: false,
                itemId: 'wishlistList',
                itemTpl: Ext.create('Ext.XTemplate',
                    '<div class="list-item">{[this.getwishListProducts(values)]}</div>',
                    {
                        getwishListProducts: function(values) {
                            var contentString = "";

                            contentString = "<div> <div style = 'color: red'>Product Name: </div>" + values.name + "</div><br>";
                            contentString = contentString + "<div> <div style = 'color: red'>Product price: </div>" + "£"+values.price.toFixed(2) + "</div><br>";
                            contentString = contentString + "<div><b>Tap for more options</b></div>";

                            return contentString;
                        }
                    }
                ),
                store: 'productsStore'
            }
        ],
        listeners: [
            {
                fn: 'onWishlistPainted',
                event: 'painted'
            }
        ]
    },

    onWishlistPainted: function(element, eOpts) {
        this.fireEvent('onWishlistPainted');
    }

});