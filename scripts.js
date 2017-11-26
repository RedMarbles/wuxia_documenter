
// A default set of data for the New button
var _data_default = [
	{
		"cat_name" : "Category1",
		"cat_data" : [
			{
				"name" : "_root",
				"parents" : [],
				"description" : "Root node",
				"children" : [],
				"color" : "white"
			},
			{
				"name" : "Empty",
				"parents" : ["_root"],
				"description" : "Wololo",
				"children" : [],
				"color" : "pink"
			}
		]
	},
	{
		"cat_name" : "Category2",
		"cat_data" : [
			{
				"name" : "_root",
				"parents" : [],
				"description" : "Root node",
				"children" : [],
				"color" : "white"
			},
			{
				"name" : "Blank",
				"parents" : ["_root"],
				"description" : "Wololo",
				"children" : [],
				"color" : "green"
			}
		]	
	}
];

var _data_total = _data_default.slice();

var _index_category = 0;

var _index_element = 0;

var _data_category = _data_total[_index_category].cat_data

var _data_element = _data_category[_index_element]

var _data_saved = false; // Records whether the entire dataset has been saved yet

var _element_saved = true; // Records whether any changes have been made to the current element

var _project_name = "Untitled"; // The name of the current project

fillChildren();


// Function to generate some sample data
function generateData() {
	var data_obj = {
		"name" : "Nie Yan",
		"parents" : [ "Asskickers United" ],
		"description" : "Protagonist",
		"children" : [ ],
		"color" : "white"
	}

	var data_for1category = [
	{
		"name" : "Nie Yan",
		"parents" : [ "Asskickers United" ],
		"description" : "Protagonist",
		"children" : [ ],
		"color" : "white"	
	},
	{
		"name" : "Nie Yan",
		"parents" : [ "Asskickers United" ],
		"description" : "Protagonist",
		"children" : [ ],
		"color" : "white"
	},
	{
		"name" : "Nie Yan",
		"parents" : [ "Asskickers United" ],
		"description" : "Protagonist",
		"children" : [ ],
		"color" : "white"
	}
	]

	var data = [
	{
		"cat_name" : "Characters",
		"cat_data" : [
			{
				"name" : "_root",
				"parents" : [],
				"description" : "Root node",
				"children" : [ ],
				"color" : "white"
			},
			{
				"name" : "Asskickers United",
				"parents" : [ "_root" ],
				"description" : "Guild",
				"children" : [ ],
				"color" : "white"
			},
			{
				"name" : "Nie Yan",
				"parents" : [ "Asskickers United" ],
				"description" : "Protagonist",
				"children" : [ ],
				"color" : "white"
			},
			{
				"name" : "Yao Yao",
				"parents" : [ "Asskickers United" ],
				"description" : "Heroine",
				"children" : [ ],
				"color" : "white"
			}
			]
	},
	{
		"cat_name" : "Classes/Skills",
		"cat_data" : [
			{
				"name" : "_root",
				"parents" : [],
				"description" : "Root node",
				"children" : [ ],
				"color" : "white"
			},
			{
				"name" : "Thief",
				"parents" : [ "_root"],
				"description" : "Rouge class",
				"children" : [ ],
				"color" : "white"
			},
			{
				"name" : "Stealth",
				"parents" : ["Thief"],
				"description" : "Go invisible",
				"children" : [ ],
				"color" : "white"
			}
		]
	}
	]

	var s = JSON.stringify(data)
	download("test.json", s)
}

function underscorer(value)
{
	var output = "";
	for (i in value)
	{
		var c = value[i];
		if(c==" ") c="_";
		output = output + c;
	}
	return output;
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileUploadSelect").files[0];

	_project_name = fileToLoad.name;
	_project_name = _project_name.substring(0,_project_name.length-5)

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent){
		var textFromFileLoaded = fileLoadedEvent.target.result;
		// document.getElementById("object_desc").value = textFromFileLoaded;
		_data_total = JSON.parse(textFromFileLoaded);
		//document.getElementById("object_desc").value = _data_total[1].cat_name;
		fillChildren();
		reload();
	};

	fileReader.readAsText(fileToLoad, "UTF-8");
}

