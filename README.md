# The Wuxia Documenter Project

## Description
This is just a tool I designed to help keep track of all the characters, skills and items that pop up everywhere in the several webnovels I read. Of course, the tool is general enough to be used to categorize anything under the wide sun, though it's specially optimized for the character documentation.

It's not much different from a wikia, except that it's much more personal. Also, its main purpose is to set up an heirarchy of elements, where each element can be the parent or child of multiple other elements in the tree. Of course, it doesn't really allow for circular loops of references.

## Usage
Just open the `documenter.html` file in your web browser of choice (make sure its updated). It does not use cookies, and all data is instead stored in .json files.  

Please be aware that a file will not automatically be saved if you accidentally close or reload the tab, in which case you will lose any unsaved data.

There are already some sample .json files that you can try loading in the `data/` folder of this project. It is recommended to download them first and then select them through the `Load` button. To discourage security loopholes, it will currently not be possible to load files through a URL.


## Warnings
While the code of this tool itself is completely harmless, I have not strictly tested it for possible cross-site-scripting (XSS) loopholes. Hence, as much as possible, try to avoid loading any .json files from other users, or files which you have not personally created, unless you absolutely trust the source.