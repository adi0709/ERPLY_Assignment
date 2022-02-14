/// <reference types= "cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import ProductSearch from "../PageObjects/ProductSearch";
const exampleData = require("../../fixtures/example.json");

beforeEach(() => {
  //Login Feature
  ProductSearch.validatePlatformOpen();
  ProductSearch.enterCredentials();
  ProductSearch.validateSignIn();
});

//Click Search BAr Scenario
Given("the login page is visible", () => {
  ProductSearch.loginPageVisibility();
});
When("the search bar is clicked", () => {
  ProductSearch.clickSearchBar();
});
Then("the search bar expands and a few products are displayed", () => {
  ProductSearch.validateClickSearch();
});
//Click Search BAr Scenario Ends

//Search the Product by Name Scenario
Given("the product search is visible", () => {
  ProductSearch.productSearchBarVisibility();
});
When("some alphabets are entered in the product search bar", () => {
  ProductSearch.searchProduct(exampleData.searchName);
});
Then("the products having the same alphabets in the name are visible", () => {
  ProductSearch.validateSearchByName(exampleData.searchName);
});
//Search the Product by Name Scenario Ends

//Search the Product by ID Scenario
When("some Code is entered in the product search bar", () => {
  ProductSearch.searchProduct(exampleData.searchId);
});
Then("the products having the same alphabets in the CodeID are visible", () => {
  ProductSearch.validateSearchById(exampleData.searchId);
});
//Search the Product by ID Scenario Ends

//No Result in Search Scenario
When("some characters are entered in the product search bar", () => {
  ProductSearch.searchProduct(exampleData.searchInvalidName);
});
Then("no reuslts are shown", () => {
  ProductSearch.validateEmptySearchList();
});
//No Result in Search Scenario Ends

//Clear Search Text Scenario
When("the close button is clicked", () => {
  ProductSearch.clickCloseButton();
});
Then("the search bar collapses", () => {
  ProductSearch.validateCloseButton();
});
//Clear Search Text Scenario Ends

//Click Search Icon Scenario
When("the search icon in front of a product is clicked", () => {
  ProductSearch.clickSearchIcon();
});
Then("the inforamtion of the product is displayed", () => {
  ProductSearch.validateProductDetails();
});
//Click Search Icon Scenario Ends

//Open details Scenario
When("the a product is clicked except for the search icon", () => {
  ProductSearch.clickProduct();
});
Then("the product gets added to the bag", () => {
  ProductSearch.validateClickProduct();
});
//Open details Scenario Ends
