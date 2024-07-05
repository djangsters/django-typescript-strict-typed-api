# Django React Part 2

This is a simple app to demonstrate the approach for integrating Django and React.
You can find the article [here]().

## Running the app
### Docker
Build
```shell
docker compose build
```
Migrate
```shell
docker compose run web python manage.py migrate
```
Create a user and export the API as JSON
```shell
docker compose run web python manage.py createsuperuser
docker compose run web python manage.py export_openapi_schema --output frontend/api_docs.json --indent 2
```

Generate API interface and types
```shell
docker compose run yarn yarn generate:api
```
Run the application
```shell
docker compose up
```

### Locally
If you want to run it locally you need to have python3 and yarn installed.

After cloning the Application the first thing is to Run the django migrations and generate the API JSON

```shell
python manage.py migrate
python manage.py export_openapi_schema --output frontend/api_docs.json --indent 2
```
Then build the frontend, go into the frontend folder and install dependancies
```shell
cd frontend
yarn
```
Generate the Frontend types you run
```shell
yarn generate:api
```
After this you need to build the frontend.
```shell
yarn build
```

You can now start the application
```shell
cd ..
python manage.py runserver
```

### Environment Variable
There are two environment variables available.
first create the env file
```shell
touch .env
```
#### SECRET_KEY
This is the secret key for django and is required. You can set it in `.env`
```
SECRET_KEY=this_is_a_key
```
#### WEBPACK_DEV_SERVER
This determines whether the frontend builds a production build or starts in dev mode.
It is optional. By default it creates a builds a production build.
```
WEBPACK_DEV_SERVER=true
```

### Usage
After set up you will be able to access the app at  http://localhost:8000/hello.
The API requires authentication, so you can log in using the account you created at You can view the application at http://localhost:8000/admin.