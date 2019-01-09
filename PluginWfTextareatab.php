<?php
/**
<p>
Add tab functionality to textarea.
</p>
 */
class PluginWfTextareatab{
  /**
  <p>
  Including js in html/head section.
  </p>
  #code-yml#
  -
    type: widget
    data:
      plugin: 'wf/ajax'
      method: include
  #code#
  */
  public static function widget_include(){
    $element = wfDocument::createHtmlElement('script', null, array('src' => '/plugin/wf/textareatab/PluginWfTextareatab.js'));
    wfDocument::renderElement(array($element));
  }
  
  
}