/*global jQuery */

(function ($) {

    'use strict';

    /**
    * @class jQuery.jsonTemplate
    */
    $.jsonTemplate = function (obj) {

        /**
        * Tests to see whether something is an attribute or a special type used by JsonTemplate
        *
        * @method isAttribute
        * @param {String} name
        */
        this.isAttribute = function (name) {
            var isAttribute;
            switch (name) {
                case 'type':
                case 'content':
                case 'items':
                    isAttribute = false;
                    break;
                default:
                    isAttribute =  true;
                    break;
            }
            return isAttribute;
        };

        /**
        * Adds an attribute to the html string
        *
        * @method addAttribute
        * @param {Object}
        */
        this.addAttribute = function (name, val) {
            var html = '', value = '';

            if (this.isAttribute(name)) {
                if (typeof val === 'object') {
                    $.each(val, function (name, attrValue) {
                        value += name + ':' + attrValue + '; ';
                    });
                } else {
                    value = val;
                }
                html += ' ' + name + '="' + value + '"';
            }

            return html;

        };

        /**
        * Adds an item to the HTML string
        *
        * @method addItem
        * @param {Object} obj The json markup object
        */
        this.addItem = function (obj) {
            var html;

            obj.type = obj.type || 'div';

            // JavaScript Tags
            if (obj.type === 'text/javascript') {
                obj.type = 'script';
            }

            // Start the tag
            html = '<' + obj.type;

            // Add all of the attributes
            $.each(obj, function (name, val) {
                html += this.addAttribute(name, val);
            }.bind(this));

            // Non-self-closing tags
            if (obj.items || obj.content || obj.type === 'script') {

                // Close the start tag
                html += '>';

                // Add content
                if (obj.items) {
                    html += this.addItems(obj.items);
                } else if (obj.content) {
                    html += obj.content;
                }

                // Closing tag
                html += '</' + obj.type + '>';

            // Self closing tags
            } else {
                html += ' />';
            }

            return html;

        };

        /**
        * Adds an array of items to the markup string
        *
        * @method addItems
        * @param {Array} obj
        */
        this.addItems = function (obj) {
            var html = '';
            $.each(obj, function (index, val) {
                html += this.addItem(val);
            }.bind(this));
            return html;
        };

        /**
        * Initializes the plugin
        *
        * @method init
        * @param {Object/Array} 
        */
        this.init = function (obj) {
            if ($.isArray(obj)) {
                return this.addItems(obj);
            } else {
                return this.addItem(obj);
            }
        };

    };

    /**
    * @class jQuery.encodeJsonTemplate
    */
    $.encodeJsonTemplate = function ($el) {

        /**
        * If the element passed in has any direct textNodes under it, return true, otherwise, return false
        *
        * @method hasTextNodes
        * @param {Object} $el
        */
        this.hasTextNodes = function ($el) {

            var hasTextNodes = false;

            // Filter through all of the contents of the element
            $el.contents().filter(function () {

                // This statement is sort of complex... break it down
                if (

                    // The parent element should be the same as the element passed into this function
                    $(this).parent().is($el) &&

                    // The nodeType should be "3", which mean that it is a text nod
                    this.nodeType === 3 && 

                    // There should be some content in the text node other than whitespace
                    $(this).text().replace(/ /g, '').length > 1

                ) {
                    hasTextNodes = true;
                }
            });

            return hasTextNodes;

        };

        /**
        * Gets the element JSON
        *
        * @method getItem
        * @param {Object} $el
        */
        this.getItem = function ($el) {
            var self = this,
                obj = {
                    'type': String($el.prop('tagName')).toLowerCase()
                };

            // We default to div, so no need to keep it in the object
            if (obj.type === 'div') {
                delete obj.type;
            }

            // Add the attributes
            $($el[0].attributes).each(function () {
                if (this.nodeName !== 'type') {
                    obj[this.nodeName] = this.nodeValue;
                }
            });

            // If there are children elements, get them
            if ($el.children().length && !this.hasTextNodes($el)) {
                obj.items = [];
                $el.children().each(function () {
                    obj.items.push(self.getItem($(this)));
                });

            // If there is content, get that
            } else {
                obj.content = $el.html();
            }

            return obj;
        };

        /**
        * Starts the whole thing
        *
        * @method init
        * @param {Object} $el
        */
        this.init = function ($el) {
            if ($el.length) {
                return this.getItem($el);
            } else {
                return {};
            }
        };

    };

    $.fn.jsonTemplate = function (obj) {
        if (obj) {
            $(this).append(new $.jsonTemplate().init(obj));
        } else {
            return new $.encodeJsonTemplate().init($(this));
        }
    };

}(jQuery));