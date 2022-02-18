# Buto-Plugin-WfTextareatab
Add tab functionality to textarea.
One could replace a tab with any character.

## Include
````
type: widget
data:
  plugin: 'wf/textareatab'
  method: include
````

## Usage
Call method like this. Second parameter replace a tab with two slashes.
````
PluginWfTextareatab.setTextareaTabEnabled(document.getElementById('my_textarea'), '  ');
````
