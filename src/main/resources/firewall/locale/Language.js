Ext.define('Stackops.portal.plugin.firewall.locale.Language', {
    languages: {
        es: {
            pluginName: 'Firewall Portal Plugin',
            demoButton: 'Botón',
            'cancel' : 'Cancelar',
            'submit' : 'Enviar',
            'create' : 'Crear',
            'value' : 'Valor',
            'field' : 'Campo',
            'close' : 'Cerrar',
            'refresh' : 'Actualizar',
            'emptyText' : 'Este campo debe especificarse',
            
				'firewall-container-html' : '<img align = "left" style="padding-right: 10px;" src="plugin/static/firewall/images/fw_32.png" >'+
					'<table>'+
						'<tr> '+
							'<td width=50></td>'+
							'<td width=100><font size=1pt>Admin State Up:</td>'+
							'<td><font size=1pt>$1</p></td>'+
							'<td width=100></td>'+
							'<td width=75> <font size=1pt> Política de corta fuegos </td>'+
							'<td> <font size=1pt> $2 </td>'+		
						'</tr>'+
						'<tr>'+
							'<td width=50></td>'+
							'<td width=50 ><font size=1pt>Estado:</td>'+
							'<td><font size=1pt> $3 </p></td>'+
							'<td width=100></td>'+
							'<td width=75> <font size=1pt> Id:   </td>'+
							'<td> <font size=1pt> $4 </td>'+	
						'</tr>'+
					'</table>',

				'policy-container-html' :'<img align = "left" style="padding-right: 10px;" src="plugin/static/firewall/images/policy_32.png" >' + 
					'<table>' + 
						'<tr> ' + 
							'<td width=50></td>' + 
							'<td width=100><font size=1pt>Compartido:</td>' + 
							'<td><font size=1pt>$1</p></td>' + 
							'<td width=100></td>'+
							'<td width=45> <font size=1pt> Id:   </td>'+
							'<td> <font size=1pt> $3 </td>'+	
						'</tr>' + 
						'<tr>' + 
							'<td width=50></td>' + 
							'<td width=50 ><font size=1pt>Auditado:</td>' + 
							'<td><font size=1pt>$2</p></td>' + 
						'</tr>' + 
					'</table>',
					
					
					
			'rules-create-section-main-help' :  'Una regla firewall consiste en una seria de reglas que definen el tráfico a aplicar.'+
			' Estas reglas definen los programas a bloquear, usando una lista de control para el acceso a internet, para la restricción de tráfico de puertos o direcciones IPs específicas. \n\n'+
            'Para crear una nueva regla firewall el usuario deberá introducir la siguiente información: \n'+
            '\r· Nombre: Define un nombre que ayudará al usuario a manejar las diferentes reglas. Se puede definir un nombre ya existente, por lo que el usuario deberá tenenr cuidado.\n'+
            '\r· Protocolo: El usuario puede específicar el protocolo a aplicar. Los protocolos que se pueden aplicar son:\n'+
            '\r\t· ICMP: Es usado por dispositivos de red, '+
            '\r\t  tales como los ruters para enviar mensajes'+
            '\r\t  de error. ICMP también puede ser usado para'+
            '\r\t  transmitir mensajes ICMP.\n'+
            '\r\t· TCP:  Protocolo que garantiza que los'+
            '\r\t  datos serán entregados sin errores a su'+
            '\r\t  destino y en el mismo orden en el que'+
            '\r\t  se transmitierón.\n'+
            '\r\t· UDP: Protocolo que permite el envío de'+
            '\r\t  datagramas a través de la red sin que'+
            '\r\t  se haya establecido previamente conexión,'+
            '\r\t  tampoco tiene confirmación ni control'+
            '\r\t  de flujo.\n'+
            '\r· Acción : Acción que se aplica en el tráfico que coincide con la regla.\n'+
            '\r· Dirección/Subred fuente: Dirección Ip de fuente o CIDR.\n'+
            '\r· Dirección/Subred destino: Dirección Ip de destino o CIDR.\n'+
            '\r· Puerto Fuente: Número puerto o rango fuente.\n'+
            '\r· Puerto Destino: Número puerto o rango de destino.\n'+
            '\r· Descripción : Aquí podemos explicar la finalidad de la regla.\n'+
            '\r· Compartida : Cuando aplicamos la comppartición de  la regla esta será visible para otros tenants, diferentes a el tenant propietario, '+
            'por lo que podrá ser usada por políticas firewall de tenants diferentes.\n'+
            '\r· Habilitar : Cuando deshabilitamos la regla, esta estaŕa deshabilitada en el política firewall. '+
            'Esto facilita la política ya que si no queremos aplicar esa regla solo tenemos que deshabilitarla sin necesidad de desasociarla.\n', 
            
            
            
            'rules-edit-section-main-help' :  'Existe información que puede ser actualizada en una regla. Los datos que se pueden modificar son: \n'+
            '\r· Nombre: Elija un nombre que le ayude a encontrar con rapidez la máquina. Es posible repetir nombres existentes, así que tenga cuidado.\n'+
            '\r· Protocolo: El usuario puede específicar el protocolo a aplicar. Los protocolos que se pueden aplicar son:\n'+
            '\r\t· ICMP: Es usado por dispositivos de red, '+
            '\r\t  tales como los ruters para enviar mensajes'+
            '\r\t  de error. ICMP también puede ser usado para'+
            '\r\t  transmitir mensajes ICMP.\n'+
            '\r\t· TCP:  Protocolo que garantiza que los'+
            '\r\t  datos serán entregados sin errores a su'+
            '\r\t  destino y en el mismo orden en el que'+
            '\r\t  se transmitierón.\n'+
            '\r\t· UDP: Protocolo que permite el envío de'+
            '\r\t  datagramas a través de la red sin que'+
            '\r\t  se haya establecido previamente conexión,'+
            '\r\t  tampoco tiene confirmación ni control'+
            '\r\t  de flujo.\n'+
            '\r· Acción : Acción que se aplica en el tráfico que coincide con la regla.\n'+
            '\r· Dirección/Subred fuente: Dirección Ip de fuente o CIDR.\n'+
            '\r· Dirección/Subred destino: Dirección Ip de destino o CIDR.\n'+
            '\r· Puerto Fuente: Número puerto o rango fuente.\n'+
            '\r· Puerto Destino: Número puerto o rango de destino.\n'+
            '\r· Descripción : Aquí podemos explicar la finalidad de la regla.\n'+
            '\r· Compartida : Cuando aplicamos la comppartición de  la regla esta será visible para otros tenants, diferentes a el tenant propietario, '+
            'por lo que podrá ser usada por políticas firewall de tenants diferentes.\n'+
            '\r· Habilitar : Cuando deshabilitamos la regla, esta estaŕa deshabilitada en el política firewall. '+
            'Esto facilita la política ya que si no queremos aplicar esa regla solo tenemos que deshabilitarla sin necesidad de desasociarla.\n', 
            
            
            'policy-create-section-main-help' : 'Una política firewall es una lista ordenada de reglas firewall. Una política'+
            'sirve como una plantilla que será utilizado para la creación de un firewall.\n\n'+
            'Para crear una nueva política el usuario deberá proporcionar los siguientes datos: \n'+
            '\r· Nombre: Elija un nombre que le ayude a encontrar con rapidez la política. Es posible repetir nombres existentes, así que tenga cuidado.\n'+
            '\r· Seleccionar Reglas: Aquí el usuario añadirá las reglas que formarán la política. Se puede selecionar una o más reglas.\n'+
            '\r· Descripción : Aquí se puede introducir una breve explicación con los detalles de la política.\n'+
            '\r· Compartido : Cuando activamos la compratición de una política está será visible por otros tenants diferentes a el tenant propietario, '+
            'y puede ser usado para instanciarse por firewall pertenecientes a otros tenants.\n'+
            '\r· Auditado : Cuando este valor es verdadero indicamos que la política firewall ha sido auditada. '+
            'Cada vez que se realizan modificaciones en la política o en las reglas que lo componenen, este atributo sera cambiado a falso y será necesario'+
            'cambiar este atributo manualmente para auditar la política.\n ',   
            
            'policy-edit-section-main-help' : 'Existe información que puede actualizarse en una política.\n'+
            'Los datos que se pueden actualizar son: \n'+
            '\r· Nombre: Elija un nombre que le ayude a encontrar con rapidez la política. Es posible repetir nombres existentes, así que tenga cuidado.\n'+
            '\r· Seleccionar Reglas: Aquí el usuario añadirá las reglas que formarán la política. Se puede selecionar una o más reglas.\n'+
            '\r· Descripción : Aquí se puede introducir una breve explicación con los detalles de la política.\n'+
            '\r· Compartido : Cuando activamos la compratición de una política está será visible por otros tenants diferentes a el tenant propietario, '+
            'y puede ser usado para instanciarse por firewall pertenecientes a otros tenants.\n'+
            '\r· Auditado : Cuando este valor es verdadero indicamos que la política firewall ha sido auditada. '+
            'Cada vez que se realizan modificaciones en la política o en las reglas que lo componenen, este atributo sera cambiado a falso y será necesario'+
            'cambiar este atributo manualmente para auditar la política.\n ',   
            
            'firewall-create-section-main-help' : 'Firewall representa un firewall lógico que un tenant puede instanciar'+
            ' y manejar. Un firewall esta asociado con una política firewall.\n\n'+
            'Para crear un firewall el usuario deberá proporcionar la siguiente información: \n'+
            '\r· Nombre: Elija un nombre que le ayude a encontrar con rapidez la firewall. '+
            'Es posible repetir nombres existentes, así que tenga cuidado.\n'+           
            '\r· Política: La política firewall con la que el firewall se asocia.'+
            'Este Firewall implementará las reglas contenidas en la política firewall.\n'+
            '\r· Descripción : Aquí el usuario puede introducir una brebe descripción acerca del firewall.\n'+            
            '\r· Admin State Up : Estado administrativo del firewall. Si es falso (down), el firewall no transmite ningún paquete. \n',   
            
            'firewall-edit-section-main-help' : 'Existe información que puede actualizarse en el firewall.\n'+
            'Los datos que se pueden actualizar son: \n'+
            '\r· Nombre: Elija un nombre que le ayude a encontrar con rapidez la firewall. '+
            'Es posible repetir nombres existentes, así que tenga cuidado.\n'+           
            '\r· Política: La política firewall con la que el firewall se asocia.'+
            'Este Firewall implementará las reglas contenidas en la política firewall.\n'+
            '\r· Descripción : Aquí el usuario puede introducir una brebe descripción acerca del firewall.\n'+            
            '\r· Admin State Up : Estado administrativo del firewall. Si es falso (down), el firewall no transmite ningún paquete. \n',   
            
            'rule-insert-section-main-help' : 'La regla es insertada en la posición indicada, antes o despues de la reglas seleccionadas, '+
            'si insertar antes e insertar despues se rellenana entonces insertar depués será ignorado. '+
			'Si no se selecciona ninguna regla en insertar luego e insertar antes entonces la nueva regla '+
			'será insertada en el principio de la política.',
			
            
            
            'rule-delete-error' : 'Error en el borrado de la regla',  
            'rule-create-vtype-cidr-text' : 'Debe introducir una Ip válida o cidr.<br>Ej: \'192.13.2.1\' <br>O 192.13.2.0/24',
			'rule-create-vtype-ports-Text' : 'Debe introducir un puerto o rango válido.<br>Ej: 22.<br>O 35:69',
			'rule-create-name' : 'Nombre',
			'rule-create-protocol' : 'Protocolo',
			'rule-create-action' : 'Acción',
			'rule-create-s_address' : 'Dirección/Subred fuente',
			'rule-create-d_address' : 'Dirección/Subred destino',
			'rule-create-s_port' : 'Puerto fuente',
			'rule-create-d_port' : 'Puerte destino',
			'rule-create-description' : 'Descripción',
			'rule-create-shared' : 'Compartir',
			'rule-create-enabled' : 'Habilitar',
			'rule-create-error' : 'Error en la creación de la regla',			
			'rule-edit-vtype-cidr-text' : 'Debe introducir una Ip válida o cidr.<br>Ej: \'192.13.2.1\' <br>O 192.13.2.0/24',
			'rule-edit-vtype-ports-Text' : 'Debe introducir un puerto o rango válido.<br>Ej: 22.<br>O 35:69',
			'rule-edit-name' : 'Nombre',
			'rule-edit-protocol' : 'Protocolo',
			'rule-edit-action' : 'Acción',
			'rule-edit-s_address' : 'Dirección/Subred fuente',
			'rule-edit-d_address' : 'Dirección/Subred destino',
			'rule-edit-s_port' : 'Puerto fuente',
			'rule-edit-d_port' : 'Puerte destino',
			'rule-edit-description' : 'Descripción',
			'rule-edit-shared' : 'Compartir',
			'rule-edit-enabled' : 'Habilitar',
			'rule-edit-error' : 'Error en la edición de la regla',
            
            'fwaas-create-firewall' : 'Crear Firewall',
            'fwaas-create-policy' : 'Crear Política',
            'fwaas-create-rule' : 'Crear Regla',
            'fwaas-edit-firewall' : 'Editar Firewall',
            'fwaas-edit-policy' : 'Editar Política',
            'fwaas-edit-rule' : 'Editar Regla',
            'fwaas-delete-firewall' : 'Eliminar Firewall',
            'fwaas-delete-policy' : 'Eliminar Política',
            'fwaas-delete-rule' : 'Eliminar Regla',
            'fwaas-insert-rule' : 'Insertar Regla',
            'fwaas-remove-rule' : 'Remover Regla',
            'fwaas-audit-policy' : 'Auditar Política',
            'fwaas-enable-rule' : 'Habilitar Regla',
            'fwaas-disable-rule' : 'Deshabilitar Regla',
            
            
            
            'fwaas-rule-head-available' : 'Available',
            'fwaas-show-details' : 'Detalles Regla',
            'fwaas-show-details-rule' : 'Vista detallada de la regla $1',
            'fwaas-show-details-firewall' : 'Vista detallada del firewall $1',
            'fwaas-show-details-policy' : 'Vista detallada de la política $1',
            
            'fwaas-details-policy' : 'Detalles de Política',
            'fwaas-details-firewall' : 'Detalles de Firewall',
            
            'fwaas-confirm-enable-rule' : '¿Seguro que desea habilitar la regla $1?',
            'fwaas-confirm-disable-rule' : '¿Seguro que desea deshabilitar la regla $1?',
            'fwaas-confirm-audit-policy' : '¿Seguro que desea auditar la política $1?',
            
            'fwaas-confirm-delete-rule' : '¿Seguro que desea borrar la regla $1?',
            'fwaas-confirm-delete-firewall' : '¿Seguro que desea eliminar el firewall $1?',
            'fwaas-confirm-delete-policy' : '¿Seguro quedesea eliminar la política $1?',
            'fwaas-confirm-remove-rule' : '¿Seguro que desea retirar la regla $1 de la política?',
            'fwaas-error-remove-rule' : 'Error retirando la regla $1 de la política',
            
            'fwaas-error-audit-policy' : 'Error auditando la política $1',
            'fwaas-error-delete-policy' : 'Error eliminando la política $1',
            'fwaas-error-delete-firewall' : 'Error eliminando el firewall $1',
            
            
            
            'fwaas-error-create-policy' : 'Error en crear Política',
            'fwaas-error-create-firewall' : 'Error en crear firewall', 
            'fwaas-error-edit-policy' : 'Error en editar Política',
            'fwaas-error-edit-firewall' : 'Error en editar firewall',                        
            'fwaas-action-create-policy-rule' : 'Reglas',
            'fwaas-action-create-policy-name' : 'Nombre',
            'fwaas-action-create-policy-description' : 'Descripción',
            'fwaas-action-create-policy-shared' : 'Shared',
            'fwaas-action-create-policy-audited' : 'Audited',            
            'fwaas-action-edit-policy-rule' : 'Reglas',
            'fwaas-action-edit-policy-name' : 'Nombre',
            'fwaas-action-edit-policy-description' : 'Descripción',
            'fwaas-action-edit-policy-shared' : 'Shared',
            'fwaas-action-edit-policy-audited' : 'Audited',            
            'fwaas-action-create-firewall-policy' : 'Política',
            'fwaas-action-create-firewall-name' : 'Nombre',
            'fwaas-action-create-firewall-description' : 'Descripción',
            'fwaas-action-create-firewall-shared' : 'Shared',
            'fwaas-action-create-firewall-admin_state_up' : 'Admin State Up',            
            'fwaas-action-edit-firewall-policy' : 'Política',
            'fwaas-action-edit-firewall-name' : 'Nombre',
            'fwaas-action-edit-firewall-description' : 'Descripción',
            'fwaas-action-edit-firewall-shared' : 'Shared',
            'fwaas-action-edit-firewall-admin_state_up' : 'Admin State Up',
            
            
            'fwaas-error-insert-rule' : 'Error em insertar regla',
            'fwaas-insert-rule-after' : 'Insertar Después',
            'fwaas-insert-rule-before' : 'Insertar Antes',
            'fwaas-insert-rule' : 'Regla',
            
            
            'uptree-rules' : 'Reglas',
            'uptree-policies' : 'Políticas',
            'uptree-head-admin_state_up' : 'Admin State Up',
            'uptree-head-shared' : 'Compartido',
            'uptree-head-audited' : 'Auditado',
            'uptree-head-name' : 'Nombre',
            'uptree-head-status' : 'Estado',
            'uptree-title' : 'Estructura',
            
            'emptypanel-title' : 'Información',
            'emptypanel-html' :  '<p><br>Seleccione las filas de la izquierda para empezar a manejar el plugin Firewall</p>',
			'emptypanel-update-epolicy' : '<p><br>Sección de lista de políticas firewall</p>',
			'emptypanel-update-efirewall' : '<p><br>Sección de lista de firewalls</p>',
			
			'fwaas-grid-head-name' :  'Nombre',
			'fwaas-grid-head-id' : 'Id',
			'fwaas-grid-head-enabled' : 'Habilitado',
			'fwaas-grid-head-shared' : 'Compartido',
			'fwaas-grid-head-position' : 'Posición',
			'fwaas-grid-head-protocol' : 'Protocolo',
			'fwaas-grid-head-ip_version' : 'Versión Ip',
			'fwaas-grid-head-source_ip_address' : 'Ip Fuente',
			'fwaas-grid-head-destination_ip_address' : 'Ip Destino',
			'fwaas-grid-head-source_port' : 'Puerto Fuente',
			'fwaas-grid-head-destination_port' : 'Puerto Destino',
			'fwaas-grid-head-description': 'Descripción',
			'fwaas-grid-head-available' : 'Habilitado',
			'fwaas-grid-head-policy_id' : 'Política Id',
			'fwaas-grid-head-action' : 'Acción',
			'fwaas-grid-head-tenant_id' : 'Tenant Id'

        },
        en: {
            pluginName: 'Firewall Portal Plugin',
            demoButton: 'Button',
            'cancel' : 'Cancel',
            'submit' : 'Submit',
            'create' : 'Create',
            'value' : 'Value',
            'field' : 'Field',
            'close' : 'Close',
            'refresh' : 'Refresh',
            'emptyText' : 'This field must be specified',
            'instance-create-section-main-help' : 'Para crear una nueva máquina virtual o instancia,'+
            ' deberá proveer la siguiente información:\n'+
            '\r· Nombre de la máquina virtual: Elija un nombre que le ayude a encontrar con rapidez la máquina y lo '+
            'que hace de un vistazo. Es posible repetir nombres existentes, así que tenga cuidado.\n'+
            "\r· Fuente: La máquina virtual se creará a partir de una imagen maestra o bien de un 'Snapshot' "+ 
            "tomado de una máquina existente.\n"+
            "\r· Flavor: Lista de tamaños y combinaciones de recursos que se pueden crear. A la derecha podrá "+ 
            "visualizar esta información seleccionando en el combo.\n"+
            "\r· Lista de Fuentes: Busque entre la lista de imágenes o 'Snapshots' la que desea usar.\n\n"+
            "Una vez que haya rellenado estos campos, puede pasar a la siguiente pantalla.",
            'instance-create-section-network-help' : 'Seleccione de la lista de la izquierda las redes a las que '+
            'quiere que se conecte la máquina virtual.\n\nSiguiendo el orden establecido a la derecha, la máquina '+
            'virtual creará de manera automática nuevas interfaces virtuales conectadas a dichas redes.\n\n'+
            'Una vez seleccionadas las redes, puede pasar a la siguiente página.',
            'instance-create-section-security-help' : 'De manera opcional puede inyectar a la máquina virtual o '+
            'instancia una clave pública a elegir entre las disponibles en el combo.\nPara gestionar dichas claves, '+
            "use la aplicación 'Seguridad'.\n\nRecuerde que su imagen maestra o 'Snapshot' debe implementar un componente"+
            " que sea capaz de leer esta información desde los metadatos.\n\n"+
            "Luego, seleccione de la lista de la izquierda los grupos de seguridad con las reglas del cortafuegos "+
            "correspondiente.\nPuede agrupar tantos grupos de seguridad como desee, y recuerde que puede añadir, quitar"+
            " o modificar dichos grupos y sus reglas en cualquier momento.\n\n"+
            "Una vez configurados claves y cortafuegos, puede pasar a la siguiente página.",
            'instance-create-section-userdata-help' : "Solo para usuarios avanzados:\n\n"+
            "Puede pasar información al arranque de la máquina virtual o instancia dentro de los metadatos asociados."+
            "\n\nPara poder aprovechar estos datos, deberá tener código dentro de la máquina capaz de interpretar "+
            "esta información.\n\n"+
            "Revise que todos los datos son correctos y de a 'Finalizar' para crear la máquina virtual o instancia.",
            
            'firewall-container-html' : '<img align = "left" style="padding-right: 10px;" src="plugin/static/firewall/images/fw_32.png" >'+
                 '<table>'+
					'<tr> '+
						'<td width=50></td>'+
						'<td width=100><font size=1pt>Admin State Up:</td>'+
						'<td><font size=1pt>$1</p></td>'+
						'<td width=100></td>'+
						'<td width=75> <font size=1pt> Firewall Policy:   </td>'+
						'<td> <font size=1pt> $2 </td>'+
						
						
					'</tr>'+
					'<tr>'+
						'<td width=50></td>'+
						'<td width=50 ><font size=1pt>Status:</td>'+
						'<td><font size=1pt> $3 </p></td>'+		
						'<td width=100></td>'+
						'<td width=75> <font size=1pt> Id:   </td>'+
						'<td> <font size=1pt> $4 </td>'+			
					'</tr>'+
				'</table>',
			
			'policy-container-html' :'<img align = "left" style="padding-right: 10px;" src="plugin/static/firewall/images/policy_32.png" >' + 
					'<table>' + 
						'<tr> ' + 
							'<td width=50></td>' + 
							'<td width=100><font size=1pt>Shared:</td>' + 
							'<td><font size=1pt>$1</p></td>' + 
							'<td width=100></td>'+
							'<td width=45> <font size=1pt> Id:   </td>'+
							'<td> <font size=1pt> $3 </td>'+	
						'</tr>' + 
						'<tr>' + 
							'<td width=50></td>' + 
							'<td width=50 ><font size=1pt>Audited:</td>' + 
							'<td><font size=1pt>$2</p></td>' + 
						'</tr>' + 
					'</table>',
					
			'rules-create-section-main-help' :  'A firewall rule represents a collection of attributes like ports, '+
			'ip addresses which define match criteria and action (allow, or deny) that needs to be taken on the '+
			'matched data traffic. \n\n'+
            'To create a new firewall rule the user shall provide the following information: \n'+
            '\r· Name: Choose a name that will help you to find the rule. '+
            'You can repeat existing names, so be careful.\n'+
            '\r· Protocol: Here the user can specify the IP protocol to aply. These values can be:\n'+
            '\r\t· ICMP: It is used by network devices, '+
            '\r\t  like routers, to send error messages.'+
            '\r\t  ICMP can also be used to relay query'+
            '\r\t  messages.\n'+
            '\r\t· TCP:  It provides reliable, ordered, error-'+
            '\r\t  checked delivery of a stream of octets'+
            '\r\t  between programs running connected'+
            '\r\t  to a local area network, intranet or the'+
            '\r\t  public Internet.\n'+
            '\r\t· UDP: It is suitable for purposes where'+
            '\r\t  error checking and correction is either'+
            '\r\t  not necessary or performed in the'+
            '\r\t  application, avoiding the overhead of'+
            '\r\t  such processing atthe network interface'+
            '\r\t  level.\n'+
            '\r· Action : Action to be performed on the traffic matching the rule.\n'+
            '\r· Source Address/Subnet:  Source IP address or CIDR.\n'+
            '\r· Destination Address/Subnet:  Source IP address or CIDR.\n'+
            '\r· Source Port: Source port number or a range.\n'+
            '\r· Destination Port: Destination port number or a range.\n'+
            '\r· Description : Here you can explain the rule\'s goal.\n'+
            '\r· Shared : When set to True makes this Firewall Rule visible to tenants other than its owner, '+
            'and it can be used in Firewall Policies not owned by its tenant.\n'+
            '\r· Enabled : When set to False will disable this rule in the Firewall Policy. Facilitates selectively turning '+
            'off rules without having to disassociate the rule from the Firewall Policy.\n', 
            
            
            
            'rules-edit-section-main-help' :  'There are information that you can update in the rules, the fields that you can modified are: \n'+
            '\r· Name: Choose a name that will help you to find the rule. '+
            'You can repeat existing names, so be careful.\n'+
            '\r· Protocol: Here the user can specify the IP protocol to aply. These values can be:\n'+
            '\r\t· ICMP: It is used by network devices, '+
            '\r\t  like routers, to send error messages.'+
            '\r\t  ICMP can also be used to relay query'+
            '\r\t  messages.\n'+
            '\r\t· TCP:  It provides reliable, ordered, error-'+
            '\r\t  checked delivery of a stream of octets'+
            '\r\t  between programs running connected'+
            '\r\t  to a local area network, intranet or the'+
            '\r\t  public Internet.\n'+
            '\r\t· UDP: It is suitable for purposes where'+
            '\r\t  error checking and correction is either'+
            '\r\t  not necessary or performed in the'+
            '\r\t  application, avoiding the overhead of'+
            '\r\t  such processing atthe network interface'+
            '\r\t  level.\n'+
            '\r· Action : Action to be performed on the traffic matching the rule.\n'+
            '\r· Source Address/Subnet:  Source IP address or CIDR.\n'+
            '\r· Destination Address/Subnet:  Source IP address or CIDR.\n'+
            '\r· Source Port: Source port number or a range.\n'+
            '\r· Destination Port: Destination port number or a range.\n'+
            '\r· Description : Here you can explain the rule\'s goal.\n'+
            '\r· Shared : When set to True makes this Firewall Rule visible to tenants other than its owner, '+
            'and it can be used in Firewall Policies not owned by its tenant.\n'+
            '\r· Enabled : When set to False will disable this rule in the Firewall Policy. Facilitates selectively turning '+
            'off rules without having to disassociate the rule from the Firewall Policy.\n', 
                    
            
            'policy-create-section-main-help' : 'Firewall Policy is an ordered list of Firewall Rules. A Firewall '+
            'Policy serves as a template, and the logical Firewall provides for an instantiation of that template.\n\n'+
            'To create a new firewall policy the user shall provide the following information: \n'+
            '\r· Name: Choose a name that will help you to find the policy. '+
            'You can repeat existing names, so be careful.\n'+
            '\r· Select multiple rules: Here the user select the rules to associate to this policy. The user can select more than one.\n'+
            '\r· Description : Here you can explain the policy\'s goal.\n'+
            '\r· Shared : When set to True makes this Firewall Policy visible to tenants other than its owner, '+
            'and can be used to associate with Firewalls not owned by its tenant.\n'+
            '\r· Audited : When set to True by the policy owner indicates that the Firewall Policy has been audited. '+
            'This attribute is meant to aid in the firewall policy audit workflows. Each time the Firewall Policy or the'+
            'associated Firewall Rules are changed, this attribute will be set to False and will have to be explicitly '+
            'set to True through an update operation. \n',   
            
            'policy-edit-section-main-help' : 'There are informaton that the user can modified in the firewall policies.\n'+
            'The field that the user can modified are: \n'+
            '\r· Name: Choose a name that will help you to find the policy. '+
            'You can repeat existing names, so be careful.\n'+
            '\r· Select multiple rules: Here the user select the rules to associate to this policy. The user can select more than one.\n'+
            '\r· Description : Here you can explain the policy\'s goal.\n'+
            '\r· Shared : When set to True makes this Firewall Policy visible to tenants other than its owner, '+
            'and can be used to associate with Firewalls not owned by its tenant.\n'+
            '\r· Audited : When set to True by the policy owner indicates that the Firewall Policy has been audited. '+
            'This attribute is meant to aid in the firewall policy audit workflows. Each time the Firewall Policy or the'+
            'associated Firewall Rules are changed, this attribute will be set to False and will have to be explicitly '+
            'set to True through an update operation. \n',    
            
              
            'firewall-create-section-main-help' : 'Firewall represents a logical firewall resource that a tenant'+
            ' can instantiate and manage. A firewall is associated with one firewall_policy.\n\n'+
            'To create a new firewall the user shall provide the following information: \n'+
            '\r· Name: Choose a name that will help you to find the firewall. '+
            'You can repeat existing names, so be careful.\n'+
            '\r· Policy: The Firewall Policy that this Firewall is associated with. '+
            'This Firewall will implement the rules contained in this Firewall Policy.\n'+
            '\r· Description : Here you brief description of the firewall.\n'+            
            '\r· Admin State Up : The administrative state of the Firewall. If False (down), the Firewall does not forward any packets. \n',   
            
            'firewall-edit-section-main-help' : 'There are informaton that the user can modified in the firewall.\n'+
            'The field that the user can modified are: \n'+
            '\r· Name: Choose a name that will help you to find the firewall. '+
            'You can repeat existing names, so be careful.\n'+
            '\r· Policy: The Firewall Policy that this Firewall is associated with. '+
            'This Firewall will implement the rules contained in this Firewall Policy.\n'+
            '\r· Description : Here you brief description of the firewall.\n'+            
            '\r· Admin State Up : The administrative state of the Firewall. If False (down), the Firewall does not forward any packets. \n',     
                   
           	'rule-insert-section-main-help' : 'The rule is inserted relative to the position of the rule_id set in insert_before or insert_after. '+
			'If insert_before is set, insert_after is ignored. '+
			'If both insert_before and insert_after are not set, the new rule is inserted at the top of the policy.',   
                         
            'rule-delete-error' : 'Error in rule deletion',   
           	'rule-create-vtype-cidr-text' : 'You must introduce a valid Ip or cidr.<br>Ex: \'192.13.2.1\' <br>Or 192.13.2.0/24',
			'rule-create-vtype-ports-Text' : 'You must introduce a valid port.<br>Example: 22.<br>Or a range. Example: 35:69',
			'rule-create-name' : 'Name',
			'rule-create-protocol' : 'Protocols',
			'rule-create-action' : 'Action',
			'rule-create-s_address' : 'Source Address/Subnet',
			'rule-create-d_address' : 'Destination Address/Subnet',
			'rule-create-s_port' : 'Source Port',
			'rule-create-d_port' : 'Destination Port',
			'rule-create-description' : 'Description',
			'rule-create-shared' : 'Shared',
			'rule-create-enabled' : 'Enabled',
			'rule-create-error' : 'Error in rule creation',			
			'rule-edit-vtype-cidr-text' : 'You must introduce a valid Ip or cidr.<br>Ex: \'192.13.2.1\' <br>Or 192.13.2.0/24',
			'rule-edit-vtype-ports-text' : 'You must introduce a valid port.<br>Example: 22.<br>Or a range. Example: 35:69',
			'rule-edit-name' : 'Name',
			'rule-edit-protocol' : 'Protocols',
			'rule-edit-action' : 'Action',
			'rule-edit-s_address' : 'Source Address/Subnet',
			'rule-edit-d_address' : 'Destination Address/Subnet',
			'rule-edit-s_port' : 'Source Port',
			'rule-edit-d_port' : 'Destination Port',
			'rule-edit-description' : 'Description',
			'rule-edit-shared' : 'Shared',
			'rule-edit-enabled' : 'Enabled',
			'rule-edit-error' : 'Error in rule edition',
			
			'fwaas-create-firewall' : 'Create Firewall',
            'fwaas-create-policy' : 'Create Policy',
            'fwaas-create-rule' : 'Crete Rule',
            'fwaas-edit-firewall' : 'Edit Firewall',
            'fwaas-edit-policy' : 'Edit Policy',
            'fwaas-edit-rule' : 'Edit Rule',
            'fwaas-delete-firewall' : 'Delete Firewall',
            'fwaas-delete-policy' : 'Delete Policy',
            'fwaas-delete-rule' : 'Delete Rule',
            'fwaas-insert-rule' : 'Insert Rule',
            'fwaas-remove-rule' : 'Remove Rule',
            'fwaas-audit-policy' : 'Audit Policy',
            'fwaas-enable-rule' : 'Enable Rule',
            'fwaas-disable-rule' : 'Disable Rule',
            'fwaas-rule-head-available' : 'Available',            
            'fwaas-show-details' : 'Rule Details',
            'fwaas-show-details-rule' : 'Detailed View of the rule $1',
            'fwaas-show-details-firewall' : 'Detailed View of the firewall $1',
            'fwaas-show-details-policy' : 'Detailed View of the policy $1',
            'fwaas-details-policy' : 'Policy Details',
            'fwaas-details-firewall' : 'Firewall Details',
            
            'fwaas-confirm-enable-rule' : 'Are you sure you want to enable the rule $1?',
            'fwaas-confirm-disable-rule' : 'Are you sure you want to disable the rule $1?',
            'fwaas-confirm-audit-policy' : 'Are you sure you want to audit the policy $1?',
            
            'fwaas-confirm-delete-rule' : 'Are you sure you want to delete the rule $1?',
            'fwaas-confirm-delete-firewall' : 'Are you sure you want to delete the firewall $1?',
            'fwaas-confirm-delete-policy' : 'Are you sure you want to delete the policy $1?',
            'fwaas-confirm-remove-rule' : 'Are you sure you want to remove the rule $1?',
            'fwaas-error-remove-rule' : 'Error removing the rule $1',
            
            
            'fwaas-error-audit-policy' : 'Error auditing the policy $1',
            'fwaas-error-delete-policy' : 'Error deleting the policy $1',
            'fwaas-error-delete-firewall' : 'Error deleting the firewall $1',
            
            
            
            
            
            'fwaas-error-create-policy' : 'Error in Policy creation',
            'fwaas-error-create-firewall' : 'Error in Firewall creation', 
            'fwaas-error-edit-policy' : 'Error in Policy edition',
            'fwaas-error-edit-firewall' : 'Error in Firewall edition',                        
            'fwaas-action-create-policy-rule' : 'Rules',
            'fwaas-action-create-policy-name' : 'Name',
            'fwaas-action-create-policy-description' : 'Description',
            'fwaas-action-create-policy-shared' : 'Shared',
            'fwaas-action-create-policy-audited' : 'Audited',            
            'fwaas-action-edit-policy-rule' : 'Rules',
            'fwaas-action-edit-policy-name' : 'Name',
            'fwaas-action-edit-policy-description' : 'Description',
            'fwaas-action-edit-policy-shared' : 'Shared',
            'fwaas-action-edit-policy-audited' : 'Audited',            
            'fwaas-action-create-firewall-policy' : 'Policy',
            'fwaas-action-create-firewall-name' : 'Name',
            'fwaas-action-create-firewall-description' : 'Description',
            'fwaas-action-create-firewall-shared' : 'Shared',
            'fwaas-action-create-firewall-admin_state_up' : 'Admin State Up',            
            'fwaas-action-edit-firewall-policy' : 'Policy',
            'fwaas-action-edit-firewall-name' : 'Name',
            'fwaas-action-edit-firewall-description' : 'Description',
            'fwaas-action-edit-firewall-shared' : 'Shared',
            'fwaas-action-edit-firewall-admin_state_up' : 'Admin State Up',
            
            'fwaas-error-insert-rule' : 'Error in rule insertion',
            'fwaas-insert-rule-after' : 'Insert After',
            'fwaas-insert-rule-before' : 'Insert Before',
            'fwaas-insert-rule' : 'Insert Rule',
            
            
            'uptree-rules' : 'Rules',
            'uptree-policies' : 'Policy',
            'uptree-head-admin_state_up' : 'Admin State Up',
            'uptree-head-shared' : 'Shared',
            'uptree-head-audited' : 'Audited',
            'uptree-head-name' : 'Name',
            'uptree-head-status' : 'Status',
            
            'uptree-title' : 'Structure',
            
            'emptypanel-title' : 'Information',
            'emptypanel-html' :  '<p><br>Select left rows to manage the firewall plugin</p>',
            
            'emptypanel-update-epolicy' : '<p><br>Policy List Section</p>',
			'emptypanel-update-efirewall' : '<p><br>Firewall List Section</p>',
			
			
			
			'fwaas-grid-head-name' :  'Name',
			'fwaas-grid-head-id' : 'Id',
			'fwaas-grid-head-enabled' : 'Enabled',
			'fwaas-grid-head-shared' : 'Shared',
			'fwaas-grid-head-position' : 'Position',
			'fwaas-grid-head-protocol' : 'Protocol',
			'fwaas-grid-head-ip_version' : 'Ip Version',
			'fwaas-grid-head-source_ip_address' : 'Source Ip Address',
			'fwaas-grid-head-destination_ip_address' : 'Destination Ip Address',
			'fwaas-grid-head-source_port' : 'Source Port',
			'fwaas-grid-head-destination_port' : 'Destination Port',
			'fwaas-grid-head-description': 'Description',
			'fwaas-grid-head-available' : 'Available',
			'fwaas-grid-head-policy_id' : 'Policy Id',
			'fwaas-grid-head-action' : 'Action',
			'fwaas-grid-head-tenant_id' : 'Tenant Id'

        }
    }
});