function saveData()
{
	var s = JSON.stringify( _data_total )
	download(_project_name + ".json", s)
	_data_saved = true;
	reload();
}



// Fill in the information about child nodes using the parents information
function fillChildren()
{
	for(var cat_index_ = 0; cat_index_ < _data_total.length; cat_index_++)
	{
		for (ele_ind1 in _data_total[cat_index_].cat_data)
		{
			var element1 = _data_total[cat_index_].cat_data[ele_ind1];
			element1.children = []; // Empty the children array
			// Find the elements that have element1 as a parent
			for (ele_ind2 in _data_total[cat_index_].cat_data)
			{
				var element2 = _data_total[cat_index_].cat_data[ele_ind2];
				if (element2.parents.findIndex(function(parent){return parent==element1.name}) != -1)
				{
					element1.children.push(element2.name);
				}
			}
		}
	}
}

function populateTree(nodename)
{
	var node_index = _data_category.findIndex(function(element){return nodename==element.name;});
	var node_children = _data_category[node_index].children;
	var node_color = _data_category[node_index].color;
	var newnode = { "name": nodename, "color":node_color, "children":[] };
	// loop through and add children to the new node
	for (child_index in node_children)
	{
		var child_name = node_children[child_index]
		newnode.children.push( populateTree(child_name) )
	}
	return newnode;
}

function recursiveHeirarchy(local_tree)
{
	// currently local_tree = {name, children(tree)}
	if (local_tree.children.length == 0) return "";

	// Sort the local tree so that the children are arranged such that children without any further branches are placed first.
	local_tree.children.sort(function(a,b){
		var alen = (a.children.length>0) ? 1 : 0;
		var blen = (b.children.length>0) ? 1 : 0;
		return alen - blen;
	});

	var html = "<ul class='collapse in' id='heirlist_id" + underscorer(local_tree.name) + "'> \n";

	for (node_ind in local_tree.children)
	{
		node = local_tree.children[node_ind];
		html = html + "<li class='heir_item'> "
		html = html + "<a href=# data-toggle='collapse' data-target='#heirlist_id" + underscorer(node.name) + "'> [" + node.children.length + "] </a>"; // The number of children classes, as well as the collapsibe button
		html = html + "<a class='heir_element color-" + node.color + "' href=# id='heir_id" + node.name + "' onClick='objectSelected(this.id)' >" + node.name + "</a>";
		html = html + recursiveHeirarchy(node);
		html = html + "</li> \n";
	}
	html = html + "</ul> \n";
	return html;
}

function objectSelected(object_id)
{
	if (_element_saved == false)
	{
		alert("WARNING: You have unsaved changes to the current element. Please Update or Revert.");
		return;
	}

	var object_name = object_id.substring(7) // Ignore the first 7 letters of the object id, which are "heir_id"
	_index_element = _data_category.findIndex( function(element){return object_name==element.name} );
	_data_element = _data_category[_index_element];
	_element_saved = true;
	reload();
}

function categorySelected(category_id)
{
	if (_element_saved == false)
	{
		alert("WARNING: You have unsaved changes to the current element. Please Update or Revert.");
		return;
	}

	var category_name = category_id.substring(6) // Ignore the first 6 letters of the id, which are "cat_id"
	_index_category = _data_total.findIndex( function(element){return category_name==element.cat_name;} );
	_index_element = 0;
	_data_category = _data_total[_index_category].cat_data
	_element_saved = true;
	fillChildren();
	reload();
}

function categoryDelete()
{
	if(_data_total.length == 1)
	{
		alert("ERROR: Cannot delete the last category");
		return;
	}

	var check = confirm("Are you sure you want to delete the " + _data_total[_index_category].cat_name + " category?");
	if (check==false) return;

	_data_total.splice(_index_category,1);
	_index_category = 0;
	_index_element = 0;
	_data_category = _data_total[_index_category];
	_data_element = _data_category[_index_element];
	fillChildren();
	reload();
}

