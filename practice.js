function findRemnant(a, b, callback) {
    if (b === 0) {
        callback("ERROR - devision by 0", null);
    } else {
        callback(null, a % b)
    }
}

findRemnant(10, 3, (err, data) => {
    if(err) {
        console.log("ERROR: ", err);
    } else {
        console.log("Result: ", data);
    }
})