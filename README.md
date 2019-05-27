# CS Note App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Access Locally
```
$ git clone https://github.com/ruaraikirk/cs-note-app.git
$ cd [REPO_NAME]
$ npm i
$ npm start
```

## Progress and requirements met
Frontend
- It has to be single page application.
- It has to be developed using React, Redux and DraftJS (DraftJS is optional, you can select another similar library).
- As package bundler, Webpack has to be used.
- Use of Prettier. 
- Responsive.
- You can use Bootstrap as base framework.
- Project tracked with git.

## Notes and points for improvement/further work
* Left Nav List
  * Hover affect not functioning
```
":hover": {
              boxShadow: "0 0 22px 0 rgba(0, 0, 0, 0.10)"
            }
```
  * Would ideally be implementing a burger menu for mobile device
* Save Button
  * Currently the requirement for 'save button has to detect changes, and if there isn't any changes, it has to be disabled.' is not fully implemented.
* Pure CSS has been used in conjunction with Bootstrap. Minimal experience with LESS/SASS to date.
* Not yet deployed to dockerhub. 
* Redux would ideally be working with a backend API.
* StandardJS has not been utilised.
