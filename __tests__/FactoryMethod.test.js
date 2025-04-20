/** FactoryMethod.test.js
 * The unit testing framework we will choose to test the 6 method from the js file FactoryMethod will be jest. There is no need to import
 * anything at the top of the file as the assertion methods are global. However, by global, we dont mean that these jest assertion methods 
 * are avalaible in a regular js enviorement. You must install jest locally with the following commands. Once we run the unit testing 
 * framework, jest will interject the assertion methods
 * npm init -y                    # Initializes a Node.js project (creates package.json)
   npm install --save-dev jest    # Installs Jest locally as a dev dependency

   you'll notice in the FactoryMethod.js file we don't have a method that returns anything so the assertion method that will be using is
   .toHaveBeenCalledWith, .toBe, .toEqual, etc 
   Also note that the package.json file (which configues jest locally on our computer after the installation) is located in the root directory
   which is essentially the first self of folder(s) or the top of the overall project. Thus execute the the test from there with the following 
   command: npx jest frontend/FactoryMethod.test.js
**/ 

// creates variable = switches to the file in the directory

//const { beforeEach } = require('node:test');

//let's test class User for the first test Suite
const {User, System}  = require('./FactoryMethod');



describe('class User', () =>{
  let MyUser;

  //anotation: perform this function before each test case (A test case occurs per method, so the method BeforeEach() will be called prior to testing each method, for said method call)
  beforeEach(() => {
    MyUser = new User('User', 'Spam');
  });

  //test case #1:note that toBe references the data memeber, expect is self explanatory 
  test('verify that the User constructor() was invoked auto', () =>{
    //remember, we're not using the instance of the class to invoke the constructor explcitly via MyUser.construc.... as that defeats the prupose of auto
    expect(MyUser.Subject).toBe('User');
    expect(MyUser.Issue).toBe('Spam');
    expect(MyUser.PriortyN).toBe(null);
  });

  //test case #2:
  test('verify that the User Priorty() works', () =>{
    MyUser.Priorty();
    expect(MyUser.PriortyN).toBe(1);
  });

  //test case #3:
  test('verify that the User ticket() works', () =>{
    alert = jest.fn(); //mocks the function
    MyUser.Priorty();//remeber, the beforeEach() is called right before we do a test case. As a result, it will re-create the instance of the class again and thus cause priortyN to be null. Thus, invoke the Priorty() again to avoid this.
    MyUser.ticket();
    expect(alert).toHaveBeenCalledWith('Ticket#1 - User - Spam');
  });

});

//lets test class System for the Second test suite


describe('class System', () =>{
  let MySystem;

  //anotation: perform this function before each test case (A test case occurs per method, so the method BeforeEach() will be called prior to testing each method, for said method call)
  beforeEach(() => {
    MySystem = new System('System', 'Hyperlink not working');
  });

  //test case #1:note that toBe references the data memeber, expect is self explanatory 
  test('verify that the System constructor() was invoked auto', () =>{
    //remember, we're not using the instance of the class to invoke the constructor explcitly via MyUser.construc.... as that defeats the prupose of auto
    expect(MySystem.Subject).toBe('System');
    expect(MySystem.Issue).toBe('Hyperlink not working');
    expect(MySystem.PriortyN).toBe(null);
  });

  //test case #2:
  test('verify that the System Priorty() works', () =>{
    MySystem.Priorty();
    expect(MySystem.PriortyN).toBe(3);
  });

  //test case #3:
  test('verify that the System ticket() works', () =>{
    alert = jest.fn(); //mocks the function
    MySystem.Priorty();
    MySystem.ticket();
    expect(alert).toHaveBeenCalledWith('Ticket#3-System-Hyperlink not working');
  });

});

