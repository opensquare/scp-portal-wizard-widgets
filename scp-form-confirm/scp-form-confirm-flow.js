{
	docBase: "/root",
	formLists: {
		main: [
			{ id: "confirm", url: "confirm.html", 
                actions: [{
						name: "next",
						submission: {
							url: "http://project-pact-internal.osl-cloud.com:3010/executeScript/",
							data: {
                                script: "shared/script/invokeAction.py",
								actionUid: "xpath://actionUid",
							},
							method: "post",
						}
					}]
            },
			{ id: "complete", url:"complete.html"}
		]
	}
}
