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
                                script: "shared/script/createDocuments.py",
								actionUid: "xpath://actionUid",
                                policyUid: "xpath://toUid",
                                docPack: "xpath://documentPack"
							},
							method: "post",
						}
					}]
            },
			{ id: "complete", url:"complete.html"}
		]
	}
}
