function CreateClass(Subject, Issue){
    switch(Subject){ //the expression used here is a string
        case "User":
            return new User(Issue); //create a parameterized constructor to see the issue for the subject 
            break; //must have break otherwise fall through occurs
        case "Admin":
            return new Admin(Issue);
            break;
        case "System":
            return new System(Issue);
            break;
        default:
            console.log("Invalid Object, DNE");
    }
}

class User{
    //in javascript we the this keyword all the time when referring to a data member in a class
    Constructor(Issue){
        this.Subject = Subject;
        this.Issue = Issue; //we use the this keyword to differentiate betweem name of a variable in the class vs parameter
        this.PriortyN = null;
        
    }

     Priorty(Issue) {
        switch(Issue){
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
        alert("Ticket#" + this.PriortyN + "-" + this.Subject + "-" + this.Issue);
    
    }
}



class Admin{
    //in javascript we the this keyword all the time when referring to a data member in a class
    Constructor(Issue){
        this.Subject = Subject;
        this.Issue = Issue; //we use the this keyword to differentiate betweem name of a variable in the class vs parameter
        this.PriortyN = null;
       
    }

     Priorty(Issue) {
        switch(Issue){
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
    Constructor(Issue){
        this.Subject = Subject;
        this.Issue = Issue; //we use the this keyword to differentiate betweem name of a variable in the class vs parameter
        this.PriortyN = null;
        
    }

     Priorty(Issue) {
        switch(Issue){
            case "Hyperlink not working":
                this.PriortyN = 3;
                break;
            case "Button does not work":
                this.PriortyN = 3;
                break;
            case "Product card glitching":
                this.PriortyN = 2;
                break;
            case "Profile editing issue":
                this.PriortyN = 1;
                break;
            case "Secuirty risk":
                this.PriortyN = 3;
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







