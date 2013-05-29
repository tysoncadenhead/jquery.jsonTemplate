module('Encode HTML');

test('hasTextNodes() - true', function () {

    var jhtml = new $.encodeJsonTemplate();
    var hasTextNodes = jhtml.hasTextNodes.bind(jhtml);

    var $el = $('<div>Text node <strong>Bold</strong></div>');

    equal(hasTextNodes($el), true, 'Element has text nodes');

});

test('hasTextNodes() - false', function () {

    var jhtml = new $.encodeJsonTemplate();
    var hasTextNodes = jhtml.hasTextNodes.bind(jhtml);

    var $el = $('<div><strong>Bold</strong><em>Italic</em></div>');

    equal(hasTextNodes($el), false, 'Element has no text nodes');

});

test('getItem()', function () {

    var jhtml = new $.encodeJsonTemplate();
    var getItem = jhtml.getItem.bind(jhtml);

    var $el = $('<div id="my-id" class="my-class"><ul><li>Item</li><li>Item</li></ul></div>');

    deepEqual(getItem($el), {
        'id': 'my-id',
        'class': 'my-class',
        'items': [{
            type: 'ul',
            items: [{
                type: 'li',
                content: 'Item'
            }, {
                type: 'li',
                content: 'Item'
            }]
        }]
    }, 'Render a nested element');

});

test('getItem() - Multiple elements', function () {

    var jhtml = new $.encodeJsonTemplate();
    var getItem = jhtml.getItem.bind(jhtml);

    var $el = $('<div>1</div><div>2</div><div>3</div>');

    deepEqual(getItem($el), {
        content: '1'
    }, 'Render only the first element');

});

test('init() - empty element', function () {

    var jhtml = new $.encodeJsonTemplate();
    var init = jhtml.init.bind(jhtml);

    var $el = $();

    deepEqual(init($el), {}, 'Object is empty');

});

test('init() - existing element', function () {

    var jhtml = new $.encodeJsonTemplate();
    var init = jhtml.init.bind(jhtml);

    var $el = $('<div>Hi</div>');

    deepEqual(init($el), {
        content: 'Hi'
    }, 'Object is not empty');

});