module('Encode JSONML');

test('isAttribute()', function () {

    var jsonml = new $.jsonml();
    var isAttribute = jsonml.isAttribute;

    equal(isAttribute('type'), false, 'Type should not be an attribute');
    equal(isAttribute('items'), false, 'Items should not be an attribute');
    equal(isAttribute('content'), false, 'Content should not be an attribute');
    equal(isAttribute('id'), true, 'Id should be an attribute');
});

test('addAttribute()', function () {

    var jsonml = new $.jsonml();
    var addAttribute = jsonml.addAttribute.bind(jsonml);

    equal(addAttribute('data-name', 'myName'), ' data-name="myName"', 'Adds an attribute');
    equal(addAttribute('type', 'div'), '', 'Does not add a non-attribute');

});

test('addItem()', function () {

    var jsonml = new $.jsonml();
    var addItem = jsonml.addItem.bind(jsonml);

    var json = {
        type: 'p',
        content: 'Test',
        id: 'test'
    };

    equal(addItem(json), '<p id="test">Test</p>', 'Adds an item');

});

test('addItem() - Self-closing tag', function () {

    var jsonml = new $.jsonml();
    var addItem = jsonml.addItem.bind(jsonml);

    var json = {
        type: 'hr'
    };

    equal(addItem(json), '<hr />', 'The tag is Self-closing');

});

test('addItem() - Script tag', function () {

    var jsonml = new $.jsonml();
    var addItem = jsonml.addItem.bind(jsonml);

    var json = {
        type: 'script',
        src: 'index.js'
    };

    equal(addItem(json), '<script src="index.js"></script>', 'Script tags should not be Self-closing');

});

test('addItem() - Nested', function () {

    var jsonml = new $.jsonml();
    var addItem = jsonml.addItem.bind(jsonml);

    var json = {
        id: 'test',
        items: [{
            type: 'ul',
            items: [{
                type: 'li',
                content: 'foo'
            }, {
                type: 'li',
                content: 'bar'
            }]
        }]
    };

    equal(addItem(json), '<div id="test"><ul><li>foo</li><li>bar</li></ul></div>', 'Adds nested items');

});

test('addItems()', function () {

    var jsonml = new $.jsonml();
    var addItems = jsonml.addItems.bind(jsonml);

    var json = [{
        content: 'foo',
        id: 'test-foo'
    }, {
        content: 'bar'
    }];

    equal(addItems(json), '<div id="test-foo">foo</div><div>bar</div>', 'Adds nested items');

});

test('init() - add an array', function () {

    var jsonml = new $.jsonml();
    var init = jsonml.init.bind(jsonml);

    jsonml.addItems = function () {
        ok(true, 'Adds items');
    }

    init([]);

});

test('init() - add an item', function () {

    var jsonml = new $.jsonml();
    var init = jsonml.init.bind(jsonml);

    jsonml.addItem = function () {
        ok(true, 'Adds items');
    }

    init({});

});