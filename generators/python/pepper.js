/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating Python for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.pepper');

goog.require('Blockly.Python');


// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords('qi,naoqi,ALProxy');

// Change to IP of Pepper
var pepperIP = 'pepper.local';

Blockly.Python['pepper_does'] = function(block) {
    // Frame Block that creates the template around the generated code
    
    // janky method to indent the code into onStart
    var c_code = Blockly.Python.statementToCode(block, 'CODE');
    var c_code_indented = '  ' + c_code.replaceAll("\n", "\n  ");
    
    // __version__, __copyright__, __author__, __email__ TODO Wahrscheinlich nicht benötigt
    // TODO self.qiapp.stop statt eigener stp methode?
    
    // Add the imports from jumpstarter
    Blockly.Python.definitions_['stkrunner'] = 'import stk.runner';
    Blockly.Python.definitions_['stkevents'] = 'import stk.events';
    Blockly.Python.definitions_['stkservices'] = 'import stk.services';
    Blockly.Python.definitions_['stklogging'] = 'import stk.logging';
    
    // Prefix
    var c_class = 'class Activity(object):\n' + '  APP_ID = "com.aldeberan.BlocklyPepper"\n';
    var c_init = '  def __init__(self, qiapp):\n' + '    self.qiapp = qiapp\n' + '    self.events = stk.events.EventHelper(qiapp.session)\n' + '    self.s = stk.services.ServiceCache(qiapp.session)\n' + '    self.logger = stk.logging.get_logger(qiapp.session, self.APP_ID)\n' + '  \n';
    var c_onstart =  '  def on_start(self):\n' + c_code_indented + '  self.qiapp.stop()\n' + '  \n';
    var c_onstop =  '  def on_stop(self):\n' + '    self.logger.info("Application Finished.")\n' + '    self.events.clear()\n' + '  \n';
    var c_main = 'if __name__ == "__main__":\n' + '  stk.runner.run_activity(Activity)\n';
    
    var code = c_class + c_init + c_onstart + c_onstop + c_main;
    
    return code;
}

Blockly.Python['pepper_walk'] = function(block) {
  // Pepper walks.

  // Get the variables and code from the block
  var direction = block.getFieldValue('DIRECTION');
  var distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC) || '0';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  
  var c_distance = 'distance = ' + distance + ' \n';  // resolve distance
  var c_speed_prc = 'speedprc = ' + speed + ' \n';  // resolve speed in %
  var c_speed_def = 'speed = 0.35 \n';  // set default speed
  var c_speed_if = 'if speedprc >= 0 and speedprc <= 100: \n'; // if % is between 0 and 100
  var c_speed = '  speed = 0.0045 * speedprc + 0.1 \n';   // compute speed from y= mx+b between 0.1 and 0.55
  var c_time = 'time = 2 + (speed / distance) \n';  // compute alotted time from t = v/s + buffer of 2s for acceleration
  
  var c_move;
  if(direction == 'FORWARD') {       // moveTo uses relative Position (should be FRAME_ROBOT)
    c_move = 'self.s.ALMotion.moveTo(distance, 0, 0, time) \n';
  } else if(direction == 'BACKWARD') {
    c_move = 'self.s.ALMotion.moveTo(-distance, 0, 0, time) \n';
  } else if(direction == 'LEFT') {
    c_move = 'self.s.ALMotion.moveTo(0, distance, 0, time) \n';
  } else if(direction == 'RIGHT') {
    c_move = 'self.s.ALMotion.moveTo(0, -distance, 0, time) \n';
  }
  
  // assemble the code
  var code = c_distance + c_speed_prc + c_speed_def + c_speed_if + c_speed + c_time + c_move;
  
  // return the code
  return code;
};

Blockly.Python['pepper_say'] = function(block) { 
  // Pepper says text (with or without animation)
  
  // get the variables and code from the block
  var animation = block.getFieldValue('ANIMATION');
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || 'Hallo Welt.';
  
  var c_text = 'text = ' + text + ' \n';
  var c_set_lang = 'self.s.ALTextToSpeech.setLaunguage("German") \n';
  
  var c_config;
  if(animation) {
    c_config = '{"bodyLanguageMode": "contextual"}';
  } else {
    c_config = '{"bodyLanguageMode": "disabled"}';
  }
  
  var c_say = 'self.s.ALAnimatedSpeech.say(text, ' + c_config +') \n';
  
  var code = c_text + c_set_lang + c_say;
  
  return code;
}
