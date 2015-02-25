(function() {

    function walk(node)
    {
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
	    case 1:  // Element
	    case 9:  // Document
	    case 11: // Document fragment
	    child = node.firstChild;
	    while ( child )
	    {
		next = child.nextSibling;
		walk(child);
		child = next;
	    }
	    break;

	    case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
	    break;
	}
    }

    function handleText(textNode) {
	var v = textNode.nodeValue;

	// Unmanned first
	// Take care of 'an' versus 'a'
	v = v.replace(/\b(A|a)n (U|u)nmanned/g, function(match, p1, offset, string) {
	    // f + 2 = h
	    a = String.fromCharCode(p1.charCodeAt(0) + 0);
	    r = String.fromCharCode(p2.charCodeAt(0) - 3);
	    return a + " " + r + "obotic";
	});

	v = v.replace(/\b(U|u)nmanned/g, function(match, p1, offset, string) {
	    // f + 2 = h
	    r = String.fromCharCode(p1.charCodeAt(0) - 3);
	    return r + "obotic";
	});

	v = v.replace(/\b(M|m)anned/g, function(match, p1, offset, string) {
	    // m - 10 = c
	    c = String.fromCharCode(p1.charCodeAt(0) - 10);
	    return c + "rewed";
	});

	textNode.nodeValue = v;
    }

    function windowLoadHandler()
    {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());
