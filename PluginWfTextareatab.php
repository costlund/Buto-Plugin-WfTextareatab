<?php
class PluginWfTextareatab{
  public static function widget_include(){
    $element = wfDocument::createHtmlElement('script', null, array('src' => '/plugin/wf/textareatab/PluginWfTextareatab.js'));
    wfDocument::renderElement(array($element));
  }
}
