function _append(list, element) {
    list[list.length] = element;
}

function _prioritySortFunction(a, b) {
    return b.priority - a.priority;
}

function _getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function _getElementsByXpath(path) {
    var queryResult = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null),
        result = [];
    
    if (queryResult) {
        var node = queryResult.iterateNext();
        while(node) {
            _append(result, node);
            node = queryResult.iterateNext();
        }
    }
    
    return result;
}