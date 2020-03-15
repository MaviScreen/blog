const express = require('express');
const router = express.Router();
const post = require('../models/Posts');

router.get('/', (req, res, next) => {
  post.aggregate(
    [
      { $match: { type: 'post', status: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $sort: {
          created: -1
        }
      },
      {
        $limit: site_settings.indexPostLimit
      }
    ],
    (err, posts) => {
      if (err) throw err;
      if (posts.length) {
        res.render('index', {
          posts
        });
      } else {
        res.render('index');
      }
    }
  );
});

router.get('/:slug', (req, res, next) => {
  post.aggregate(
    [
      {
        $match: { slug: req.params.slug, status: true }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      }
    ],
    (err, response) => {
      if (err) throw err;
      if (response.length) {
        response = response[0];
        post.aggregate(
          [
            { $match: { status: true } },
            { $sample: { size: site_settings.postPostLimit } },
            {
              $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
              }
            },
            {
              $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
              }
            }
          ],
          (err, randomPosts) => {
            if (err) throw err;
            res.render(response.type, {
              title: response.title,
              post: response,
              randomPosts
            });
          }
        );
      } else {
        res.sendStatus(404);
      }
    }
  );
});

module.exports = router;
