# Django React Part 2

This is a simple app to demonstrate the approach for integrating Django and React.
You can find the article [here]().

## Running the app
After cloning the Application the first thing is to go into the frontend folder and installing dependancies
```shell
cd frontend
yarn
```
After this you need to build the frontend.
```shell
yarn build
```

Then start the django application
```shell
cd ..
python manage.py runserver
```
You can now view the application at http://localhost:8000/