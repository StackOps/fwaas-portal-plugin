Ext.define('Stackops.portal.plugin.firewall.model.Subnet', {
	extend : 'Ext.data.Model',
	requires : ['Ext.data.proxy.Ajax', 'Ext.data.JsonStore','Ext.data.reader.Json'],
	fields: [
	   {"name": 'id'},	  
	   {"name": 'name'}
	 ],
	 
	proxy   : 
    {
    	model : 'Stackops.portal.plugin.firewall.model.Subnet',
	    noCache: false,
		pageParam : undefined,
	    startParam : undefined,
	    limitParam : undefined,
	    sortParam : undefined,
  		type: 'ajax',
		headers : {'Content-Type': 'application/json; charset=utf-8; Cache-Control: no-cache','Accept' : 'application/json'},				
		url: 'proxy/network'+'/v2.0/'+'networks',
		reader: {
			type: 'json',
			root: 'networks'
		}
	}
});