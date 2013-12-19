Ext.define('Stackops.portal.plugin.firewall.store.Firewall', {
    extend : 'Ext.data.Store',
    requires : ['Ext.data.proxy.Ajax', 
    'Ext.data.JsonStore',
    'Ext.data.reader.Json',
    'Stackops.portal.plugin.firewall.model.Firewall'
    ],
    model : 'Stackops.portal.plugin.firewall.model.Firewall',
    constructor : function(){
        var me = this;
        me.model = Ext.ModelManager.getModel(me.model);
        var url = me.model.getProxy().url;
        me.model.getProxy().url = url.replace('$firewall_proxy', Portal.firewall.neutronProxy);
        
        me.callParent(arguments);
    },
    sorters:['name'],
    groupDir:'ASC',
   	//autoLoad: false 
});



