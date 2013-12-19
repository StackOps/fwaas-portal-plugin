Ext.define('Stackops.portal.plugin.firewall.store.Subnet', {
    extend : 'Ext.data.Store',
    requires : ['Ext.data.proxy.Ajax', 
    'Ext.data.JsonStore',
    'Ext.data.reader.Json',
    'Stackops.portal.plugin.firewall.model.Subnet'
    ],
    model : 'Stackops.portal.plugin.firewall.model.Subnet',    
   constructor : function(){
        var me = this;
        me.model = Ext.ModelManager.getModel(me.model);
        me.callParent(arguments);
    }
});



