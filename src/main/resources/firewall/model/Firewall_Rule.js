Ext.define('Stackops.portal.plugin.firewall.model.Firewall_Rule', {
    extend : 'Ext.data.Model',
    requires : ['Ext.data.proxy.Ajax', 'Ext.data.JsonStore','Ext.data.reader.Json'],
    fields : [
    {
        name : 'id',
    },{
        name : 'name',
    },{
        name : 'enabled',
        type : 'boolean'
    },{
    	name : 'action'
    },{
        name : 'protocol',
        type : 'string'
    },{
        name : 'description',
        type : 'string'
    },{
        name : 'ip_version'
    },{
        name : 'tenant_id',
    },{
        name : 'source_ip_address',
    },{
        name : 'destination_ip_address',
    },{
        name : 'firewall_policy_id',
    },{
        name : 'shared',
        type : 'boolean'
    },{
        name : 'source_port',
    },{
        name : 'position',
    },{
        name : 'destination_port',
    },
    {
    	name : 'type',
    },{
    	name : 'firewall_rules'
    }
    ],
    idProperty : 'id'
});
