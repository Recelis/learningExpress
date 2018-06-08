import React from 'react';

export default class IssueAdd extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            owner:form.owner.value,// not captured in React state, which could have been updated in server as a backup.
            title:form.title.value,// only in browser
            status:"New",
            created: new Date,
        });
        form.owner.value = ""; form.title.value="";
    }
    render(){
        return(
            <div> 
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                  <input type="text" name="owner" placeholder="Owner"/>
                  <input type="text" name="title" placeholder="Title"/>
                  <button>Add</button>
                </form>
            </div>
        )
    }
}