# Contributing
## Setup
 - Fork & Clone the project
 - Make sure the tests compile and pass. If you get `SyntaxError: Cannot use import statement outside a module` :
	 - Add `"type": "module"` to the nearest parent `package.json`
	 - Replace `import {expect} from 'chai';` with `import pkg from 'chai'; const { expect } = pkg;`

## Issues
Issues are very valuable to this project.

 - Ideas are a valuable source of contributions others can make
 - Problems show where this project is lacking
 - With a question you show where contributors can improve the user experience

Thank you for creating them.