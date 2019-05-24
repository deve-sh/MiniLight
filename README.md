# <div align='center'>MiniLight - Mini Syntax Highlighter</div>

A lightweight and simple Syntax Highlighter for Webpages. I built it because I was finding it complicated to integrate other syntax highlighters with webpages, pretty much because they weren't built for small code samples.

This is a small (2KB) utility you can use to highlight code for small nodes in a webpage.

### Installation

The utility comes with the following files : 

- **minilight.js** : JS File containing detailed descriptions of everything. Writted in ES6.
- **minilight-min.js** : Minified JS File transpiled to ES5. <u>Recommended for usage.</u>
- **minilight-sty.css** : Styles / Colour Schemes associated with the syntax highlighter components. The default colour scheme is Sublime Text's Monokai colour scheme.
- **minilight-sty-min.css** : Minified styles file.

To install, just clone the repo from your terminal or download the repo as a zip file.

```bash
git clone https://github.com/deve-sh/MiniLight.git
cd MiniLight
```

Then extract / move the desired files from the repo to your project's directory.

### Usage

To use the files in a webpage. Load the CSS from **minilight-sty-min.css** in the ```<head>``` tag of your file :

```html
<link rel='stylesheet' type="text/css" href = './minilight-sty-min.css' />
```

Then load the scripts of MiniLight to the page from **minilight-min.js** :

```html
<script type='text/javascript' src='./minilight-min.js'></script>
```

Create an element in your webpage like :

```html
<pre id='codeNode'>
	// Add your code here.
</pre>
```

Then add another script tag at the bottom of the body and call the **nodeHighighter** function on the node. The nodeHighlighter function takes the node identifier (.node, #node, nodeTag) as its argument. 

```html
<script type='text/javascript'>
	nodeHighlighter("#codeNode");
</script>
```
You could change the styles yourself by changing the CSS files. Go create a theme for yourself! 😁👍

### Using it for another language

The syntax highlighting in this works primarily for JavaScript upto the most common keywords (The list isn't complete, it will however be expanded upon in the future). But given every programming language has a set of keywords and a common comment syntax, you can use the Syntax Highlighting with them also.

Just change the keyword Regex which has been written in a very basic conduct and can be read and modified by basically anyone. Just add your keywords and operators and the syntax highlighter shall work with them too.

Comments can be modified to include a hash (#) too. Just a little tough but I may release a python-specific one soon too. Given how different the syntax of Python is.

### Contribution

Contributions are welcome to the Repo. Just make any change you may deem necessary for improvement and start a pull request.

### Issues and Contact

For any issues regarding the project, just open an issue in the repo.

[Contact me](mailto:devesh2027@gmail.com)