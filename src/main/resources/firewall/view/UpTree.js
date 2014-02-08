Ext.define('Stackops.portal.plugin.firewall.view.UpTree', {
    extend : 'Ext.tree.Panel',
    alias : 'widget.uptree',
    requires: [
    'Stackops.portal.plugin.firewall.model.Firewalls',
    'Ext.tree.Column',
    'Ext.data.Model',
    'Ext.grid.column.Template',
    ],
    collapsible: true,
    //useArrows: true,
    rootVisible: false,
    multiSelect: true,
    //singleExpand: true,
     useArrows: true,
   
    layout : {
    	type: 'anchor',
    	align: 'stretch'
    },
    anchor : '100%',
    border : false,
    autoScroll: false,
    title : Portal.getText('firewall', 'uptree-title'),
    initComponent: function(){
    	var me = this;
    	me.items =[];
    	me.currentSection = "empty";    	
    	Portal.firewall.neutronProxy = "v2.0/";
    	this.selectedRecords = [];
    	me.nodeExpanded = new Ext.util.HashMap();
    	
    	
    	me.store = Ext.create('Ext.data.TreeStore', {
		    model: 'Stackops.portal.plugin.firewall.model.Firewalls',
		    proxy   : {type    : 'memory'}, 
		    root : [],
		    sorters: [
		        {
		            property : 'name',
		            direction: 'DESC'
		        }
		    ]
		});
		
		
		me.subnetStore = Ext.create('Stackops.portal.plugin.firewall.store.Subnet');
    	me.subnetStore.load();
    	me.mon(me.subnetStore,'load', me.onSubnetLoad, me); 
    	
    	
    	me.firewall_store = Ext.create('Stackops.portal.plugin.firewall.store.Firewall');
		me.rules_store = Ext.create('Stackops.portal.plugin.firewall.store.Rules');
		me.policy_store = Ext.create('Stackops.portal.plugin.firewall.store.Policy');
		
		me.mon(me.firewall_store, 'load', me.onLoadFirewall, me);
    	me.mon(me.rules_store, 'load', me.onLoadRules, me);
    	me.mon(me.policy_store, 'load', me.onLoadPolicy, me);
    	
		me.columns = [
            {   
            	xtype: 'treecolumn',          	
            	header: Portal.getText('firewall', 'uptree-head-name'),
            	dataIndex: 'name',  
            	sortable: true,           	 
            	flex :1
            },    
            {   
            	   	
            	header:'Id', 
            	dataIndex: 'id',    
            	hidden: true     ,   	 
            	flex :3
            },     
            {   
            	   	
            	header: Portal.getText('firewall', 'uptree-head-audited'), 
            	dataIndex: 'audited',    
            	hidden: true     ,   	 
            	flex :1,
            	renderer : function(value){
            		if(value)
            			return  '<img align="middle" src="plugin/static/firewall/images/fw-ok.png">';
            	}
            },  
            
            {   
            	   	
            	header: Portal.getText('firewall', 'uptree-head-shared'),
            	dataIndex: 'shared',    
            	hidden: true     ,   	 
            	flex :1,
            	renderer : function(value){
            		if(value)
            			return  '<img align="middle" src="plugin/static/firewall/images/fw-shared.png">';
            	}
            },
            {   
            	   	
            	header: Portal.getText('firewall', 'uptree-head-admin_state_up'),
            	dataIndex: 'admin_state_up',    
            	hidden: true     ,   	 
            	flex :1,
            	renderer : function(value){
            		if(value)
            			return  '<img align="middle" src="plugin/static/firewall/images/fw-ok.png">';
            	}
            },
            {   
            	   	
            	header: Portal.getText('firewall', 'uptree-head-status'),
            	dataIndex: 'status',    
            	hidden: true     ,   	 
            	flex :1,
            	renderer : function(value){
            		if(value == "ACTIVE")
            			return '<span style="color:green;">'+ value +'</span>'; 
            		else if(value == "ERROR")
            			return '<span style="color:red;">'+ value +'</span>';
            		else if(value == "DOWN")
            			return '<span style="color:blue;">'+ value +'</span>';
            		else 
            			return '<span style="color:orange;">'+ value +'</span>';
            	}
            }
            
    	];
    	
    	
	   	me.mon(me.store, 'rootchange', me.oRootChange, me);
    	me.mon(me,'itemcontextmenu',me.onContextMenu, me); 
    	me.mon(me, 'itemdblclick', me.dbClick, me);
    	me.mon(me,'itemexpand',me.onNodeExpand,me);
		me.mon(me,'itemcollapse',me.onNodeCollapse,me);
    	
        me.callParent(arguments);
        
    },
    
    dbClick : function(grid, record, item, index, e, eOpts ){
    	var me = this;
    	if(record.get('type') == "firewall"||record.get('type') == "policy")
    		me.section.detailstree.call(me.section);
    },
    
  	onNodeExpand : function(node){
    	var me = this;
    	me.nodeExpanded.add(node.data.id, node);
    },
    
    onNodeCollapse : function(node){
    	var me = this;
    	me.nodeExpanded.removeAtKey(node.data.id);
    },
    
   
    oRootChange : function(store, records, success){
    	var me = this;
    	if(me.created){    		
    		me.created = false;
    		record = this.getStore().getNodeById(me.created_id);
    	}
    	else if(me.deletedp){
    		me.deletedp = false;
    		record = this.getStore().getNodeById('epolicy');
    	}
    	else if(me.deletedf){
    		me.deletedf = false;
    		record = this.getStore().getNodeById('efirewall');
    	}    		
    	else{
			if (0 >= this.selectedRecords.length)
	        	return;
	    	
			else		
				record = this.getStore().getNodeById(this.selectedRecords[0].get('id'));
	  	}	  	
	  	this.getSelectionModel().select(record);  
        Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);  
    },
    
    
    
    
    onSubnetLoad : function(store, records, success){
    	var me = this;
    	me.section.setLoading(true);    	
    	if(!success){
    		Portal.firewall.neutronProxy = "";
    	}   	
    	me.firewall_store.load();
		me.rules_store.load();
		me.policy_store.load();
		
    	
    },
    
    
    onLoadFirewall : function(store, records, success){
    	var me = this;
    	me.firewallLoaded = true;
    	me.initGrid();    	
    },
    
    onLoadPolicy : function(store, records, siccess){
    	var me = this;    
    	me.policyLoaded = true;
    	me.initGrid();
    },
    
    onLoadRules : function(store, records, success){
    	var me = this;    	    	
    	me.rulesLoaded = true;
    	me.initGrid();
    }, 
    
    generateRoot : function(){
    	var me = this;
    	var roots = [];    	
    	var firewall_root = {
    		type : 'efirewall',
    		name : 'Firewall',
    		iconCls : 'tree-icons',
    		leaf : true,
    		id : 'efirewall',
    		children : []
    	};
    	
    	if(me.nodeExpanded.get('efirewall')!=null){    		
    		firewall_root.expanded = true;
    	};
    	
    	var policy_root = {
    		type : 'epolicy',
    		name : Portal.getText('firewall', 'uptree-policies'),
    		iconCls : 'tree-icons',   
    		leaf : true, 		
    		id : 'epolicy',
    		children : []
    	};
    	
    	if(me.nodeExpanded.get('epolicy')!=null){
    		
    		policy_root.expanded = true;
    	};
    	
    	var rules_root = {
    		type : 'rules',
    		iconCls : 'tree-icons',
    		name : Portal.getText('firewall', 'uptree-rules'),
    		id : 'rules',
    		leaf : true
    	};
    	
    	if(me.nodeExpanded.get('rules')!=null){
    		
    		rules_root.expanded = true;
    	};
    	

    	me.firewall_store.each(function(record, index){
    		firewall_root.leaf = false;
    		var firewall = {
    			name : record.get('name'),
    			id : record.get('id'),
    			admin_state_up : record.get('admin_state_up'),
    			description : record.get('description'),
    			tenant_id : record.get('tenant_id'),
    			firewall_policy_id : record.get('firewall_policy_id'),
    			status : record.get('status'),
    			type : 'firewall',
    			iconCls : 'fwplugin-icon',
    			firewall_rules :  record.get('firewall_rules'),
    			leaf : true    			
    		};
    		firewall_root.children.push(firewall);
    		
    	});
    	
    	me.policy_store.each(function(record, index){
    		policy_root.leaf = false;
    		var policy = {
    			id : record.get('id'),
    			name : record.get('name'),
    			enabled : record.get('enabled'),
    			shared : record.get('shared'),
    			description : record.get('description'),
    			tenant_id : record.get('tenant_id'),
    			audited : record.get('audited'),
    			firewall_rules : record.get('firewall_rules'),
    			type : 'policy',
    			iconCls : 'fw-policy-icon',
    			leaf : true
    		};
    		
    		policy_root.children.push(policy);
    	});
    	
    	roots.push(policy_root);
    	roots.push(rules_root);
    	roots.push(firewall_root);
    	
    	
    	return {expanded: true,children : roots};
    	
    },
    
    initGrid : function(){
    	var me = this;
    	var rule_list = [];
    	if(me.firewallLoaded && me.rulesLoaded && me.policyLoaded){
    		
    		me.firewallLoaded = false;
    		me.rulesLoaded = false;
    		me.policyLoaded = false;
    		tree_root = me.generateRoot();
    		
    		
    		me.store.setRootNode(tree_root);
    		//me.setLoading(false);
    		me.section.setLoading(false);
    	}
    },
	refresh : function(){
		var me = this;
		me.selectedRecords = this.getSelectionModel().getSelection();    	
    	this.getView().saveScrollState();
    	me.section.setLoading(true);
    	
    	if(me.deletedf){    		
    		record = this.getStore().getNodeById('firewall');
    	}
    	else if(me.deletedp){
    		record = this.getStore().getNodeById('epolicy');
    	}
    	else{
    		if(me.currentPanel!=null && me.currentPanel != undefined && me.currentPanel != "")
    			me.currentPanel.refresh();		
    	}
    	
    	
    	//me.currentPanel.refresh();		
		me.firewall_store.load();
		me.rules_store.load();
		me.policy_store.load();
	},
    onContextMenu: function(grid, record, item, index, event, opts){
    	var me = this;
    	me.type = record.get('type');
    	event.stopEvent();
    	
    	if(me.type== "firewall"){       		
    		
    		
			me.section.fwCreateB.setVisible(false);
			if (record.get('status') == "PENDING_DELETE"){
				me.section.fwDeleteR.setVisible(false);
				me.section.fwEditR.setVisible(false);
			}
				
			else{
				me.section.fwDeleteR.setVisible(true);
				me.section.fwEditR.setVisible(true);
			}
			me.section.ruleDeleteR.setVisible(false);
			me.section.ruleEditR.setVisible(false);
			me.section.policyCreateR.setVisible(false);
			me.section.policyDeleteR.setVisible(false);
			me.section.policyEditR.setVisible(false);
			me.section.insertCreateR.setVisible(false);
			me.section.ruleRemoveR.setVisible(false);
			me.section.auditPolicyR.setVisible(false);
			me.section.enableRuleR.setVisible(false);
			me.section.disableRuleR.setVisible(false); 
			
			me.section.detailsR.setVisible(false); 
			me.section.detailspR.setVisible(false);
			me.section.detailsfR.setVisible(true);
		
       	}
       	else if (me.type == "policy"){
       		
			me.section.fwCreateR.setVisible(false);
			me.section.fwDeleteR.setVisible(false);
			me.section.fwEditR.setVisible(false);
			me.section.ruleDeleteR.setVisible(false);
			me.section.ruleEditR.setVisible(false);
			me.section.policyCreateR.setVisible(true);
			me.section.policyDeleteR.setVisible(true);
			me.section.policyEditR.setVisible(true);
			me.section.insertCreateR.setVisible(true);
			me.section.ruleRemoveR.setVisible(false);			
			me.section.enableRuleR.setVisible(false);
			me.section.disableRuleR.setVisible(false);
			me.section.detailsR.setVisible(false); 
			me.section.detailspR.setVisible(true);
			me.section.detailsfR.setVisible(false);
			
			if(!record.get('audited') && me.section.admin) me.section.auditPolicyR.setVisible(true);
			else me.section.auditPolicyR.setVisible(false);

       	}
       	else if (me.type == "epolicy"){
       		
			me.section.fwCreateR.setVisible(false);
			me.section.fwDeleteR.setVisible(false);
			me.section.fwEditR.setVisible(false);
			me.section.ruleDeleteR.setVisible(false);
			me.section.ruleEditR.setVisible(false);
			me.section.policyCreateR.setVisible(true);
			me.section.policyDeleteR.setVisible(false);
			me.section.policyEditR.setVisible(false);
			me.section.insertCreateR.setVisible(false);
			me.section.ruleRemoveR.setVisible(false);
			me.section.auditPolicyR.setVisible(false);
			me.section.enableRuleR.setVisible(false);
			me.section.disableRuleR.setVisible(false);
			me.section.detailsR.setVisible(false); 
			me.section.detailspR.setVisible(false);
			me.section.detailsfR.setVisible(false);

       	}
       	else if (me.type == "efirewall"){
			if (record.get('leaf') == false) {
				me.section.fwCreateR.setVisible(false);
			} else
				me.section.fwCreateR.setVisible(true);

			me.section.fwDeleteR.setVisible(false);
			me.section.fwEditR.setVisible(false);
			me.section.ruleDeleteR.setVisible(false);
			me.section.ruleEditR.setVisible(false);
			me.section.policyCreateR.setVisible(false);
			me.section.policyDeleteR.setVisible(false);
			me.section.policyEditR.setVisible(false);
			me.section.insertCreateR.setVisible(false);
			me.section.ruleRemoveR.setVisible(false); 
			me.section.auditPolicyR.setVisible(false);
			me.section.enableRuleR.setVisible(false);
			me.section.disableRuleR.setVisible(false);
			me.section.detailsR.setVisible(false); 
			me.section.detailspR.setVisible(false);
			me.section.detailsfR.setVisible(false);
       	}
       	else{       		
			me.section.fwCreateR.setVisible(false);
			me.section.fwDeleteR.setVisible(false);
			me.section.fwEditR.setVisible(false);
			me.section.ruleDeleteR.setVisible(false);
			me.section.ruleEditR.setVisible(false);
			me.section.policyCreateR.setVisible(false);
			me.section.policyDeleteR.setVisible(false);
			me.section.policyEditR.setVisible(false);
			me.section.insertCreateR.setVisible(false);
			me.section.ruleRemoveR.setVisible(false); 
			me.section.auditPolicyR.setVisible(false);
			me.section.enableRuleR.setVisible(false);
			me.section.disableRuleR.setVisible(false);
			me.section.detailsR.setVisible(false); 
			me.section.detailspR.setVisible(false);
			me.section.detailsfR.setVisible(false);
       	}    	
    	if(!(record.get('type') == 'efirewall' && record.get('leaf') == false)){
    		me.section.rightMenu.showAt(event.xy);
    	}
    	
    }
});