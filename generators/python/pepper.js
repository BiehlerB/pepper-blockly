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

// Fill with right IP
var pepperIP = 'pepper.local';

Blockly.Python['pepper_walk'] = function(block) {
  // Pepper walks.

  // Get the variables and code from the block
  var direction = block.getFieldValue('DIRECTION');
  var distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC) || '0';
  var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '50';
  
  // Add the import for alproxy if not already
  Blockly.Python.definitions_['from_naoqi_import_alproxy'] = 'from naoqi import ALProxy';
  
  var c_proxy = 'almotion = ALProxy("ALMotion", "' + pepperIP + '", 9559) \n';  // create Move Proxy
  var c_distance = 'distance = ' + distance + ' \n';  // resolve distance
  var c_speed_prc = 'speedprc = ' + speed + ' \n';  // resolve speed in %
  var c_speed_def = 'speed = 0.35 \n';  // set default speed
  var c_speed_if = 'if speedprc >= 0 and speedprc <= 100: \n'; // if % is between 0 and 100
  var c_speed = '  speed = 0.0045 * speedprc + 0.1 \n';   // compute speed from y= mx+b between 0.1 and 0.55
  var c_time = 'time = 2 + (speed / distance) \n';  // compute alooted time from t = v/s + buffer of 2s for acceleration
  
  var c_move;
  if(direction == 'FORWARD') {       // moveTo uses relative Position (should be FRAME_ROBOT)
    c_move = 'almotion.moveTo(distance, 0, 0, time) \n';
  } else if(direction == 'BACKWARD') {
    c_move = 'almotion.moveTo(-distance, 0, 0, time) \n';
  } else if(direction == 'LEFT') {
    c_move = 'almotion.moveTo(0, distance, 0, time) \n';
  } else if(direction == 'RIGHT') {
    c_move = 'almotion.moveTo(0, -distance, 0, time) \n';
  }
  
  // assemble the code
  var code = c_proxy + c_distance + c_speed_prc + c_speed_def + c_speed_if + c_speed + c_time + c_move;
  
  // return the code
  return code;
};

Blockly.Python['pepper_say'] = function(block) { 
  // Pepper says text (with or without animation)
  
  // get the variables and code from the block
  var animation = block.getFieldValue('ANIMATION');
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || 'Hallo Welt';
  
  // Add the import for alproxy if not already
  Blockly.Python.definitions_['from_naoqi_import_alproxy'] = 'from naoqi import ALProxy';
  
  var c_proxy_tts = 'tts = ALProxy("ALTextToSpeech", "' + pepperIP + '", 9559) \n';
  var c_proxy_as = 'as = ALProxy("ALAnimatedSpeech", "' + pepperIP + '", 9559) \n';
  
  var c_text = 'text = ' + text + ' \n';
  var c_set_lang = 'tts.setLaunguage("German") \n';
  
  var c_config;
  if(animation) {
    c_config = '{"bodyLanguageMode":"contextual"}';
  } else {
    c_config = '{"bodyLanguageMode":"disabled"}';
  }
  
  var c_say = 'as.say(text, ' + c_config +') \n';
  
  var code = c_proxy_tts + c_proxy_as + c_text + c_set_lang + c_say;
  
  return code;
}
