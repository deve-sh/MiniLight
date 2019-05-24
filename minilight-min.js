function highlight(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if("string"!=typeof t)throw new Error("Invalid type for code.");for(var n="",o=/[A-Z]/i,s=/\d+/im,r=/[=\/+,*.:-]+/im,e=/^["'`]$/m,a=/^let$|^const$|^var$|for$|^while$|^if$|^else$|^in$|^throw$|^new$/,c=/^console$|^Error$|^try$|^catch$|^Math$|^Object$|^function$|^log$|^Error$/,i=/^default$|^delete$|^typeof$|^string$/,l={bool:!1,delim:"",newstr:""},d={inWord:!1,word:""},p={bool:!1,delim:""},w=0;w<t.length;w++)if(!1===p.bool){if("/"===t[w]&&("/"===t[w+1]||"*"===t[w+1])){p.bool=!0,p.delim=t[w+1],n+="<span class='comment'>"+t[w].toString();continue}!1===l.bool?e.test(t[w])?(l.bool=!0,l.delim=t[w],n+="<span class='quotes'>".concat(t[w],"</span>")):!1===d.inWord?o.test(t[w])?(d.inWord=!0,d.word+=t[w].toString()):s.test(t[w])?0===w?n+="<span class='number'>".concat(t[w],"</span>"):w>0&&!o.test(t[w-1])?n+="<span class='number'>".concat(t[w],"</span>"):n+=t[w].toString():r.test(t[w])?n+="<span class='symbol'>".concat(t[w],"</span>"):n+=t[w].toString():o.test(t[w])||s.test(t[w])||/_/.test(n[w])?d.word+=t[w].toString():(d.inWord=!1,a.test(d.word)?n+="<span class='keyword'>".concat(d.word,"</span>"):c.test(d.word)?n+="<span class='othkeywords'>".concat(d.word,"</span>"):i.test(d.word)?n+="<span class='operator'>".concat(d.word,"</span>"):n+="".concat(d.word),d.word="",s.test(t[w])?0===t?n+="<span class='number'>".concat(t[w],"</span>"):w>0&&!o.test(t[w-1])?n+="<span class='number'>".concat(t[w],"</span>"):n+=t[w].toString():r.test(t[w])?n+="<span class='symbol'>".concat(t[w],"</span>"):n+=t[w].toString()):t[w]===l.delim?(l.bool=!1,n+="<span class='string'>".concat(l.newstr,"</span><span class='quotes'>").concat(l.delim,"</span>"),l.newstr=""):l.newstr+=t[w].toString()}else try{n+=t[w].toString(),"/"===p.delim?"\n"===t[w]&&(n+="</span>",p.bool=!1):"*"===p.delim&&"/"===t[w]&&"*"===t[w-1]&&(p.bool=!1,n+="</span>")}catch(t){throw new Error(t)}return n}function nodeHighlighter(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if("string"!=typeof t)throw new Error("Invalid Type of argument.");for(var n=document.querySelectorAll(t),o=0;o<n.length;o++)try{var s=n[o].innerText;n[o].innerHTML="<pre class='minilightcode'>\n"+highlight(s)+"\n</pre>"}catch(t){throw new Error(t)}}