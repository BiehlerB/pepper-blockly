/**
 * @fileoverview Pepper blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Constants.Pepper');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldNumber');
goog.require('Blockly.FieldVariable');


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Frame Block to generate Template
  {
    "type": "pepper_does",
    "message0": "Pepper macht: %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "CODE"
      }
    ],
    "inputsInline": true,
    "colour": 195,
    "tooltip": "",
    "helpUrl": ""
  },
  // Block for moving pepper in cardinal directions.
  {
  "type": "pepper_walk",
  "message0": "Nach %1 gehen %2 Distanz (in m) %3 Geschwindigkeit %4",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "DIRECTION",
      "options": [
        [
          "↑ Vorne",
          "FORWARD"
        ],
        [
          "↓ Hinten",
          "BACKWARD"
        ],
        [
          "→ Rechts",
          "RIGHT"
        ],
        [
          "← Links",
          "LEFT"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "DISTANCE",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "SPEED",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pepper_turn",
  "message0": "Nach %1 drehen für %2 Grad",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "DIRECTION",
      "options": [
        [
          "⟲ links",
          "LEFT"
        ],
        [
          "⟳ rechts",
          "RIGHT"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "DEGREES",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pepper_animation",
  "message0": "Entertainment-Animation ausführen: %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ANIMATION",
      "options": [
        [
          "Tai-Chi",
          "TAICHI"
        ],
        [
          "Disco",
          "DISCO"
        ],
        [
          "Headbangen",
          "HEADBANG"
        ],
        [
          "Elefant",
          "ELEPHANT"
        ],
        [
          "Maus",
          "MOUSE"
        ],
        [
          "Staubsauger",
          "VACUUM"
        ],
        [
          "Mystisch",
          "MYSTICAL"
        ],
        [
          "Foto schießen",
          "TAKEPICTURE"
        ],
        [
          "Saxophon spielen",
          "SAXOPHONE"
        ],
        [
          "Luftgitarre",
          "GUITAR"
        ],
        [
          "Golf",
          "GOLF"
        ],
        [
          "Fußball",
          "FOOTBALL"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 65,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pepper_voice_reco_list",
  "message0": "Spracherkennung in %1 aus: %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "RECOGNIZED",
      "variable": "erkanntes_wort"
    },
    {
      "type": "input_value",
      "name": "WORD_LIST",
      "check": "Array"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pepper_say",
  "message0": "Sage: %1 %2 Gestik",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "String"
    },
    {
      "type": "field_checkbox",
      "name": "ANIMATION",
      "checked": true
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
}, 
{
  "type": "pepper_change_volume",
  "message0": "Lautstärke setzen: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VOLUME",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
// Gesichter
{
  "type": "pepper_expression_reco",
  "message0": "Gesichtsausdruck erkennen in %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "EXPRESSION",
      "variable": "ausdruck"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pepper_save_face",
  "message0": "Gesicht unter Namen %1 abspeichern",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pepper_expression_case",
  "message0": "Gesichtsausdruck erkennen: %1 Falls glücklich %2 mache %3 Falls traurig %4 mache %5 Falls überrascht %6 mache %7 Falls wütend %8 mache %9 Falls neutral %10 mache %11",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "HAPPY"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "SAD"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "SHOCKED"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "ANGRY"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NEUTRAL"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
{
    "type": "pepper_voice_reco",
    "message0": "Spracherkennung",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "helpUrl": "",
    "mutator": "controls_reco_mutator"
}
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.defineBlocksWithJsonArray([ // Mutator blocks. Do not extract.
  // Block representing a word of Voice Recognition.
  {
    "type": "pepper_voice_reco_base",
    "message0": "Spracherkennung",
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": 160,
    "tooltip": ""
  },
  {
    "type": "pepper_voice_reco_mutator",
    "message0": "Wort",
    "previousStatement": null,
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": 160,
    "tooltip": ""
  }
]);

// Functions for Mutator
Blockly.Constants.Pepper.CONTROLS_RECO_MUTATOR_MIXIN = {
  wordsCount_: 2,

  /**
   * Don't automatically add STATEMENT_PREFIX and STATEMENT_SUFFIX to generated
   * code.  These will be handled manually in this block's generators.
   */
  suppressPrefixSuffix: true,

  /**
   * Create XML to represent the number of words inputs.
   * @return {Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    if (!this.wordsCount_) {
      return null;
    }
    var container = Blockly.utils.xml.createElement('mutation');
    if (this.wordsCount_) {
      container.setAttribute('words', this.wordsCount_);
    }
    return container;
  },
  /**
   * Parse XML to restore the words inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.wordsCount_ = parseInt(xmlElement.getAttribute('words'), 5) || 0;
    this.rebuildShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('pepper_voice_reco_base');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.wordsCount_; i++) {
      var wordsBlock = workspace.newBlock('pepper_voice_reco_mutator');
      wordsBlock.initSvg();
      connection.connect(wordsBlock.previousConnection);
      connection = wordsBlock.nextConnection;
    }
    
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    var wordBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.wordsCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    while (wordBlock && !wordBlock.isInsertionMarker()) {
      this.wordsCount_++;
      valueConnections.push(wordBlock.valueConnection_);
      statementConnections.push(wordBlock.statementConnection_);
      
      wordBlock = wordBlock.nextConnection &&
          wordBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    this.reconnectChildBlocks_(valueConnections, statementConnections);
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function(containerBlock) {
    var wordBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (wordBlock) {
      var inputWord = this.getInput('WORD' + i);
      var inputDo = this.getInput('DO' + i);
      wordBlock.valueConnection_ =
        inputWord && inputWord.connection.targetConnection;
      wordBlock.statementConnection_ =
        inputDo && inputDo.connection.targetConnection;
      i++;
      
      wordBlock = wordBlock.nextConnection &&
          wordBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Reconstructs the block with all child blocks attached.
   * @this {Blockly.Block}
   */
  rebuildShape_: function() {
    var valueConnections = [null];
    var statementConnections = [null];
    
    var i = 1;
    while (this.getInput('WORD' + i)) {
      var inputWord = this.getInput('WORD' + i);
      var inputDo = this.getInput('DO' + i);
      valueConnections.push(inputWord.connection.targetConnection);
      statementConnections.push(inputDo.connection.targetConnection);
      i++;
    }
    this.updateShape_();
    this.reconnectChildBlocks_(valueConnections, statementConnections);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this {Blockly.Block}
   * @private
   */
  updateShape_: function() {
    // Delete everything.
    var i = 1;
    while (this.getInput('WORD' + i)) {
      this.removeInput('WORD' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (i = 1; i <= this.wordsCount_; i++) {
      this.appendValueInput('WORD' + i)
          .setCheck('String')
          .appendField('Bei erkanntem Wort');
      this.appendStatementInput('DO' + i)
          .appendField('Mache');
    }
  },
  /**
   * Reconnects child blocks.
   * @param {!Array.<?Blockly.RenderedConnection>} valueConnections List of
   * value connections for 'if' input.
   * @param {!Array.<?Blockly.RenderedConnection>} statementConnections List of
   * statement connections for 'do' input.
   * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   * @this {Blockly.Block}
   */
  reconnectChildBlocks_: function(valueConnections, statementConnections) {
    for (var i = 1; i <= this.wordsCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'WORD' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
  }
};

Blockly.Extensions.registerMutator('controls_reco_mutator',
    Blockly.Constants.Pepper.CONTROLS_RECO_MUTATOR_MIXIN, null,
    ['pepper_voice_reco_mutator']);
