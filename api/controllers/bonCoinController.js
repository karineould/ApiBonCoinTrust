const leboncoin = require('leboncoin-api');

exports.list_all = function(req, res) {

    var query = req.query.search;
    // var category = req.query.category;
    var region = req.query.region;

    var search = new leboncoin.Search()
        .setPage(1)
        .setQuery(query)
        .setFilter(leboncoin.FILTERS.PROFESSIONNELS)
        // .setCategory("locations");
        .setRegion("ile_de_france");
        // .addSearchExtra("mrs", 250) // min rent
        // .addSearchExtra("mre", 1250); // min rent

    search.run().then(function (data) {
        res.json(data);
        // res.json(data.page);
        // console.log(data.page); // the current page
        // console.log(data.nbResult); // the number of results for this search
        // console.log(data.results); // the array of results
        // data.results[0].getDetails().then(function (details) {
        //     res.json(details);
        //     // console.log(details); // the item 0 with more data such as description, all images, author, ...
        // }, function (err) {
        //     console.error(err);
        // });
        //
        // data.results[0].getPhoneNumber().then(function (phoneNumer) {
        //     console.log(phoneNumer); // the phone number of the author if available
        // }, function (err) {
        //     console.error(err); // if the phone number is not available or not parsable (image -> string)
        // });
    }, function (err) {
        console.error(err);
    });
    // Task.find({}, function(err, task) {
    //     if (err)
    //         res.send(err);
    //     res.json(task);
    // });
};



//
exports.detail = function(req, res) {

};
//
//
// exports.read_a_task = function(req, res) {
//     Task.findById(req.params.taskId, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.update_a_task = function(req, res) {
//     Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.delete_a_task = function(req, res) {
//
//
//     Task.remove({
//         _id: req.params.taskId
//     }, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Task successfully deleted' });
//     });
// };
//
