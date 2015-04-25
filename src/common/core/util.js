function _append(list, element) {
    list[list.length] = element;
}

function _priority_sort_function(a, b) {
    return b.priority - a.priority;
}