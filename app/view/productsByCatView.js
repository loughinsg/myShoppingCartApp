/*
 * created by Gareth Loughins - products by category view
 */

Ext.define('MyShoppingCartApp.view.productsByCatView', {
    extend: 'Ext.Container',
    alias: 'widget.productsByCatView',

    requires: [
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.TitleBar'
    ],

    config: {
        itemId: 'productsByCatView',
        height: '100%',
        layout: 'fit',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'categoryByNameTitleBar',
                title: 'Category Name'
            },
            {
                xtype: 'list',
                cls: 'productsListView',
                pressedCls: '',
                scrollToTopOnRefresh: false,
                pinHeaders: false,
                itemId: 'productByCatList',
                itemTpl: Ext.create('Ext.XTemplate', 
                    '<div class = "list-item">{[this.getProductsByName(values)]}</div>',
                    {
                        getProductsByName: function(values) {
                            //lets get the name price and check if it is available
                            var htmlReturn=[],
                                productName = '<div>' + values.name + '</div><br>',
                                reducedByString="reduced to",
                                availabilityString = "Not Available";

                            htmlReturn.push(productName);

                            //if old price is available and is more than new price add in reduced to
                            if(!Ext.isEmpty(values.oldPrice) && values.oldPrice > values.price){
                                reducedByString = '<div class="strikeThroughOldPrice">' + "£" + values.oldPrice.toFixed(2) + '</div><div>' + " " +
                                    reducedByString + " " + "£" + values.price.toFixed(2) + '</div><br>';
                            }
                            else{

                                reducedByString = '<div>' + "£"+values.price.toFixed(2) + '</div><br>';
                            }

                            htmlReturn.push(reducedByString);


                            if(values.stock > 0){
                                availabilityString = '<div>' + "In Stock" + '</div><br>';
                            }
                            else{
                                availabilityString = '<div>' + availabilityString + '</div><br>';
                            }
                            htmlReturn.push(availabilityString);
                            htmlReturn.push('<div> Tap to see more details...</div>');

                            return htmlReturn.join('');


                        }
                    }
                ),
                store: 'productsStore'
            }
        ],
        listeners: [
            {
                fn: 'onProductByCatViewPainted',
                event: 'painted'
            }
        ]
    },

    onProductByCatViewPainted: function(element, eOpts) {
        this.fireEvent('onProductByCatViewPainted');
    }

});