({
	afterRender: function (component, helper) {
        this.superAfterRender();

        // we set the closeActionEvent here as it doesn't work on init
        // then we poll till the init action is finished before we closed
        component._interval = setInterval(
            $A.getCallback(function () {
                
                if (!component.get("v.doneAllAction")) return;

                clearInterval(component._interval);

                $A.get("e.force:closeQuickAction").fire();

            }), 100
        );
    }
})
