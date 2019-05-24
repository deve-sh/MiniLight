/*
	Main function to highlight syntax.

	Flexible.
*/

function highlight(code){
	code = code || ``;

	let highlighted = ``,
		alphaReg = /[A-Z]/i 					// Alphabets Regex
		numReg = /\d+/mi,						// Numbers Regex
		symReg = /[=\/+,*-]+/mi,					// Symbols Regex
		strReg = /^["'`]$/m,							// Strings Regex
		decReg = /^let|const|var|for|while|if|else|in$/,		// Declarations Regex
		others = /^console|Error|try|catch|Math|Object|function|log$/,	// The final highlight
		opeReg = /^default|delete|typeof$/,
		final = ``;

	// First step.
	// Finding out the strings inside the Code.

	// Strings are defined using " ", ' ' and ` `.
	// So if we are inside a string, we don't need syntax highlighting.
	// However, if we are outside a string. Things need to be highlighted.

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
							highlighted += `<span class='declerator'>${current.word}</span>`;
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

	return highlighted;
}