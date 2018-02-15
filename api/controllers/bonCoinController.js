const lbc = require('leboncoin-client');

exports.list_all = function(req, res) {
    var query = {
        query: req.query.search,
        region_or_department: 'ile_de_france',
        sellers: 'professionnels',
        sort: 'date',
        titles_only: false,
        urgent_only: false
    };


    lbc.search(query, 1, 5) // browse pages 1 to 5
        .then(function(items) {
            res.send(items);
        }, function(error) {
            res.send(error);
        });

};


exports.detail = function(req, res) {
    var id = parseInt(req.params.id);

    lbc.get(id)
        .then(function(item) {
            res.send(item);
        }, function(error) {
            res.send(error);
        });

};

exports.test = function(req, res) {

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
