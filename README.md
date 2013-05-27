jquery.jsonTemplate
=============

JSON Markup Language Templates for jQuery.

While this plugin was written just for fun, the aim is have an easy way to share markup between the client-side and server-side in complete JSON.

## Getting started:

```
$('#my-element').jsonTemplate(
    [{
       type: 'h1',
       content: 'Hello World'
    }]
);
```

## Writing templates for jsonTemplate

This HTML Markup:

```
<iframe width="420" height="315" src="http://www.youtube.com/embed/QAIoLozr72w" frameborder="0" allowfullscreen></iframe>
```

Becomes this:

```
$('#my-element').jsonTemplate(
    [{
       type: 'iframe',
       height: 315,
       width: 420,
       src: 'http://www.youtube.com/embed/QAIoLozr72w',
       frameborder: 0,
       allowfullscreen: true
    }]
);
```

You can even nest elements like this:

```
$('#my-element').jsonTemplate(
    [{
       type: 'div',
       items: [{
            type: 'p',
            items: [{
                type: 'strong',
                content: 'Hi there!'
            }]
       }]
    }]
);
```

## Converting HTML to jsonTemplate

To convert HTML to jsonTemplate markup, just call jsonTemplate with no parameters on the element you want the template for.

```
<h1>Hello World</h1>
<script type="javascript">
  var template = $('h1').jsonTemplate();
  console.log(template); // { type: 'h1', content: 'Hello World' }
</script>
```
