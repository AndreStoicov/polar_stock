var express = require('express'),
    logger = require(appRoot + '/app/utils/logger'),
    Brands = require(appRoot + '/app/models/brands').Brands,
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var brandRouter = express.Router();

//Any requests to this controller must pass through this 'use' function
brandRouter.use(bodyParser.urlencoded({ extended: true }));
brandRouter.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

brandRouter.param('id', function(req, res, next, id) {
    Brands.findByIdAsync(id)
        .then(function(brand) {
            if (!brand) {
                logger.log('error', 'brand-id: ' + id + ' was not found');
                return next('route');
            }

            logger.log('debug', 'brand-id exist in database: ' + brand);
            req.paramBrand = brand;
            next();

        }).catch(next);
});

brandRouter.get('/', function(req, res, next) {
    Brands.findAsync()
        .then(function(foundBrands) {
            logger.log('debug', JSON.stringify(foundBrands));
            res.send(foundBrands);
        }).catch(next)
});

brandRouter.post('/', function(req, res, next) {
    Brands.createAsync(req.body).then(function(brand) {
        logger.log('debug', 'POST creating new brands: ' + JSON.stringify(brand));
        res.status(201).send(brand);
    }).catch(function(err) {
        logger.log('error', err.errmsg);
        throw err;
    }).catch(next)
});

brandRouter.get('/:id', function(req, res) {
    res.send(req.paramBrand)
})

brandRouter.put('/:id', function(req, res, next) {
    req.paramBrand.set(req.body);
    req.paramBrand.saveAsync()
        .then(function(updatedBrand) {
            logger.log('debug', 'PUT the brand was updated: ' + JSON.stringify(updatedBrand));
            res.send(updatedBrand);
        }).catch(function(err) {
            logger.log('error', err.errmsg);
            throw err
        }).catch(next)
})

brandRouter.delete('/:id', function(req, res, next) {
    var brandId = String(req.params.id)

    Brands.findByIdAndRemoveAsync(brandId)
        .then(function(deletedBrand) {
            logger.log('debug', 'DELETE the brand was deleted: ' + JSON.stringify(deletedBrand));
            res.send(deletedBrand)
        }).catch(next)
})

module.exports = exports = brandRouter
