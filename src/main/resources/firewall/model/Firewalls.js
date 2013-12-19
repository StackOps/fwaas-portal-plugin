Ext.define('Stackops.portal.plugin.firewall.model.Firewalls', {
    extend : 'Ext.data.Model',
    requires : ['Ext.data.proxy.Ajax', 'Ext.data.JsonStore','Ext.data.reader.Json'],
    fields : [
    {
        name : 'id',
    },{
        name : 'name',
    },{
        name : 'admin_state_up',
        type : 'boolean'
    },  
    {
        name : 'description',
        type : 'string'
    },{
        name : 'tenant_id',
    },{
        name : 'status',
    },{
        name : 'firewall_policy_id',
    },
    {
    	name : 'type',
    },{
    	name : 'audited'
    },{
    	name : 'shared'
    },{
    	name : 'firewall_rules'
    }],
    idProperty : 'id'
});


