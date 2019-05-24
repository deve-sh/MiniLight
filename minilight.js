/*
	MiniLight (Mini Syntax Highlighter.)
	Author : Devesh Kumar
	Flexible in terms of operation.

	For instructions on Operation, check README.md.
	Meant to be used in conjunction with minilight-min.css.
*/

// Main function to highlight syntax.
// Takes code as a string in its parameters.
// Returns an HTML string with highlighted code.

// ---------------------
// Process
// ---------------------
// Take a string as code.
// Iterate to it character by character.
// Check if the character set is a comment initiator. If yes, ignore all highlighting until the comment does not end.
// If not, then check if the character is a string initiator. If yes, ignore all highlighting until the string doen't end.
// Check for appropriate symbols, keywords and numbers and highlight them.
// Return the highlighted code.
// --------

function highlight(code = ""){
	if(typeof code != "string"){
		throw new Error("Invalid type for code.");
	}

	// Required Variables

	let highlighted = ``,
		alphaReg = /[A-Z]/i,					// Alphabets Regex
		numReg = /\d+/mi,						// Numbers Regex
		symReg = /[=\/+,*.:-]+/mi,					// Symbols Regex
		strReg = /^["'`]$/m,							// Strings Regex
		decReg = /^let$|^const$|^var$|^for$|^do$|^while$|^if$|^else$|^in$|^throw$|^new$/,		// Keyword Regex
		others = /^console$|^Error$|^try$|^catch$|^Math$|^Object$|^function$|^log$|^Error$/,	// Other Keyword Regex
		opeReg = /^default$|^delete$|^typeof$|^string$/

	// Object to keep track of whether we are in a string.

	let inStr = {
		bool : false,
		delim : ``,
		newstr : ``
	}

	// Object to track if there are words in case we are not in a string.

	let current = {		
		inWord : false,
		word : ``
	}

	// Object to keep track of position in a comment.

	let inComment = {
		bool : false,
		delim : ''
	}

	for (let char = 0; char < code.length; char++){

		if(inComment.bool === false){

			// Checking for a comment initializer.

			if(code[char] === '/' && (code[char + 1]==='/' || code[char + 1]==='*')){
				inComment.bool = true;
				inComment.delim = code[char+1];
				highlighted += "<span class='comment'>" + code[char].toString();
				continue;	// Skip to next iteration.
			}

			if(inStr.bool === false)
			{
				// If we are not inside a string and not inside a comment.

				if(strReg.test(code[char])){
					// If the char is a string delimeter.
					inStr.bool = true;	// We are in a string now.
					inStr.delim = code[char];
					highlighted += `<span class='quotes'>${code[char]}</span>`;
				}
				else{
					// Finding keywords and comments in the code given we are not inside a string.

					if(current.inWord === false){

						// If we are not inside a word.

						if(alphaReg.test(code[char])){	// Identifiers cannot start with numbers.
							// Setting the state current.inWord to true.

							current.inWord = true;
							current.word += code[char].toString();
						}
						else{
							
							// Highlighting if it is a number or a symbol.

							if(numReg.test(code[char])){

								if(char === 0)
									highlighted += `<span class='number'>${code[char]}</span>`
								else{
									// Checking if the number is not a part of a variable name.

									if(char > 0 && !alphaReg.test(code[char - 1])) 
										highlighted += `<span class='number'>${code[char]}</span>`;
									else 
										highlighted += code[char].toString();
								}
							}
							else if(symReg.test(code[char])){
								highlighted += `<span class='symbol'>${code[char]}</span>`
							}
							else{
								highlighted += code[char].toString();
							}
						}
					}
					else{
						// Otherwise we are inside a word.

						if(alphaReg.test(code[char]) || numReg.test(code[char]) || /_/.test(highlighted[char])){
							current.word += code[char].toString();
						}
						else{
							// If the word has ended I.E : A space or a symbol or an invalid identifier.

							current.inWord = false; // No longer inside a word.

							// Now evaluating if the word we have with us is a keyword.

							if(decReg.test(current.word)){
								highlighted += `<span class='keyword'>${current.word}</span>`;
							}
							else if(others.test(current.word)){
								highlighted += `<span class='othkeywords'>${current.word}</span>`	
							}
							else if(opeReg.test(current.word)){
								highlighted += `<span class='operator'>${current.word}</span>`;
							}
							else{
								highlighted += `${current.word}`;
							}

							// Setting current.word to empty.

							current.word = ``;

							// Adding the character that comes after the word, that we are currently at.
							// Highlighting if it is a number or a symbol.

							if(numReg.test(code[char])){
								if(code === 0)
									highlighted += `<span class='number'>${code[char]}</span>`
								else{
									// Checking if the number is not a part of a variable name.

									if(char > 0 && !alphaReg.test(code[char - 1])) 
										highlighted += `<span class='number'>${code[char]}</span>`;
									else 
										highlighted += code[char].toString();
								}
							}
							else if(symReg.test(code[char])){
								highlighted += `<span class='symbol'>${code[char]}</span>`
							}
							else{
								highlighted += code[char].toString();
							}
						}
					}
				}
			}
			else{
				// If we are inside a string.

				if(code[char] === inStr.delim){
					inStr.bool = false;		// No longer in a string.

					highlighted += `<span class='string'>${inStr.newstr}</span><span class='quotes'>${inStr.delim}</span>`;

					inStr.newstr = ``;
				}
				else{
					inStr.newstr += code[char].toString();
				}
			}

		}	
		else{
			// If we are inside a comment.
			try{
				highlighted += code[char].toString();

				// Checking for a comment terminator.

				if(inComment.delim === '/'){
					if(code[char] === '\n'){
						// End of comment.

						highlighted += "</span>";
						inComment.bool = false;
					}
				}
				else if(inComment.delim === '*'){
					if(code[char] === '/' && code[char - 1] === '*'){
						inComment.bool = false;
						highlighted += "</span>";
					}
				}
			}
			catch(e){
				throw new Error(e);
			}
		}
	}

	return highlighted;
}

// Function for highlighting syntax of nodes on webpages.
// Takes a node identifier (.node, #node, tag) as an argument.
// Replaces the inner HTML of the nodes with the highlighted HTML.

function nodeHighlighter(node = ""){
	// Get the node.

	if(typeof node != "string"){
		throw new Error("Invalid Type of argument.");
	}

	let nodeList = document.querySelectorAll(node);

	for(let i = 0; i < nodeList.length; i++){
		try{
			let nodeCode = nodeList[i].innerText;	// The text inside the node.

			// Get the highlighted version of code inside the node and set the Inner HTML of the node to it.
			
			nodeList[i].innerHTML = "<pre class='minilightcode'>\n"+highlight(nodeCode)+"\n</pre>";
		}
		catch(e){
			throw new Error(e);
		}
	}

	return
}