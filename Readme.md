# Boxbook
## An app that allows you search books using the google books API: https://www.googleapis.com/books/v1/volumes?q=

## Functionality

  1. The app let users to register and login into their account.
  3. Search for books on the app and add it on the catalog
  4. Add users has a friends, and watch their catalog
  5. Flag books as read, reading, and as pending.
  6. Save every book advance and leaving a comment on every advance.
  7. Leave comments on another users catalog
  8. Remove books from their catalog.
  9. Search users based on user location.
  10. If the user don't have a book yearly goal to read, then a modal will pop up everytime he log's in.
  
### The app itself its a monorepo that join the back end and the front end


# App screenshots

### Signup page
  ![xd](https://user-images.githubusercontent.com/42363909/172765271-196f14a9-24c5-41fb-b471-14d405e519c4.png)
  
## Login page
  ![Captura de pantalla (64)](https://user-images.githubusercontent.com/42363909/172765276-76f28b73-451f-4519-9dec-2501478a69e8.png)
  
## User dashboard on login
  ![Captura de pantalla (65)](https://user-images.githubusercontent.com/42363909/172765282-3869fc99-4635-4a5a-b168-c3ccbcfe3abb.png)
  
## Search on google books API
  ![Captura de pantalla (66)](https://user-images.githubusercontent.com/42363909/172765292-27d3ee22-c304-4b9c-b696-50c9d2b149cb.png)
  
## Retrieveng a book from the API to our database.
![Captura de pantalla (67)](https://user-images.githubusercontent.com/42363909/172765305-7f8c6289-7251-4820-b7b0-9b4e1d9302df.png)

### I selected pending to show how the user can add book read advances
![Captura de pantalla (69)](https://user-images.githubusercontent.com/42363909/172765322-b8bc3564-16a1-4b0c-aa62-d18dda8c5ebb.png)

## Adding book advance
![Captura de pantalla (70)](https://user-images.githubusercontent.com/42363909/172765329-598316c3-f1b1-4e46-9c3a-ce56ccabf601.png)

## Now the book status is changed to reading and we can add new advances and see the old advances listed 
![Captura de pantalla (71)](https://user-images.githubusercontent.com/42363909/172765331-fcfb2ac3-ae82-4611-8812-474c6dc3ba7b.png)

## User friends page
![Captura de pantalla (72)](https://user-images.githubusercontent.com/42363909/172765337-f3638f18-b28d-407a-95bd-d2dbba6b093a.png)

## How to add a friend, in this case, we log in with a different account
### We can see how a modals pop ups, requesting the user a yearly goal cause the user hasn't define one yet
![Captura de pantalla (73)](https://user-images.githubusercontent.com/42363909/172765342-85685700-c118-4757-8531-4364f1139849.png)
### User goal saved
![Captura de pantalla (74)](https://user-images.githubusercontent.com/42363909/172765347-a8e0161f-c30d-45b8-97c3-2299fbf79bd6.png)

## Sending a friend request to Hector (First user logged on upper screenshot)
![Captura de pantalla (75)](https://user-images.githubusercontent.com/42363909/172765350-eea12c78-0c8c-4116-99a7-4033acd5aa46.png)

## Now log in again as Hector, we have a notification
### When the user clicks, will redirects to user profile, and now Hector can accept friend request
![Captura de pantalla (76)](https://user-images.githubusercontent.com/42363909/172765357-29974cfd-25f6-4ad5-9e96-4f9d4fd08035.png)

### Accepting friend request
![Captura de pantalla (77)](https://user-images.githubusercontent.com/42363909/172765365-ab1a1d42-c3b8-47a8-82fb-65c8d8184c8a.png)

## User profile, from here the users can change their data, yearly goal and password
![Captura de pantalla (78)](https://user-images.githubusercontent.com/42363909/172765370-7cdb6ba7-d6c3-4999-9284-9370c1d529a5.png)

