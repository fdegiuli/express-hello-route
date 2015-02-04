var _ = require('lodash');
var path = require('path');
var cons = require('consolidate'); 
var assert = require('assert');


/**
 *  Render the view, and call the callback with the resulting html.
 *  Attempts to infer the engine from the extension.
 */
function render(name, options, config, callback) {
    var opts = _.extend({}, options, config.options);

    var extension = path.extname(name);
    // Remove the period from the extension
    var engine = config.engine || extension.slice(1);

    if (! engine ) {
        return callback( new Error('No engine or extension specified.'));
    }

    name = name + (extension ? '' : '.' + engine );
    var viewPath = path.join(config.viewDir, name);
    console.log(viewPath);
    
    try{
        cons[engine](viewPath, opts, callback); 
    } catch( err ) {
        return callback( err );   
    }
}

/**
 * Returns a middleware function to decorate res with our own rendering function.
 */
module.exports = function createRenderer (viewDir, engine, options) {
    assert.ok(viewDir, 'No view directory specified');
    if ( !engine ) { console.warn('No rendering engine specified. '); }

    var config = {};
    config.viewDir = viewDir;
    config.engine = engine;
    config.options = options;

    return function (req, res, next) {
        res.render = function(name, options) {
            console.log(name);
            render(name, options, config, function( err, out ) {
                if (err) { return res.end(err); }
                res.end(out);
            });
        };
        next();
    };
};