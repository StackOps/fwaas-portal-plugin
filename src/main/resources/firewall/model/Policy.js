/**
 * Definition of the Pool data Model
 */
Ext.define('Stackops.portal.plugin.firewall.model.Policy', {
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
        name : 'shared',
        type : 'boolean'
    },  
    {
        name : 'description',
        type : 'string'
    },{
        name : 'tenant_id',
    },{
        name : 'audited',
        type : 'boolean'
    },{
        name : 'firewall_rules',
    },{
    	name: 'type'
    }],
    idProperty : 'id',
    
    proxy   : 
    {
    	model : 'Stackops.portal.plugin.firewall.model.Policy',
	    noCache: false,
		pageParam : undefined,
	    startParam : undefined,
	    limitParam : undefined,
	    sortParam : undefined,
  		type: 'ajax',
		headers : {'Content-Type': 'application/json; charset=utf-8; Cache-Control: no-cache','Accept' : 'application/json'},				
		url: 'proxy/network/'+'$firewall_proxy'+'fw/firewall_policies',
		reader: {
			type: 'json',
			root: 'firewall_policies'
		}
	}
});
