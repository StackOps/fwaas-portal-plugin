/*
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
Ext.define('Stackops.portal.plugin.firewall.controller.UpTree', {
	extend : 'Ext.app.Controller',
	requires : ['Stackops.portal.plugin.firewall.view.UpTree'],
	alias : 'controller.uptree',
	refs : [{
		ref : 'UpTree',
		selector : 'uptree'
	}, {
		ref : 'EmptyPanel',
		selector : 'emptypanel'
	}, {
		ref : 'FwaasPanel',
		selector : 'fwaaspluginpanel'
	}],
	init : function() {
		this.control({
			'uptree' : {
				select : this.onSelect,
				beforeselect : this.onBeforeS
			}

		});
	},

	onBeforeS : function(u, d, t) {
		emptyPanel = this.getEmptyPanel();
		emptyPanel.setMask(true);
	},

	onSelect : function(grid, record) {
		var me = this.getUpTree();
		fwaasPanel = this.getFwaasPanel();
		emptyPanel = this.getEmptyPanel();
		//me.section = fwaasPanel
		me.type = record.get('type');
		me.section_aux = record.get('id');

		if (me.currentSection != me.section_aux) {
			emptyPanel.removeAll();
		}
		if (me.type == "efirewall") {
			/*if(me.currentSection != me.section_aux){
			 me.currentPanel = Ext.create('Stackops.portal.plugin.firewall.view.EmptyGrid');
			 emptyPanel.add(me.currentPanel);
			 }*/
			emptyPanel.update(Portal.getText('firewall', 'emptypanel-update-efirewall'));
			fwaasPanel.containerHtml.update("");

		} else if (me.type == "epolicy") {
			/*if(me.currentSection != me.section_aux){
			 me.currentPanel = Ext.create('Stackops.portal.plugin.firewall.view.EmptyGrid');
			 emptyPanel.add(me.currentPanel);
			 }*/
			emptyPanel.update(Portal.getText('firewall', 'emptypanel-update-epolicy'));
			fwaasPanel.containerHtml.update("");

		} else if (me.type == "policy") {
			if (me.currentSection != me.section_aux) {
				me.currentPanel = Ext.create('Stackops.portal.plugin.firewall.view.PolicyGrid', {
					layout : 'fit',
					section : me,
					policy_id : record.get('id'),
				});
				emptyPanel.add(me.currentPanel);
			}
			fwaasPanel.containerHtml.update(Portal.getText('firewall', 'policy-container-html').replace('$1', record.get('shared')).replace('$2', record.get('audited')).replace('$3', record.get('id')));

		} else if (me.type == "firewall") {
			if (me.currentSection != me.section_aux) {
				me.currentPanel = Ext.create('Stackops.portal.plugin.firewall.view.FirewallGrid', {
					layout : 'fit',
					firewall_id : record.get('id'),
					section : me
				});
				emptyPanel.add(me.currentPanel);
			}

			fwaasPanel.containerHtml.update(Portal.getText('firewall', 'firewall-container-html').replace('$1', record.get('admin_state_up')).replace('$2', record.get('firewall_policy_id')).replace('$3', record.get('status')).replace('$4', record.get('id')));

		} else if (me.type == "rules") {
			if (me.currentSection != me.section_aux) {
				me.currentPanel = Ext.create('Stackops.portal.plugin.firewall.view.RulesGrid', {
					layout : 'fit',
					section : me
				});
				emptyPanel.add(me.currentPanel);
			}
			fwaasPanel.containerHtml.update("");

		}
		me.currentSection = me.section_aux;
		this.upTreeContext(fwaasPanel, me.type, record);
		emptyPanel.setMask(false);

	},

	upTreeContext : function(fwaasPanel, section, record) {
		if (section == "efirewall") {

			if (record.get('leaf') == false) {
				fwaasPanel.fwCreateB.setVisible(false);
			} else
				fwaasPanel.fwCreateB.setVisible(true);
			fwaasPanel.fwDeleteB.setVisible(false);
			fwaasPanel.fwEditB.setVisible(false);
			fwaasPanel.ruleCreateB.setVisible(false);
			fwaasPanel.ruleDeleteB.setVisible(false);
			fwaasPanel.ruleEditB.setVisible(false);
			fwaasPanel.policyCreateB.setVisible(false);
			fwaasPanel.policyDeleteB.setVisible(false);
			fwaasPanel.policyEditB.setVisible(false);
			fwaasPanel.insertCreateB.setVisible(false);
			fwaasPanel.ruleRemoveB.setVisible(false);
			fwaasPanel.auditPolicyB.setVisible(false);
			fwaasPanel.enableRuleB.setVisible(false);
			fwaasPanel.disableRuleB.setVisible(false);
			fwaasPanel.detailsB.setVisible(false);
			fwaasPanel.detailspB.setVisible(false);
			fwaasPanel.detailsfB.setVisible(false);
		} else if (section == "epolicy") {
			fwaasPanel.fwCreateB.setVisible(false);
			fwaasPanel.fwDeleteB.setVisible(false);
			fwaasPanel.fwEditB.setVisible(false);
			fwaasPanel.ruleCreateB.setVisible(false);
			fwaasPanel.ruleDeleteB.setVisible(false);
			fwaasPanel.ruleEditB.setVisible(false);
			fwaasPanel.policyCreateB.setVisible(true);
			fwaasPanel.policyDeleteB.setVisible(false);
			fwaasPanel.policyEditB.setVisible(false);
			fwaasPanel.insertCreateB.setVisible(false);
			fwaasPanel.ruleRemoveB.setVisible(false);
			fwaasPanel.auditPolicyB.setVisible(false);
			fwaasPanel.enableRuleB.setVisible(false);
			fwaasPanel.disableRuleB.setVisible(false);
			fwaasPanel.detailsB.setVisible(false);
			fwaasPanel.detailspB.setVisible(false);
			fwaasPanel.detailsfB.setVisible(false);
		} else if (section == "policy") {
			fwaasPanel.fwCreateB.setVisible(false);
			fwaasPanel.fwDeleteB.setVisible(false);
			fwaasPanel.fwEditB.setVisible(false);
			fwaasPanel.ruleCreateB.setVisible(false);
			fwaasPanel.ruleDeleteB.setVisible(false);
			fwaasPanel.ruleEditB.setVisible(false);
			fwaasPanel.policyCreateB.setVisible(true);
			fwaasPanel.policyDeleteB.setVisible(true);
			fwaasPanel.policyEditB.setVisible(true);
			fwaasPanel.insertCreateB.setVisible(true);
			fwaasPanel.ruleRemoveB.setVisible(false);
			if (!record.get('audited') && fwaasPanel.admin)
				fwaasPanel.auditPolicyB.setVisible(true);
			else
				fwaasPanel.auditPolicyB.setVisible(false);
			fwaasPanel.enableRuleB.setVisible(false);
			fwaasPanel.disableRuleB.setVisible(false);
			fwaasPanel.detailsB.setVisible(false);
			fwaasPanel.detailspB.setVisible(true);
			fwaasPanel.detailsfB.setVisible(false);
		} else if (section == "firewall") {
			fwaasPanel.fwCreateB.setVisible(false);
			if (record.get('status') == "PENDING_DELETE") {
				fwaasPanel.fwDeleteB.setVisible(false);
				fwaasPanel.fwEditB.setVisible(false);
			} else {
				fwaasPanel.fwDeleteB.setVisible(true);
				fwaasPanel.fwEditB.setVisible(true);
			}

			fwaasPanel.ruleCreateB.setVisible(false);
			fwaasPanel.ruleDeleteB.setVisible(false);
			fwaasPanel.ruleEditB.setVisible(false);
			fwaasPanel.policyCreateB.setVisible(false);
			fwaasPanel.policyDeleteB.setVisible(false);
			fwaasPanel.policyEditB.setVisible(false);
			fwaasPanel.insertCreateB.setVisible(false);
			fwaasPanel.ruleRemoveB.setVisible(false);
			fwaasPanel.auditPolicyB.setVisible(false);
			fwaasPanel.enableRuleB.setVisible(false);
			fwaasPanel.disableRuleB.setVisible(false);
			fwaasPanel.detailsB.setVisible(false);
			fwaasPanel.detailspB.setVisible(false);
			fwaasPanel.detailsfB.setVisible(true);
		} else if (section == "rules") {
			fwaasPanel.fwCreateB.setVisible(false);
			fwaasPanel.fwDeleteB.setVisible(false);
			fwaasPanel.fwEditB.setVisible(false);
			fwaasPanel.ruleCreateB.setVisible(true);
			fwaasPanel.ruleDeleteB.setVisible(false);
			fwaasPanel.ruleEditB.setVisible(false);
			fwaasPanel.policyCreateB.setVisible(false);
			fwaasPanel.policyDeleteB.setVisible(false);
			fwaasPanel.policyEditB.setVisible(false);
			fwaasPanel.insertCreateB.setVisible(false);
			fwaasPanel.ruleRemoveB.setVisible(false);
			fwaasPanel.auditPolicyB.setVisible(false);
			fwaasPanel.enableRuleB.setVisible(false);
			fwaasPanel.disableRuleB.setVisible(false);
			fwaasPanel.detailsB.setVisible(false);
			fwaasPanel.detailspB.setVisible(false);
			fwaasPanel.detailsfB.setVisible(false);
		}
	}
}); 