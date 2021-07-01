var compare = function (arr, l, r) {
    var index = 0;
    var ls = 0;
    var rs = 0;
    while (ls < l.length && rs < r.length) {
        if (l[ls] < r[rs]) {
            arr[index] = l[ls];
            index++;
            ls++;
        }
        else {
            arr[index] = r[rs];
            index++;
            rs++;
        }
    }
    while (ls < l.length) {
        arr[index] = l[ls];
        ls++;
        index++;
    }
    while (rs < r.length) {
        arr[index] = r[rs];
        rs++;
        index++;
    }
    return arr;
};
var mergesort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var middle = Math.floor(arr.length / 2);
    var l = arr.slice(0, middle);
    var r = arr.slice(middle);
    mergesort(l);
    mergesort(r);
    return compare(arr, l, r);
};
var sample = [10, 8, 43, 5, 6, 1];
var res = mergesort(sample);
console.log(res);
