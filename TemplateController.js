({
	init : function(component, event, helper) {
        
		var isSure = confirm("Photo will be deleted, are you sure?");
        
        if (!isSure) return;
        
        var serverDelete = component.get("c.deleteExistingPhoto");
        
        serverDelete.setParams({productId : component.get("v.recordId")});
        
        serverDelete.setCallback(this, function(response) {
            
           	var toastEvent = $A.get("e.force:showToast");
            
            if (response.getState() === "SUCCESS") {
                
            	toastEvent.setParams({"type" : "success", "title": "Success!", "message": "Photo has been deleted"});
                toastEvent.fire();
     			
                $A.get("e.force:refreshView").fire();
                
            } else {
                toastEvent.setParams({"type" : "error", "title": "Unexpected error occurred.", "message": "Unexpected error occurred."});
            }

            component.set("v.doneAllAction", true);

            toastEvent.fire();
        });
		
        $A.enqueueAction(serverDelete);
	}
})
