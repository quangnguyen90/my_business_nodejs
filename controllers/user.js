const AccountModel = require('../models/account.js');

// Each item per page
const PAGE_SIZE = 2;

module.exports.getUsers = (req, res, next) => {
    var page = req.query.page;
    if (page) {
        // get page
        page = parseInt(page);
        if (page < 1) {
            page = 1;
        }

        var skipItems = (page - 1) * PAGE_SIZE;
        AccountModel.find({})
        .skip(skipItems)
        .limit(PAGE_SIZE)
        .then(data => {
            AccountModel.countDocuments({}).then((total) => {
                var totalPage = Math.ceil(total / PAGE_SIZE);

                res.json({
                    total: total,
                    totalPage : totalPage,
                    data: data
                });
            })
        })
        .catch(err => {
            res.status(500).json('Server error');
        })

    } else {
        AccountModel.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json('Server error');
        })
    }
}