function categoryRename()
{
	var currentname = _data_total[_index_category].cat_name;
	var newname = prompt("What do you want to rename " + currentname + " as?", currentname);

	if ( newname==null || newname=="" || newname==currentname) return; // Do nothing if the user enters blank text or the same name

	if ( _data_total.findIndex(function(cat){return cat.cat_name==newname;}) != -1)
	{
		alert("ERROR: A category by that name already exists.");
		return;
	}

	_data_total[_index_category].cat_name = newname;
	fillChildren();
	reload();
}

function categoryAdd()
{
	var newname = prompt("What do you want to name the new category?", "Category-"+Math.floor(Math.random() * 9934925));

	if ( newname==null || newname=="" ) return;

	if ( _data_total.findIndex(function(cat){return cat.cat_name==newname}) != -1)
	{
		alert("ERROR: A category by that name already exists.")
		return;
	}

	var newcategory = {
		"cat_name" : newname,
		"cat_data" : [
			{
				"name" : "_root",
				"parents" : [],
				"description" : "Root node",
				"children" : [],
				"color" : "white"
			},
			{
				"name" : "Empty",
				"parents" : ["_root"],
				"description" : "Wololo",
				"children" : [],
				"color" : "pink"
			}
		]
	};
	_data_total.push(newcategory);

	_index_category = _data_total.findIndex(function(cat){return cat.cat_name==newname});
	_index_element = 0;
	_data_category = _data_total[_index_category];
	_data_element = _data_category[_index_element];
	fillChildren();
	reload();
}

function generateTabbar()
{
	var html_tabs = "";
	for(cat_index in _data_total)
	{
		// Setting the active class
		var html_active = "";
		if(cat_index == _index_category) html_active = " class='active'";
		var cat_name = _data_total[cat_index].cat_name;
		html_tabs = html_tabs + "<li" + html_active + ">";

		// Link to switch to category
		html_tabs = html_tabs + "<a href=# id='cat_id"+cat_name+"' onClick='categorySelected(this.id)' >";
		html_tabs = html_tabs + cat_name;
		html_tabs = html_tabs + "</a>";
		html_tabs = html_tabs + "</li> \n";
	}
	return html_tabs;
}

function reload() {
	//generate_data()
	_data_category = _data_total[_index_category].cat_data
	_data_element = _data_category[_index_element]

	// Set up the category tabs on top
	var tabbar = document.getElementById('tabbar').innerHTML = generateTabbar();

	document.getElementById('title').innerHTML = "The Wuxia Documenter Project - " + _project_name;

	tree = []
	tree = populateTree("_root"); // Fill the tree beginning from the root node
	document.getElementById('heirarchy').innerHTML = recursiveHeirarchy(tree);

	document.getElementById('object_name').value = _data_element.name;
	document.getElementById('object_parents').value = _data_element.parents;
	document.getElementById('object_desc').value = _data_element.description;
	document.getElementById('select_color').value = _data_element.color;

	// Specify whether the current file has been saved or not
	if(_data_saved == true)
	{
		document.getElementById('saveBtn').innerHTML = "<span class='glyphicon glyphicon-save-file'></span> Save";
	}
	else
	{
		document.getElementById('saveBtn').innerHTML = "<span class='glyphicon glyphicon-save-file'></span> Save*";
	}
}

// Removes faulty characters from the string
function sanitizeString(input)
{
	output = input.slice();
	while (output.indexOf("'") != -1)
	{
		output = output.replace("'","");
	}
	return output;
}

