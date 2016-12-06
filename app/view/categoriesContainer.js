/*
 * created by Gareth Loughins - categories view
 */

Ext.define('MyShoppingCartApp.view.categoriesContainer', {
    extend: 'Ext.Container',
    alias: 'widget.categoriescontainer',

    requires: [
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.TitleBar'
    ],

    config: {
        itemId: 'categoriesContainer',
        height: '100%',
        layout: 'fit',
        items: [
            {
                xtype: 'list',
                itemId: 'categoriesList',
                pressedCls: '',
                scrollToTopOnRefresh: false,
                pinHeaders: false,
                itemTpl: Ext.create('Ext.XTemplate', 
                    '<div>{[ this.getCategoryName(values) ]}</div>',
                    {
                        getCategoryName: function(values) {
                            return values.categoryName;
                        }
                    }
                ),
                store: 'categoryStore'
            },
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'catTitleBar',
                title: 'Categories'
            }
        ]
    }



});