/*
 * Copyright (c) 2015 Brad Jones
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

define(function (require, exports, module)
{
	"use strict";
	
	// Import some modules
	var
		NodeDomain = brackets.getModule("utils/NodeDomain"),
		ExtensionUtils = brackets.getModule("utils/ExtensionUtils")
	;

	// Define some constants
	var
		HUMAN_NAME = 'Brackets Package Manager',
		COMP_NAME = 'bpm',
		BPM_BIN = ExtensionUtils.getModulePath(module, 'bin/bpm'),
		BPM_DOMAIN = ExtensionUtils.getModulePath(module, 'node/BpmDomain'),
	;
	
	// Create our node domain
	var nodejs = new NodeDomain(COMP_NAME, BPM_DOMAIN);
	
	// The install method differs for each platform
	switch (brackets.platform)
	{
		// Symlink bpm to ~/.local/bin/bpm
		// We are making an assumption that this folder exists in the $PATH
		// by default. It does on my Fedora 21 workstation... I'm hoping I
		// can make this assumption for most modern linux distros.
		case 'linux':
			
			nodejs.exec('symLink', BPM_BIN)
			.done(function ()
			{
				console.log('['+COMP_NAME+'] symlink installed ~/.local/bin/bpm');
			})
			.fail(function (err)
			{
				console.error('['+COMP_NAME+'] failed to create symlink!', err);
			});
			
		break;
		
		// TODO: After some brief Googling I believe the Mac install may be able
		// to be done more or less in the same way as the linux install.
		// However I could not confirm if "$HOME/.local/bin" existed in the
		// PATH by default.
		case 'mac': break;
		
		// TODO: At some point i'll develop this part on my windows machine.
		// However it's not a priority for me right now.
		case 'win': break;
	}
});