function clickUpdate()
{
	// Collect form data
	var newname = document.getElementById('object_name').value;
	var newparents = document.getElementById('object_parents').value;
	var newdesc = document.getElementById('object_desc').value;
	var newcolor = document.getElementById('select_color').value;
	//var newcolor = 

	newname = sanitizeString(newname);

	if(_data_element.name == "_root")
	{
		alert("ERROR: Cannot change parameters of the root element");
		return;
	}

	// Check if name has been changed
	if (newname != _data_element.name)
	{
		//TODO - Process the new name variants, check if name collision, update all old references to this name
		// Check if there is a name collision
		if ( _data_category.findIndex(function(elem){return elem.name==newname}) != -1 )
		{
			alert("ERROR: There is a name collision. Please select a new name.");
			return;
		}
	}

	// Process and verify the parents data
	parents_data = newparents.split(","); // Split the parents using commas
	for (parents_index in parents_data)
	{
		parent = sanitizeString( parents_data[parents_index] );
		if ( _data_category.findIndex(function(elem){return elem.name==parent}) == -1)
		{
			alert("ERROR: Could not find the parent named '" + parent + "'");
			return;
		}
	}


	// Update all old references to this name
	for (ele_index in _data_category)
	{
		var element = _data_category[ele_index];
		var change_index = element.parents.findIndex(function(parent){return parent==_data_element.name})
		if (change_index != -1)
		{
			element.parents[change_index] = newname;
		}
	}

	// Update the element if nothing else is wrong
	_data_element.name = newname;
	_data_element.parents = parents_data;
	_data_element.description = newdesc;
	_data_element.color = newcolor;
	_element_saved = true;
	_data_saved = false;
	fillChildren();
	reload();
}

function clickRevert()
{
	_element_saved = true;
	reload();
}


function clickAddObject()
{
	if (_element_saved == false)
	{
		alert("WARNING: You have unsaved changes to the current element. Please Update or Revert.");
		return;
	}

	var randomname = "NewObject-"+Math.floor(Math.random() * 9934925);
	var newelement = {
		"name" : randomname,
		"parents" : [_data_element.name], // Add the new element as a child of the current element
		"description" : "",
		"children" : [],
		"color" : "white"
	};
	_data_category.push(newelement);

	_index_element = _data_category.findIndex(function(elem){return elem.name==randomname})
	_data_element = _data_category[_index_element]

	_data_saved = false;

	fillChildren();
	reload();
}

function clickDelObject()
{
	// TODO - Verify that the user wants to delete the entry

	if (_data_element.name == "_root")
	{
		alert("ERROR: Cannot delete root element.");
		return;
	}

	// Remove all references to the element in the parents lists
	for (ele_index in _data_category)
	{
		var element = _data_category[ele_index];
		var remove_index = element.parents.findIndex(function(parent){return parent==_data_element.name})
		if (remove_index != -1)
		{
			element.parents.splice(remove_index,1);
		}
		if (element.parents.length == 0 && element.name != "_root")
		{
			element.parents = ["_root"];
		}
	}

	_data_category.splice(_index_element,1);
	_index_element = 0;

	fillChildren();
	reload();
}


function clickNewButton()
{
	_data_total = [
		{
			"cat_name" : "Category1",
			"cat_data" : [
				{
					"name" : "_root",
					"parents" : [],
					"description" : "Root node",
					"children" : [],
					"color" : "white"
				},
				{
					"name" : "Empty",
					"parents" : ["_root"],
					"description" : "Wololo",
					"children" : [],
					"color" : "pink"
				}
			]
		},
		{
			"cat_name" : "Category2",
			"cat_data" : [
				{
					"name" : "_root",
					"parents" : [],
					"description" : "Root node",
					"children" : [],
					"color" : "white"
				},
				{
					"name" : "Blank",
					"parents" : ["_root"],
					"description" : "Wololo",
					"children" : [],
					"color" : "green"
				}
			]	
		}
	];
	_index_category = 0;
	_index_element = 0;
	_data_category = _data_total[_index_category];
	_data_element = _data_category[_index_element];
	_element_saved = true;
	_data_saved = false;
	_project_name = "Untitled";
	fillChildren();
	reload();
}

function changeForm()
{
	_element_saved = false;
}