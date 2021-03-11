# B-YEP-500-PAR-5-1-area-thomas.raveneau

# AREA project documentation:

## Summary:
1. User
      1. Authentification
      1. Actions / Reactions management
2. Services

### User

#### Authentification

* **POST** /user/register
    * Request body:
        * username: *String* must be longer than 6 characters
        * password: *String* must be longer than 6 characters
        * email: *String* must contain a valid email

        Example: 
        ```json
        {
            "username": "Usertest",
            "password" : "thisisapassword",
            "email": "random@gmail.com"
        }
        ```
    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            * token: *String* contains the jwt (Json web token) linked to the User this token is required for all requests other than the basic auth (/login and /register)
        * Return code is **400**:
            One of the fields is either too short or invalid
            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```

* **POST** /user/login
    * Request body:
        * username: *String* must be longer than 6 characters and already registered
        * password: *String* must be longer than 6 characters and already registered

        Example: 
        ```json
        {
            "username": "Usertest",
            "password" : "thisisapassword",
        }
        ```
    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            * token: *String* contains the jwt (Json web token) linked to the User this token is required for all requests other than the basic auth (/login and /register)
        * Return code is **400**:
            One of the fields is either too short, invalid or the User isn't registered yet
            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```
------

#### Actions / Reactions management

* All actions / reactions are stored as **Area** objects and are structured as follow:
    * id: *String* (**required**) id of the Area
    * action *Object*:
        * name: *String* (**required**) the name of an existing service
        * params: *Object* contains the parameters given or not by the user whilst creating the Area, these parameters can vary according to the chosen action 
    * reaction *Object*:
        * name: *String* (**required**) the name of an existing service
        * params: *Object* contains the parameters given or not by the user whilst creating the Area, these parameters can vary according to the chosen reaction

            Example:             
        ```json
            {
                "id": "IdObject",
                "action": {
                    "name": "ExistingService1",
                    "params": {
                    "param1": "value1"
                    }
                },
                "reaction": {
                    "name": "ExistingService2",
                    "params": {
                      "param2": "value2"
                    }
                }
            }
        ```

* **GET** /user/actions
    * Description: Returns all of the specific User's Areas
    * Request header:
        * access-token: the request should send a header *access-token* containing the user specific jwt previously given after authentification (ie Authentification)
    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            * UserAction: *[Area]* Array that contains all the Areas a specific User has subscribed to

            Example:
            ```json
            {
                "success": "true",
                "UserAction": ["userAction1", "userAction2"]
            }
            ```
        * Return code is **400**:
            The request failed

            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```

* **POST** /user/action
    * Description: Create a new Area for a specific User
    * Request header:
        * access-token: the request should send a header *access-token* containing the user specific jwt previously given after authentification
    * Request body:
        * action: *Area.action* (**required**) action defined in the new Area object
        * reaction: *Area.reaction* (**required**) reaction defined in the new Area object

        Example:
        ```json
        {
            "action": "actionValue",
            "reaction": "reactionValue"
            }
        }
        ```
    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            * Area: *Area* the Area object you just created

            Example:
            ```json
            {
                "success": "true",
                "Area": {
                    "action": {
                    "name": "name1",
                    "service": "serviceName1",
                    },
                    "reaction": {
                    "name": "name2",
                    "service": "serviceName2",
                    }
                }
            }
            ```
        * Return code is **400**:
            The request failed

            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```

* **PATCH** /user/action
    * Description: Modify a specific AREA
    * Request header:
        * access-token: the request should send a header *access-token* containing the user specific jwt previously given after authentification
    * Request body:
        * id: *Area.id* (**required**) id of the Area that you want to modify
        * action: *Area.action* (**required**) action defined in the new Area object replace the current action of the Area
        * reaction: *Area.reaction* (**required**) reaction defined in the new Area object replace the current reaction of the Area

        Example:
        ```json
        {
            "_id": "12345",
            "action": {
            "name": "name1",
            "service": "serviceName1",
            },
            "reaction": {
            "name": "name2",
            "service": "serviceName2",
            }
        }
        ```

    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            * Area: *Area* the Area object you just modified

            Example:
            ```json
            {
                "success": "true",
                "Area": {
                    "action": {},
                    "reaction": {}
                }
            }
            ```
            
        * Return code is **400**:
            The request failed

            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```

* **DELETE** /user/action
    * Description: Delete a specific AREA
    * Request header:
        * access-token: the request should send a header *access-token* containing the user specific jwt previously given after authentification
    * Request body:
        * id: *Area.id* **required** id of the Area that you want to modify

        Example:
        ```json
        {
            "_id": "12345"
        }
        ```

    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            Example:
            ```json
            {
                "success": "true",
            }
            ```

        * Return code is **400**:
            The request failed

            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```
------

## Services

All services are structured similarly and contains two calls 

* **POST** /{service}/register
    * Description: Register the service Oauth2 token
    * Request header:
        * access-token: the request should send a header *access-token* containing the user specific jwt previously given after authentification (ie Authentification)
    * Request body:
        * authToken: *String* **required** Google Oauth token
    
        Example:
        ```json
        {
            "authToken": "tokenoftheservice"
        }
        ```

    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            Example:
            ```json
            {
                "success": "true",
            }
            ```

        * Return code is **400**:
            The request failed
            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```

* **PATCH** /{service}/logout
    * Description: Delete the saved service Oauth2 token
    * Request header:
        * access-token: the request should send a header *access-token* containing the user specific jwt previously given after authentification (ie Authentification)
    * Answer body:
        In all cases the body will contain a field *success* that indicate whether the request failed or not
        * Return code is **200**:
            Example:
            ```json
            {
                "success": "true",
            }
            ```

        * Return code is **400**:
            The request failed
            Example:
            ```json
            {
                "success": "false",
                "message" "Contains an error message"
            }
            ```





