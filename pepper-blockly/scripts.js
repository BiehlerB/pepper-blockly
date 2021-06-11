var demoWorkspace;

// Call on load to init workspace
function init_workspace() {
    demoWorkspace = Blockly.inject('blocklyDiv',
    { 
        toolbox : toolbox, 
        collapse : true, 
        comments : true, 
        disable : true, 
        maxBlocks : Infinity, 
        trashcan : true, 
        horizontalLayout : false, 
        toolboxPosition : 'start', 
        css : true, 
        media : 'https://blockly-demo.appspot.com/static/media/', 
        rtl : false, 
        scrollbars : true, 
        sounds : true, 
        oneBasedIndex : true, 
        grid : {
            spacing : 20, 
            length : 1, 
            colour : '#888', 
            snap : false
        }, 
        zoom : {
            controls : true, 
            wheel : true, 
            startScale : 1, 
            maxScale : 3, 
            minScale : 0.3, 
            scaleSpeed : 1.2
        }
    });
}

// Save button TODO
function button_save() {
    console.log("Not yet implemented");
}

// Load Button TODO
function button_load() {
    console.log("Not yet implemented");
}

// Compile, copy and show button
function button_copy(workspace) {
    var code = Blockly.Python.workspaceToCode(workspace);
    navigator.clipboard.writeText(code);
    alert(code);
}
