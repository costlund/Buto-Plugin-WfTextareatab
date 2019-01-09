/**
<p>
Class to handle tab in textarea.
</p>
 */
function plugin_wf_textareatab(){

  /**
   * Get curren line.
   * @param {type} edit
   * @returns {String|Boolean}
   */
  this.getLine = function(edit){
    var start = 0;
    var lineNumber = 0;
    var content = "";
    if(typeof edit.selectionStart == 'undefined') {return false}
    start = edit.selectionStart;
    lineNumber = edit.value.substr(0,start).split("\n").length - 1;
    content = edit.value.split("\n")[lineNumber];
    return content;
    //return {"lineNumber": lineNumber, "content": content}
  }    

  /**
   * Get key code.
   */
  this.getKeyCode = function(e){
    var key_code = null;
    if(e.keyCode){key_code = e.keyCode;}
    else if(e.which){key_code = e.which;}
    return key_code;
  }

  /**
   * Set events onkeydown and onkeyupp to handle tab inputs in textarea.
   * @param object textarea
   * @param string replace_tab_to If replace tab to other string (optional).
   * @returns nothing
   */
  this.setTextareaTabEnabled = function(textarea, replace_tab_to){

    textarea.onkeydown = function(e){

      var x = new plugin_wf_textareatab();
      var key_code = x.getKeyCode(e);
      //console.log(key_code);
      if(key_code==9 || key_code==13){
        e.preventDefault();
        var replace_to = "\t";
        if(replace_tab_to){
          replace_to = replace_tab_to;
        }
        if(key_code==9){
          //var selection_start = this.selectionStart;
          var selection = this.value.substring(this.selectionStart, this.selectionEnd);

          var temp = selection.split("\n");
          var str = '';
          for(i=0;i<temp.length;i++){
            if(temp[i].length>0){
              if(this.getAttribute('shift') && this.getAttribute('shift')==='1'){ 
                //User has pressed shift before and we trying to remove.
                if(temp[i].substring(0, replace_to.length)==replace_to){
                  str += temp[i].substring(replace_to.length)+"\n";
                }else{
                  str += temp[i]+"\n";
                }
              }else{
                //We add .
                str += replace_to+temp[i]+"\n";
              }
            }
          }
          var set_selection_range = true;
          if(str.length==0){
            // Nothing is selected.
            str = replace_to;
            set_selection_range = false;
          }

          var selection_start = this.selectionStart;

          this.value = this.value.substring(0,this.selectionStart) + str + this.value.substring(this.selectionEnd);
          if(set_selection_range){
            this.setSelectionRange((selection_start), (selection_start+str.length));
          }else{
            this.selectionEnd = selection_start+replace_to.length; 
          }
        }else if(key_code==13){

          var line = x.getLine(textarea);


          var pre_str = '';
          for(i=0;i<line.length;i++){
            if(line.substr(i, 1)==' '){
              pre_str += ' ';
            }else if(line.substr(i, 1)=="\t"){
              pre_str += "\t";
            }else{
              break;
            }  
          }


          if(line.substr(line.length-1, 1)==':' || line.substr(line.length-1, 1)=='-'){
            pre_str += replace_to;
          }

          var selection_start = this.selectionStart;
          this.value = this.value.substring(0,this.selectionStart) + "\n"+pre_str + this.value.substring(this.selectionEnd);
          this.selectionEnd = selection_start+pre_str.length+1; 
          return false;
        }
      }else{
        if(key_code==16){
          this.setAttribute('shift', '1');
        }else{
          this.setAttribute('shift', '0');
        }
      }
    }
    textarea.onkeyup = function(e){
      var x = new plugin_wf_textareatab();
      var key_code = x.getKeyCode(e);
      if(key_code==16){
        this.setAttribute('shift', '0');
      }
    }

  }
  this.reziseNoScroll = function(id){ 
    var my_textarea = document.getElementById(id);
    for(var i=0; i<700; i++){
      if(my_textarea.scrollHeight === my_textarea.clientHeight){ 
        //Element has no scroll anymore. 
        return null; 
      } 
      my_textarea.style.height = i+'px'; 
    } 
    return null; 
  }
}
var PluginWfTextareatab = new plugin_wf_textareatab();
    
    //PluginWfTextareatab.setTextareaTabEnabled(document.getElementById('test_textarea_01'));

