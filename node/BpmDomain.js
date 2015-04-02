(function ()
{
	"use strict";
	
	// Import some modules
	var
		os = require('os'),
		fs = require('fs')
	;
	
	/**
	 * Creates a symlink so that the "bpm" command can be found in the $PATH
	 *
	 * We make some assumptions:
	 *
	 *     - That the folder $HOME/.local/bin is already in the $PATH
	 *
	 *     - That the environment variable $HOME exists and points
	 *       to the current users home directory.
	 *
	 *     - The current user has write permissions to the home directory.
	 *
	 * @param {string} src The absolute path to the bpm command.
	 */
	function symLink(src)
	{
		if (!fs.existsSync(process.env.HOME + '/.local'))
		{
			fs.mkdirSync(process.env.HOME + '/.local');
		}
		
		if (!fs.existsSync(process.env.HOME + '/.local/bin'))
		{
			fs.mkdirSync(process.env.HOME + '/.local/bin');
		}
		
		if (!fs.existsSync(process.env.HOME + '/.local/bin/bpm'))
		{
			fs.symlinkSync(src, process.env.HOME + '/.local/bin/bpm');
		}
	}
	
	/**
	 * NodeJs Domain Constructor
	 *
	 * This is where we register all the methods
	 * that we want to expose to the client side.
	 *
	 * @param {Object} domainManager
	 */
	exports.init = function (domainManager)
	{
		if (!domainManager.hasDomain("bpm"))
		{
			domainManager.registerDomain("bpm");
		}
		
		domainManager.registerCommand("bpm", "symLink", symLink, false);
	};
}());
