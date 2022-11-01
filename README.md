# Campfire Web App
This React app relies on the Ruby on Rails API server for data access.

### Starting the application
First get an Oauth client ID from your local Ruby on Rails database. Make sure you have run `seeds.rb` against development database. Then in Rails console run `Doorkeeper::Application.where(name: 'Web')` to get an application object. Copy the `uid` - this is your client ID for web development.

Then edit the Oauth client ID in `.env.development.local`, like so:
```
REACT_APP_OAUTH_CLIENT_ID=<your Oauth client ID>
```

Finally run `npm start` to start the app in the development mode. Then open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### Running the application in Docker
Mostly we use Docker Compose to run API and web containers together. The `docker-compose.yaml` file is in the `campfire-api` repo.

Here is how you build the Docker image: `docker build -t campfire-web .`
If you need to run it individually (API should be already running):
```
docker run --env-file .env.development.local -p 8080:8080 campfire-web
```

## CRA - Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
