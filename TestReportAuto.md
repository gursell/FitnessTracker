DOCUMENTATION of AUTOMATION TESTING

Access the Postman collection for API testing at the following link: Postman Collection

Automation Test 1: Verify HTTP Status Code for GET Request

Purpose is to ensure that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

Steps:
-Send a GET request to /api/activities.
-Expected Result: Status code: 200 OK
-Actual Result: Status code: 200 OK

Test Notes
No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.


Automation Test 2: Check API Response Data Format for JSON
Objective is to verify that the API returns the expected data format (e.g.,JSON, XML) in the response.

Steps:
-Send a GET request and check if the actual format matches the expected format JSON.
-Expected Result: The response data is formatted as JSON.
-Actual Result: The response data is formatted as JSON.

Test Notes
No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Automation Test 3: Verify Correct HTTP Status Code for Invalid Request
The goal is to ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.

Steps:
-Inspect the response to verify the returned HTTP status code.
-Expected Result: The API returns status code 400 Bad Request.
-Actual Result: The API returns status code 400 Bad Request.

Test Notes: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Automation Test 4: Test API with Specific Filters
The aim is to verify that the API returns the correct data when querying with specific filters or search criteria.

Steps:
-Send a GET request to the endpoint api/activities with specific filters included in the query parameters.
-Expected Result: The API returns activities that match the specified criteria:
-Actual Result: The API does not return activities that meet the specified filter criteria.

Test Notes: During the testing process, the desired filtering did not occur because the data did not arrive as it should.

Automation Test 5: Verify API Pagination
The aim is to verify that the API returns paginated results when a large number of records are requested.

Steps:
-Send a GET request to the endpoint api/goals with pagination parameters included in the query string.
-Expected Result: The API returns paginated results according to the specified pagination parameters:
-Actual Result: The API does not return paginated results as expected.

Test Notes:

Automation Test 6: Check API Handling of Special Characters and Non-English Text
The aim is to verify that the API correctly handles special characters and non-English text in input data.

Steps:
-Send a PUT request to the endpoint with input data.
-Expected Result: The API should handle the input data containing special characters and non-English text without errors. 
-Actual Result: The API successfully handles the input data with special characters and non-English text.

Test Notes: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Automation Test 7: Test API Response with Concurrent Requests
The aim is to ensure that the API can handle multiple users and maintain data consistency when receiving concurrent requests.

Steps:
-Send multiple concurrent requests to the API endpoints that involve data manipulation (e.g., creating: POST, updating: PUT, deleting: DELETE).
-Expected Result: The API should handle the concurrent requests gracefully and maintain data consistency. 
-Actual Result: The API successfully handles concurrent requests without errors or data inconsistencies.
Data remains consistent across all requests, with no unexpected changes.

Test Notes: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Automation Test 8: Test API Handling of Different HTTP Methods
The aim is to verify that the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

Steps:
-Create a collection for the tests.
-Expected Result: For each HTTP method and endpoint:
GET: The API should return the expected data and status code (e.g., 200 OK).
POST: The API should create a new resource and return a status code indicating success (e.g., 201 Created).
PUT: The API should update an existing resource and return a status code indicating success (e.g., 200 OK).
DELETE: The API should delete the specified resource and return a status code indicating success (e.g., 200 OK).

-Actual Result:
GET: The API returns the expected data and status codes 200 OK for each endpoint.
POST: The API successfully creates new resources and returns status codes 201.
PUT: The API successfully updates existing resources and returns status codes 200.
DELETE: The API successfully deletes resources and returns status codes 200.

Automation Test 9: Test API Handling of Record Updates
The aim is to verify that the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

Steps:
-Send a GET request to the endpoint to retrieve the existing record.
-Expected Result: The API should update the existing record with the new data and return a status code 200 OK. 
-Actual Result: PUT status code: 200 OK The API successfully updated the existing record.

Automation Testing 11: Verify API Recovery from Failures
The aim is to verify that the API can recover gracefully from failures, such as database connection issues, without compromising data integrity.
Test Notes: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.

Steps:
-Expected Result: The API should handle the database connection issue gracefully, returning an appropriate error response without compromising data integrity.
-Actual Result: The API returned an appropriate error response indicating the database connection issue.
Data integrity was maintained; no data corruption or loss occurred.

Test Notes: No problems or errors were detected during the testing process. It worked as expected and requirements in the test case were met.