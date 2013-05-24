jquery.jsonml
=============

JSON Markup Language Templates for jQuery.

While this plugin was written just for fun, the aim is have an easy way to share markup between the client-side and server-side in complete JSON.

## Getting started:

```
$('#my-element').jsonml(
    [{
       type: 'h1',
       content: 'Hello World'
    }]
);
```

## Writing templates in JSONML

This HTML Markup:

```
<iframe width="420" height="315" src="http://www.youtube.com/embed/QAIoLozr72w" frameborder="0" allowfullscreen></iframe>
```

Becomes this:

```
$('#my-element').jsonml(
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
$('#my-element').jsonml(
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

## Converting HTML to JsonML

To convert HTML to JsonML, just call jsonml with no parameters on the element you want the template for.

```
<h1>Hello World</h1>
<script type="javascript">
  var template = $('h1').jsonml();
  console.log(template); // { type: 'h1', content: 'Hello World' }
</script>
```

## TODO

- Unit Tests to make sure this works