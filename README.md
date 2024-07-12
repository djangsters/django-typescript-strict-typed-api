# Build reliable Django frontend APIs like a Ninja

This is a simple app to demonstrate the approach for implementing an API with Django, that
guarantees equality between what the backend provides and what the frontend consumes.
On the backend it uses [django-ninja](https://django-ninja.dev/) to build the API
together with API docs.
On the frontend it uses TypeScript with [oazapfts](https://github.com/oazapfts/oazapfts)
to automatically generate interface from the API docs.

This example was built for the [article](https://www.djangsters.de/en/blog/build-reliable-django-frontend-apis-like-a-ninja/).

## Running the app

### Environment Variable
First create the env file
```shell
touch .env
```
There are two environment variables to be set.

#### SECRET_KEY
This is the secret key for django and is required.
```
SECRET_KEY=this_is_a_key
```
#### WEBPACK_DEV_SERVER
This determines whether the frontend builds a production build or starts in dev mode.
It is optional. By default it creates a production build.
```
WEBPACK_DEV_SERVER=true
```


### Docker
Build
```shell
docker compose build
```
Migrate
```shell
docker compose run --rm web python manage.py migrate
```
Create a superuser and export the API as JSON
```shell
docker compose run --rm web python manage.py createsuperuser
docker compose run --rm web python manage.py export_openapi_schema --output frontend/api_docs.json --indent 2
```

Generate API interface and types
```shell
docker compose run --rm yarn yarn
docker compose run --rm yarn yarn generate:api
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
Then build the frontend, go into the frontend folder and install dependencies
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

### Usage
After set up you will be able to access the app at http://localhost:8000/hello.
The api docs can are served under http://localhost:8000/api/docs. Log in with the superuser credentials to access them.
