const express = require('express');
const router = express.Router();
const category = require('../models/Categories');
const post = require('../models/Posts');

router.get('/:slug', (req, res, next) => {
  category.aggregate(
    [
      {
        $match: { slug: req.params.slug }
      }
    ],
    (err, categorys) => {
      if (err) throw err;
      if (categorys.length) {
        categorys = categorys[0];
        post.aggregate(
          [
            { $match: { category: categorys._id } },
            {
              $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
              }
            },
            {
              $limit: site_settings.indexPostLimit
            }
          ],
          (err, posts) => {
            if (err) throw err;
            res.render('category', { posts, category: categorys });
          }
        );
      } else {
        res.sendStatus(404);
      }
    }
  );
});

module.exports = router;
