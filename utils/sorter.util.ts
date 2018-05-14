function sortProperties(sortable, sortedBy, isNumericSort, reverse) {
    sortedBy = sortedBy || 1; 
    isNumericSort = isNumericSort || false; 
    reverse = reverse || false;

    var reversed = (reverse) ? -1 : 1;

    if (isNumericSort)
        sortable.sort(function (a, b) {
            return reversed * (a[sortedBy] - b[sortedBy]);
        });
    else
        sortable.sort(function (a, b) {
            var x = a[sortedBy].toLowerCase(),
                y = b[sortedBy].toLowerCase();
            return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
    return sortable;
}

export { sortProperties }