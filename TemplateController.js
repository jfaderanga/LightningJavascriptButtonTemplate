({
	init : function(component, event, helper) {
        
        var copyString = function (str) {

            var elem = document.createElement('textarea');
            elem.value = str;
        
            document.body.appendChild(elem);
            elem.select();
            
            document.execCommand('copy');
            document.body.removeChild(elem);
        }
        
        var serverAction = component.get('c.serverAction');
        
        serverAction.setParams({recordId : component.get('v.recordId')});
        
        serverAction.setCallback(this, function(response) {
            
           	var toastEvent = $A.get("e.force:showToast");
            
            if (response.getState() === 'SUCCESS') {
				
                var resp = JSON.stringify(response.getReturnValue());
                resp = JSON.parse(resp);
                
                var textToCopy = resp.Name + '-' + resp.Email;
                
                copyString(textToCopy);
                
            	toastEvent.setParams({"type" : 'success', "title": 'Success!', "message": textToCopy + ' was Copied!'});
            } else {
                toastEvent.setParams({"type" : 'error', "title": 'Unexpected error occurred.', "message": 'Unexpected error occurred.'});
            }
            toastEvent.fire();
        });
		
        $A.enqueueAction(serverAction);
	}
})
