/**
 * Definition of the Pool data Model
 */
Ext.define('Stackops.portal.plugin.firewall.model.Rules', {
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
    idProperty : 'id',
    
    proxy   : 
    {
    	model : 'Stackops.portal.plugin.firewall.model.Rules',
	    noCache: false,
		pageParam : undefined,
	    startParam : undefined,
	    limitParam : undefined,
	    sortParam : undefined,
  		type: 'ajax',
		headers : {'Content-Type': 'application/json; charset=utf-8; Cache-Control: no-cache','Accept' : 'application/json'},				
		url: 'proxy/network/'+'$firewall_proxy'+'fw/firewall_rules',
		reader: {
			type: 'json',
			root: 'firewall_rules'
		}
	}
});