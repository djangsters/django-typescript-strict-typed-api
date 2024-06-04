# Django React Part 2

This is a simple app to demonstrate the approach for integrating Django and React.
You can find the article [here]().

## Running the app
### Docker

### Locally
If you want to run it locally you need to have python3 and yarn installed.

After cloning the Application the first thing is to Run the django migrations and generate the API JSON

```shell
python manage.py runserver
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
You can view the application at http://localhost:8000/