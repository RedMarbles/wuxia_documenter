alert("Script loaded")

var _data_total = [
{
	"cat_name" : "Empty",
	"cat_data" : [
		{
			"name" : "_root",
			"parents" : [],
			"description" : "Root node",
			"children" : [],
			"color" : "white"
		}
	]
}];

var _index_category = 0;

var _index_element = 0;

var _data_category = _data_total[_index_category].cat_data

var _data_element = _data_category[_index_element]


var _tree_category = []




function test_javascript()
{
	alert("This is an alert message command");
	var paragraph = document.getElementById("test_paragraph");
	paragraph.innerHTML = "Wohoho";
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

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent){
		var textFromFileLoaded = fileLoadedEvent.target.result;
		// document.getElementById("object_desc").value = textFromFileLoaded;
		_data_total = JSON.parse(textFromFileLoaded);
		//document.getElementById("object_desc").value = _data_total[1].cat_name;
		for(var i = 0; i<_data_total.length; i++)
		{
			fillChildren(i);
		}
		reload();
	};

	fileReader.readAsText(fileToLoad, "UTF-8");
}

function saveData()
{
	var s = JSON.stringify( _data_total )
	download("test.json", s)
}

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

// Fill in the information about child nodes using the parents information
function fillChildren(cat_index_)
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

function populateTree(nodename)
{
	var node_index = _data_category.findIndex(function(element){return nodename==element.name;});
	var node_children = _data_category[node_index].children;
	var newnode = { "name": nodename, "children":[] };
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
	html = "<ul> \n";
	for (node_ind in local_tree.children)
	{
		node = local_tree.children[node_ind];
		// The link should read : onClick='objectSelected("Nie Yan")'
		// console.log("<li> <a class='heir_element' href=# + onClick='objectSelected(\"" + node.name "\")'>");
		// html = html + "<li> <a class='heir_element' href=# + onClick='objectSelected(\"" + node.name "\")'>" + node.name + "</a>";
		html = html + "<li> <a class='heir_element' href=# id='heir_id" + node.name + "' onClick='objectSelected(this.id)' >" + node.name + "</a>";
		html = html + recursiveHeirarchy(node);
		html = html + "</li> \n";
	}
	html = html + "</ul> \n";
	return html;
}

function objectSelected(object_id)
{
	console.log(object_id.substring(7))
	object_name = object_id.substring(7)
	_index_element = _data_category.findIndex( function(element){return object_name==element.name});
	reload();
}

function reload() {
	// Do nothing for now
	//generate_data()
	_data_category = _data_total[_index_category].cat_data
	_data_element = _data_category[_index_element]

	tree = []
	tree = populateTree("_root"); // Fill the tree beginning from the root node
	document.getElementById('heirarchy').innerHTML = recursiveHeirarchy(tree);

	document.getElementById('object_name').value = _data_element.name;
	document.getElementById('object_parents').value = _data_element.parents;
	document.getElementById('object_desc').value = _data_element.description;
	

	// data1 = [34,45,66,78]
	// data2 = data1.slice()
	// //data2.reverse()
	// //data2[3] = 99
	// data2.splice(1,0,125)
	// data3 = data2.findIndex(function(elem){return elem==45})
	// document.getElementById('object_desc').value = data1 + "\n" + data2 + "\n" + data3
	// document.getElementById("object_desc").value = "Hello World";
}
