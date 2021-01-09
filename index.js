//Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
//An array of questions for user input
const questions = [
    {
        type: "input",
        message: "Project Title:",
        name: "title"
    },

    {
        type: "list",
        message: "Licensing Info (badge): ",
        name: "license",
        choices: ['mit', 'mozilla', 'apache', 'boost'],
    },

    {
        type: "input",
        message: "Short Project Description:",
        name: "description"
    },
    
    {
        type: "input",
        message: "Installation Instructions: ",
        name: "installation"
    },

    {
        type: "input",
        message: "Instructions for Use: ",
        name: "usage"
    },

    {
        type: "input",
        message: "Testing Info:",
        name: "tests"
    },

    {
        type: "input",
        message: "Contributing Info: Otherwise leave blank for guidelines. ",
        name: "contributing"
    },

    {
        type: "input",
        message: "What is your E-mail Address?",
        name: "email"
    },

    {
        type: "input",
        message: "What is your GitHub User ID?",
        name: "gitusername"
    },

];
//Object of licenses to call upon.
const licenses = 
    {
        mit: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',

        mozilla: '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',

        apache: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',

        boost: '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)',
    }


//Function that creates the readme string. 
function genREADME(badge, contributeGuide, {title, description, installation, usage, tests, contributing, email, gitusername}) {
return`# ${title}

${badge}

## Description: 
${description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Testing](#tests)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation: 
${installation}

## Usage: 
${usage}

## Tests: 
${tests}

## Contributing:
${contributing}
${contributeGuide}

## Questions:
* GitHub Profile:  [${gitusername}](https://github.com/${gitusername})
* Email: <${email}>

`

}
//if contributing field is left blank fills that with guidelines.
function requireGuidelines(response){
    if (!response){
    guidelines = '[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)'
    } else {
    guidelines = ''
    }
}
//Create a function to initialize app
function init() {
    inquirer.prompt(questions, licenses).then(response => {
        let licenseBadge = licenses[response.license];
        let ifGuidelines = response.contributing;
        requireGuidelines(ifGuidelines);
        const mdString = genREADME(licenseBadge, guidelines, response);
        fs.writeFile('READMEgenerated.md', mdString, function (err) {
            if (err) throw err;
            console.log('Generated README')
        });
    })
}

// Function call to initialize app
init();
