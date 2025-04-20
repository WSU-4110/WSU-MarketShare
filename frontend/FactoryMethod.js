function CreateClass(Subject, Issue){
    switch(Subject){ //the expression used here is a string
        case "User":
            return new User(Subject, Issue); //create a parameterized constructor to see the issue for the subject 
            break; //must have break otherwise fall through occurs
        case "Advisor":
            return new Admin(Subject, Issue);
            break;
        case "System":
            return new System(Subject, Issue);
            break;
        default:
            console.log("Invalid Object, DNE");
    }
}

class User{
    //in javascript we the this keyword all the time when referring to a data member in a class
    constructor(Subject, Issue){
        this.Subject = Subject;
        this.Issue = Issue; //we use the this keyword to differentiate betweem name of a variable in the class vs parameter and to make the variable global (accessible/in sync) across all methods wihtin a class
        this.PriortyN = null; 
       
        
        
    }

     Priorty() {
        switch(this.Issue){
            case "Inappropriate Photo":
                this.PriortyN = 3;
                break;
            case "Spam":
                this.PriortyN = 1;
                break;
            case "Scam Likely":
                this.PriortyN = 2;
                break;
            case "Hacked Account":
                this.PriortyN = 2;
                break;
            case "Phising":
                this.PriortyN = 2;
                break;
            case "Other":
                this.PriortyN = 1;
                break; 
        }
    }

    ticket(){
        alert("Ticket#" + this.PriortyN + " - " + this.Subject + " - " + this.Issue);
    }

    
}





class Admin{
    //in javascript we the this keyword all the time when referring to a data member in a class
    constructor(Subject, Issue){
        this.Subject = Subject;
        this.Issue = Issue; //we use the this keyword to differentiate betweem name of a variable in the class vs parameter
        this.PriortyN = null;
    
       
    }

     Priorty() {
        switch(this.Issue){
            case "Inappropriate Response":
                this.PriortyN = 3;
                break;
            case "Spam":
                this.PriortyN = 1;
                break;
            case "Scam Likely":
                this.PriortyN = 2;
                break;
            case "Hacked Account":
                this.PriortyN = 2;
                break;
            case "Phising":
                this.PriortyN = 2;
                break;
            case "Other":
                this.PriortyN = 1;
                break; 
        }
    }

    ticket(){
        alert("Ticket#" + this.PriortyN + "-" + this.Subject + "-" + this.Issue);

    }
}

class System{
    //in javascript we the this keyword all the time when referring to a data member in a class
    constructor(Subject,Issue){
        this.Subject = Subject;
        this.Issue = Issue; //we use the this keyword to differentiate betweem name of a variable in the class vs parameter
        this.PriortyN = null;
        
    }

     Priorty() {
        switch(this.Issue){
            case "Hyperlink not working":
                this.PriortyN = 3;
                break;
            case "Button does not work":
                this.PriortyN = 3;
                break;
            case "Product card glitchy":
                this.PriortyN = 2;
                break;
            case "Profile editing issue":
                this.PriortyN = 1;
                break;
            case "Security risk":
                this.PriortyN = 3;
                break;
            case "Other":
                this.PriortyN = 1;
                break; 
        }
    }

    ticket(){
        alert("Ticket#" + this.PriortyN + "-" + this.Subject+ "-" + this.Issue);
        
        
    }
}

module.exports = { User, System}; //exporting the class to the test js file via commonJS
/** I have to use commonJS inorder to export the class
 * into the test js file. However, browser does not natively support 
 * commonJS has 
 */






