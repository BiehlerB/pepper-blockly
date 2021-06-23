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

// Default Code for unimplemented Blocks
var defaultCode = 'self.s.ALTextToSpeech.setLanguage("German")\nself.s.ALAnimatedSpeech.say("Noch nicht implementiert.", {"bodyLanguageMode": "contextual"})\n';

Blockly.Python['pepper_does'] = function(block) {
    // Frame Block that creates the template around the generated code
    
    // Add the imports from jumpstarter
    Blockly.Python.definitions_['stkrunner'] = 'import stk.runner';
    Blockly.Python.definitions_['stkevents'] = 'import stk.events';
    Blockly.Python.definitions_['stkservices'] = 'import stk.services';
    Blockly.Python.definitions_['stklogging'] = 'import stk.logging';
    
    /// official way to indent
    var c_code = Blockly.Python.statementToCode(block, 'CODE');
    var c_code_indented = Blockly.Python.prefixLines(c_code, '  ');
    
    // Prefix
    var c_class = 'class Activity(object):\n' + '  APP_ID = "com.aldeberan.BlocklyPepper"\n';
    var c_init = '  def __init__(self, qiapp):\n' + '    self.qiapp = qiapp\n' + '    self.events = stk.events.EventHelper(qiapp.session)\n' + '    self.s = stk.services.ServiceCache(qiapp.session)\n' + '    self.logger = stk.logging.get_logger(qiapp.session, self.APP_ID)\n' + '  \n';
    
    // Onstart with Code
    var c_onstart =  '  def on_start(self):\n' + c_code_indented + '    self.qiapp.stop()\n' + '  \n';
    
    // Postfix
    var c_onstop =  '  def on_stop(self):\n' + '    self.logger.info("Application Finished.")\n' + '    self.events.clear()\n' + '  \n';
    var c_main = 'if __name__ == "__main__":\n' + '  stk.runner.run_activity(Activity)\n';
    
    var code = c_class + c_init + c_onstart + c_onstop + c_main;
    
    return code;
}

//
//  Sprach-Blöcke
//

Blockly.Python['pepper_say'] = function(block) { 
  // Pepper says text (with or without animation)
  
  // get the variables and code from the block
  var animation = block.getFieldValue('ANIMATION');
  var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || 'Hallo Welt.';
  
  var c_text = 'text = ' + text + ' \n';
  var c_set_lang = 'self.s.ALTextToSpeech.setLanguage("German") \n';
  
  var c_config;
  if(animation) {
    c_config = '{"bodyLanguageMode": "contextual"}';
  } else {
    c_config = '{"bodyLanguageMode": "disabled"}';
  }
  
  var c_say = 'self.s.ALAnimatedSpeech.say(text, ' + c_config +') \n';
  
  var code = c_text + c_set_lang + c_say + '\n';
  
  return code;
}

Blockly.Python['pepper_voice_reco_list'] = function(block) {
  // Pepper recognizes a Word from a list and saves it to 
  
  // Get List and Variable from the block
  var words = Blockly.Python.valueToCode(block, 'WORD_LIST', Blockly.Python.ORDER_ATOMIC) || '["ja", "nein"]';
  var recognized_var = Blockly.Python.variableDB_.getName(block.getFieldValue('RECOGNIZED'), Blockly.Variables.NAME_TYPE);
  
  var c_words = 'words = ' + words + '\n'; // resolve word list
  var c_lang = 'self.s.ALSpeechRecognition.setLanguage("German") \n';
  var c_pause = 'self.s.ALSpeechRecognition.pause(True) \n';
  var c_vocab = 'self.s.ALSpeechRecognition.setVocabulary(words, False) \n'; // prepare Reco
  var c_unpause = 'self.s.ALSpeechRecognition.pause(False) \n';
  var c_sub = 'self.s.ALSpeechRecognition.subscribe("PepperBlocklyReco") \n'; // start Reco
  
  var c_getreco = recognized_var + ' = self.s.ALMemory.getDataOnChange("WordRecognized", 0)[0] \n'; // This is deprecated, but works
  
  var c_unsub = 'self.s.ALSpeechRecognition.unsubscribe("PepperBlocklyReco") \n'; // stop Reco
  
  var code = c_words + c_lang + c_pause + c_vocab + c_unpause + c_sub + c_getreco + c_unsub + '\n';
  
  return code;
}

Blockly.Python['pepper_change_volume'] = function(block) {
  var value_volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  return defaultCode;
};

//
// Bewegungs Blöcke
//

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
  var code = c_distance + c_speed_prc + c_speed_def + c_speed_if + c_speed + c_time + c_move + '\n';
  
  // return the code
  return code;
}

Blockly.Python['pepper_animation'] = function(block) {
  // TODO: This doesn't quite work as intended (TaiChi etc. isn't predefined on pepper, just in Choregraphe)
  // For now this just plays one animation
  
  // Get Variables from Block
  var animation = block.getFieldValue('ANIMATION');
  
  // Get the Animation path Hey_1
  var c_path = 'anim_path =  "animations/Stand/Gestures/ShowSky_4"\n';
  
  // execute the animation
  var c_run = 'self.s.ALAnimationPlayer.run(anim_path)\n';
  
  // assemble and return the code
  var code = c_path + c_run;
  return code;
};

Blockly.Python['pepper_turn'] = function(block) {
  // Pepper turns
  
  // Get Variables from the block
  var direction = block.getFieldValue('DIRECTION');
  var degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_ATOMIC) || '90';  
  
  // Needed for conversion to radians
  Blockly.Python.definitions_['math'] = 'import math';
  
  var c_degrees = 'degrees = ' + degrees + '\n'  // resolve degrees
  var c_radians = 'radians = math.radians(degrees) \n' // convert to radians
  
  var c_turn;
  if(direction == 'LEFT') {
    c_turn = 'self.s.ALMotion.moveTo(0, 0, radians) \n';
  } else if (direction == 'RIGHT') {
    c_turn = 'self.s.ALMotion.moveTo(0, 0, -radians) \n';
  }
  
  // assemble code
  var code = c_degrees + c_radians + c_turn + '\n';
  
  return code;
}

// 
//  Gesichter
//
Blockly.Python['pepper_expression_reco'] = function(block) {
  var expression_var = Blockly.Python.variableDB_.getName(block.getFieldValue('EXPRESSION'), Blockly.Variables.NAME_TYPE);
  
  // TODO: Assemble Python into code variable.
  // TODO: Random expression for each compile as standin
  var expressions = ["neutral", "glücklich", "überrascht", "wütend", "traurig"];
  var expression_rand = "'" + expressions[Math.floor(Math.random()*5)] + "'";
  
  var c_standin = expression_var + " = " + expression_rand + '\n \n';
  
  return c_standin;
};

Blockly.Python['pepper_save_face'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  return defaultCode;
};
