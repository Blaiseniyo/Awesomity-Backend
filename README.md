# Awesomity-Backend

## Requirements
    This project is written in javaScript using Node js and Exprees so to be able to run this project you have to first Node js installed on your ps or run it in a Dockerized Environment 
    
>You can find environment variables  `.sample-env` file. Make sure you have all required environment variables in your .env file before you start Running this project locally. 

# Install all dependencies
you have to execute this command:
```ps
npm install
```
This command will install all dependencies in package.json file 
## Database migration and seeding
### Running migration
You have to execute this command: 
```ps
npm run migrate
```
This command will create all empty tables defined in migrations folder in the database

### Undoing migrations
You have to execute this command: 
```ps
npm run migrate-undo
```
 ## Running the seed
 we have created a seed file and we have to commit it to the database.

```ps
npm run seed
```

## Undoing seeds
You have to execute this command: 
```ps
npm run seed-undo
```
This will undo the recent seed.
To undo all seeds we have to run this:
```ps
npm run seed-undo-all
```
This will undo all seeds committed to the database. NB: Doing this will delete all data you have in the Database,so do it when you know what you are doing

## Running the project
* Development mode: ``npm run dev``
* Production mode: ``npm run start``
