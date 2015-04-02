(function ()
{
	"use strict";
	
	var os = require("os");
	
	function cmdGetMemory(total)
	{
		if (total)
		{
			return os.totalmem();
		}
		else
		{
			return os.freemem();
		}
	}
	
	function init(domainManager)
	{
		if (!domainManager.hasDomain("simple"))
		{
			domainManager.registerDomain("simple", {major: 0, minor: 1});
		}
		
		domainManager.registerCommand
		(
			"simple",       // domain name
			"getMemory",    // command name
			cmdGetMemory,   // command handler function
			false,          // this command is synchronous in Node
			"Returns the total or free memory on the user's system in bytes",
			[{name: "total", // parameters
				type: "string",
				description: "True to return total memory, false to return free memory"}],
			[{name: "memory", // return values
				type: "number",
				description: "amount of memory in bytes"}]
		);
	}
	
	exports.init = init;
	
}());
