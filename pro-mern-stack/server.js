const express = require('express');
const bodyParser = require('body-parser');// for sending data to server

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

const validIssueStatus = {
    New:true,
    Open:true,
    Assigned:true,
    Fixed:true,
    Verified:true,
    Close:true,
};

const issueFieldType={
    id:"required",
    status:"required",
    owner:"required",
    effort:"optional",
    created:"required",
    completionDate: "optional",
    title:"required",
};

function validateIssue(issue){
    for (const field in issueFieldType){
        const type = issueFieldType[field];
        if(!type){
            delete issue[field];
        } else if (type=="required" && !issue[field]){
            return field+" is required.";
        }
    }
}

const issues =[
    {
        id: 1, status:'Open', owner:'Raven',
        created:new Date('2016-08-15'), effort: 5,completionDate:undefined,
        title:'Error in console when clicking Add',
    },
    {
        id:2, status:'Assigned', owner:'Eddie', 
        created: new Date('2016-08-16'), effort: 14,
        completionDate:new Date('2016-08-30'), 
        title:'Missing bottom border on panel',
    },
];

app.get("/api/issues", (req,res)=>{
    const metadata = {total_count:issues.length};
    console.log("testing!");
    res.json({_metadata:metadata, records:issues});
});

app.post("/api/issues", (req,res)=>{
    console.log("posted!");
    const newIssue = req.body;
    console.log(newIssue);
    newIssue.id = issues.length+1;
    newIssue.created = new Date();
    if(!newIssue.status) newIssue.status = "New";
    const err = validateIssue(newIssue);
    if (err){
        res.status(422).json({message:"Invalid request:" + err});
        return;
    }
    issues.push(newIssue);
    res.json(newIssue);
});


app.listen(3000, function(){
    console.log('App started on port 3000');
});

// https://docs.mongodb.com/manual/installation/
// start mongo: sudo service mongod start
// sudo service mongod stop
// sudo service mongod restart