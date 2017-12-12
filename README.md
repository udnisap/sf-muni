# SF-Muni Map
Live visualization of SF Muni map based on
http://webservices.nextbus.com/service/publicJSONFeed. 
This is built React-create-app

Live version available at https://udnisap.js.org/sf-muni/


## Setup
Since both React and D3 is capable of rending UI. I have used react to do all the rendering and animation is handled through d3. All the data fetching is done via react components which could be refactored to state management system like redux / redux-sage. Transitions are handled in individual item level through react-transition-group. 

## Development
```
yarn 
yarn start
```

## Deployment
```
yarn build
```

## Tests
```
yarn test
```


