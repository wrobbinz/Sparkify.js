# Sparkify

-   jQuery plugin to easily implement web widgets that connect and
    control your spark core

-   SVG based

-   downward compatible ; overloads an input element.

## Example

    <div id="fader"></div>

    <script>
    $('#fader').sparkify();
    </script>

## Options

Sparkify accepts an object literal for customization.

    $('#fader').sparkify({
        widget   : 'fader',
        numbered : true,
        percent  : false,
        width    : 400,
        height   : 60,
        fillColor : '#00FF99',
        func     : 'colorSwipe',
        complete : null
    });

Current options are listed below:

-   Widget(string): Determines type of widget to be drawn (currently
    fader or buttons)

-   Numbered(boolean): Whether to output number value to an \<input\>
    element

-   Percent(boolean): Whether that number should be a percentage or the
    actual number

-   Width(integer): Width in pixels of widget

-   Height(integer): Hieght in pixels of widget

-   FillColor(string): Custom color (fader bar/button color)

-   Func(string): Name of func for spark to call

-   Complete(function): Callback function to execute

## Support

Currently reliant on SVG.js and latest jQuery library. Planning to remove SVG.js reliance
