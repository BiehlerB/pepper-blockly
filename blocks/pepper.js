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
  "type": "pepper_voice_reco_3",
  "message0": "Spracherkennung %1 Bei: %2 %3 Bei: %4 %5 Bei: %6 %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ONE_WORD",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "ONE_FUNC",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "TWO_WORD",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "TWO_FUNC"
    },
    {
      "type": "input_value",
      "name": "THREE_WORD",
      "check": "String",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "THREE_FUNC"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
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
}
]);  // END JSON EXTRACT (Do not delete this comment.)
