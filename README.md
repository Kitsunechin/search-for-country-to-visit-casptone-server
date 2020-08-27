# Search for Country to Visit
The app allows its users to search for countries and add them to their bucket-list

## Working Prototype
You can access a working prototype of the React app here: https://search-for-country-to-visit-casptone-client.vercel.app/ and Node app here: https://country-search-server-app.herokuapp.com


## User Stories
This app is for logged in users only

#### Landing Page
* As a new user 
* I would like to understand what the page is about
* As a new user 
* I want to be able to create a new account
* As a new user and returning user 
* I would like to be able to log out of my account
* As a returning user 
* I want to be able to sign in into my account
* As a new and returning user 

#### Visited Page
* I want to be able to view a list of countries which I have visited
* As a new and returning user 
* I would like to be able to add new countries to the list of visited countries
* As a new and returning user I would like to be able to add notes to countries

#### Bucket-List Page
* As a new and returning user 
* I want to be able to see countries which I would like to visit in the future displayed
* As a new and returning user 
* I would like to be able to pick a new country and add it to my “to visit” countries list
* As a new and returning user I would like to view a map with the places I would like to visit in the future
* As a new and returning user I would like to be able to add notes to countries

#### Mobile Version
* As a new and returning user 
* I would like to view the website on both mobile devices and desktop computers

#### Accessibility
* As a user with disabilities 
* I would like to navigate the website with the use of keyboard
* As a user with disabilities 
* I would like for the website to keep high contrast for visibility
* As a user with disabilities 
* I would like for the website to be accessible (ARIA)
* As a user with disabilities 
* I would like for the website to be well structured for the screen readers’s accesibility



### Wireframes
Landing/Login Page
:-------------------------:
![Landing/Login Page](/github-images/wireframes/login-form.jpg)

Landing/Registration
:-------------------------:
![Landing/Registration Page](/github-images/wireframes/register-form.jpg)

Visited Countries View
:-------------------------:
![Visited Countries View](/github-images/wireframes/visited-countries-view.jpg)

Bucket list View
:-------------------------:
![Bucket list View](/github-images/wireframes/bucket-list-view.jpg)

## Screenshots
Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page.png)

Landing/Login Page
:-------------------------:
![Landing/Login Page](/github-images/screenshots/login-view.png)

Landing/Registration
:-------------------------:
![Landing/Registration Page](/github-images/screenshots/registartion-view.png)

Visited Countries View
:-------------------------:
![Visited Countries View](/github-images/screenshots/visited-countries-view.png)

Bucket list View
:-------------------------:
![Bucket list View](/github-images/screenshots/bucket-List-view.png)

Sidedrawer View
:-------------------------:
![Sidedrawer View](/github-images/screenshots/sidedrawer-view.png)


## Functionality
The app's functionality includes:
* Every User has the ability to create an account
* Every user can log in to his/her account 
* Every user can view his/her bucket-list countries
* Every user can add countries to the bucket-list countries
* Every user can view his/her visited countries
* Every user can add countries to the visited countries
* Every user can add notes to the countries

## React Components Structure
* __Index.js__ (stateless)
    * __App.js__ (statfull)
        * __LandingPage.js__ (statefull)
            * __RegistartionPage.js__ (statefull)
            * __LoginPage.js__ (statefull)
        * __Navigation.js__ (stateless)
            * __Backdrop.js__ (stateless) 
            * __SideDrawer.js__ (stateless)
            * __DrawerToggleButton.js__ (stateless)
        * __BucketListPage.js__ (statefull) 
        * __VisitedPage.js__ (statefull) 

## Business Objects (back-end structure)
* countries (database table)
    * id 
    * iso (country iso (2 letters) code)
    * name (country original name)
    * nicename (country shortcuted name)
    * iso3 (country iso3 (3 letters) code)
    * numcode (country numeric code)
    * phonecode (country phonecode)

* users (database table)
    * id 
    * user_name (only lowercase and uppercase letters and dash)
    * user_password ( at least one number, one lowercase and one uppercase letter, at least eight characters that are letters, numbers or the underscore)
    * user_email (email validation)

* users_countries (database table)
    * id 
    * user_id (connnection with id from users table)
    * country_id ( connection with the id from the countries table)
    * is_visited (boolean default 0,1 if it is visited)
    * is_wish_list (boolean default 0,1 if it is wishlist)
    
* users_notes (database table)
    * id
    * user_country_id
    * note_content

## Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver

## API Documentation
API Documentation details:
* get all notes => /api/notes
* post notes => /api/notes
* get all users => /api/users
* get users by id => /api/users/:user_id
* get all countries => /api/all
* get countries by id => /api/all/:country_id
* post countries => /api/all
* get visited countries => /api/visited
* get visited countries by id => /api/visited/:country_id
* post visited countries => /api/visited
* get bucket-list countries => /api/bucket-list
* get bucket-list countries by id => /api/bucket-list/:country_id
* post visited countries => /api/visited

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* add additional info on the visited countries(summary of the visit, pictures,)
* add additional info on the bucket-list countries(time of planned visit, summary of the planned visit)
* adding a delete button to the bucket-list countries


## How to run it
Use command line to navigate into the project folder and run the following in terminal

### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test