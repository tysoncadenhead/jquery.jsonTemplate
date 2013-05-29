module('Encode jsonTemplate');

test('isAttribute()', function () {

    var jsonTemplate = new $.jsonTemplate();
    var isAttribute = jsonTemplate.isAttribute;

    equal(isAttribute('type'), false, 'Type should not be an attribute');
    equal(isAttribute('items'), false, 'Items should not be an attribute');
    equal(isAttribute('content'), false, 'Content should not be an attribute');
    equal(isAttribute('id'), true, 'Id should be an attribute');
});

test('addAttribute()', function () {

    var jsonTemplate = new $.jsonTemplate();
    var addAttribute = jsonTemplate.addAttribute.bind(jsonTemplate);

    equal(addAttribute('data-name', 'myName'), ' data-name="myName"', 'Adds an attribute');
    equal(addAttribute('type', 'div'), '', 'Does not add a non-attribute');

});

test('addItem()', function () {

    var jsonTemplate = new $.jsonTemplate();
    var addItem = jsonTemplate.addItem.bind(jsonTemplate);

    var json = {
        type: 'p',
        content: 'Test',
        id: 'test'
    };

    equal(addItem(json), '<p id="test">Test</p>', 'Adds an item');

});

test('addItem() - Self-closing tag', function () {

    var jsonTemplate = new $.jsonTemplate();
    var addItem = jsonTemplate.addItem.bind(jsonTemplate);

    var json = {
        type: 'hr'
    };

    equal(addItem(json), '<hr />', 'The tag is Self-closing');

});

test('addItem() - Script tag', function () {

    var jsonTemplate = new $.jsonTemplate();
    var addItem = jsonTemplate.addItem.bind(jsonTemplate);

    var json = {
        type: 'script',
        src: 'index.js'
    };

    equal(addItem(json), '<script src="index.js"></script>', 'Script tags should not be Self-closing');

});

test('addItem() - Nested', function () {

    var jsonTemplate = new $.jsonTemplate();
    var addItem = jsonTemplate.addItem.bind(jsonTemplate);

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

    var jsonTemplate = new $.jsonTemplate();
    var addItems = jsonTemplate.addItems.bind(jsonTemplate);

    var json = [{
        content: 'foo',
        id: 'test-foo'
    }, {
        content: 'bar'
    }];

    equal(addItems(json), '<div id="test-foo">foo</div><div>bar</div>', 'Adds nested items');

});

test('init() - add an array', function () {

    var jsonTemplate = new $.jsonTemplate();
    var init = jsonTemplate.init.bind(jsonTemplate);

    jsonTemplate.addItems = function () {
        ok(true, 'Adds items');
    }

    init([]);

});

test('init() - add an item', function () {

    var jsonTemplate = new $.jsonTemplate();
    var init = jsonTemplate.init.bind(jsonTemplate);

    jsonTemplate.addItem = function () {
        ok(true, 'Adds items');
    }

    init({});

});