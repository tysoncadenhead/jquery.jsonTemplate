/*global jQuery */

(function ($) {

    'use strict';

    /**
    * @class jsonml
    */
    $.jsonml = function (obj) {

        /**
        * Tests to see whether something is an attribute or a special type used by JsonML
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

            // Start the tag
            html = '<' + obj.type;

            // Add all of the attributes
            $.each(obj, function (name, val) {
                html += this.addAttribute(name, val);
            }.bind(this));

            // Non-self-closing tags
            if (obj.items || obj.content) {

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
                html += '/>';
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
        
        return this.init(obj);

    };

    $.fn.jsonml = function (obj) {
        $(this).append($.jsonml(obj));
    };

}(jQuery));