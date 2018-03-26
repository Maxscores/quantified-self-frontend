# Quantified Self

Quantified self is a webapp that allows a user to keep track of the foods they've eaten and save them to meals. It communicates with a Node.js backend written using Express. The frontend UI has some simple scripted testing written with [Nightmare](https://github.com/segmentio/nightmare), [Mocha](https://mochajs.org/), and [Chai](http://www.chaijs.com/). The site UI was omptimized for mobile devices and is not responsive. For the best experience view the app on a mobile device or by using your browser's webtools to simulate a mobile screen.

[Quantified Self](https://maxscores.github.io/quantified-self)

Express Backend Repo: https://github.com/Maxscores/quantified-self-js-backend
Express Backend App: https://qs-1710-js.herokuapp.com

## Run the Tests
Open you're terminal and navigate to the folder you'd like to save the project.

Clone the repo:
```
git clone https://github.com/Maxscores/quantified-self-frontend.git
cd quantified-self-frontend
```

Install the packages:
`npm install`

Boot the server:
`npm start`

Open another tab in terminal and run the tests:
`mocha test`
