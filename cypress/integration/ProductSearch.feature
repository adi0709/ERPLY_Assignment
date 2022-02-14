Feature: Test the product search functionality

    Successfully validate the product search functionality

    Scenario: Click the Search bar
        Given the login page is visible
        When the search bar is clicked
        Then the search bar expands and a few products are displayed

    Scenario: Search the Product by Name
        Given the product search is visible
        When some alphabets are entered in the product search bar
        Then the products having the same alphabets in the name are visible

    Scenario: Search the Product by Code ID
        Given the product search is visible
        When some Code is entered in the product search bar
        Then the products having the same alphabets in the CodeID are visible

    Scenario: Search the product which is not present
        Given the product search is visible
        When some characters are entered in the product search bar
        Then no reuslts are shown

    Scenario: Click the close button to collapse the search bar
        Given the product search is visible
        And some Code is entered in the product search bar
        When the close button is clicked
        Then the search bar collapses

    Scenario: Click the search icon in the search list
        Given the search bar is clicked
        When the search icon in front of a product is clicked
        Then the inforamtion of the product is displayed

    Scenario: Click in the search list anywhere excpet the search icon
        Given the search bar is clicked
        When the a product is clicked except for the search icon
        Then the product gets added to the bag