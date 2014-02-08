/**
 * Definition of the Pool data Model
 */
Ext.define('Stackops.portal.plugin.firewall.model.Firewall', {
	extend : 'Ext.data.Model',
	requires : ['Ext.data.proxy.Ajax', 'Ext.data.JsonStore', 'Ext.data.reader.Json'],
	fields : [{
		name : 'id',
	}, {
		name : 'name',
	}, {
		name : 'admin_state_up',
		type : 'boolean'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'tenant_id',
	}, {
		name : 'status',
	}, {
		name : 'firewall_policy_id',
	}, {
		name : 'type',
	}],
	idProperty : 'id',

	proxy : {
		model : 'Stackops.portal.plugin.firewall.model.Firewall',
		noCache : false,
		pageParam : undefined,
		startParam : undefined,
		limitParam : undefined,
		sortParam : undefined,
		type : 'ajax',
		headers : {
			'Content-Type' : 'application/json; charset=utf-8; Cache-Control: no-cache',
			'Accept' : 'application/json'
		},
		url : 'proxy/network/' + '$firewall_proxy' + 'fw/firewalls',
		reader : {
			type : 'json',
			root : 'firewalls'
		}
	}
});