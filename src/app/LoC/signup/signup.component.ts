import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';  
import { UserserviceService } from 'src/app/LoC/signup/userservice.service';
import { User } from 'src/app/LoC/signup/user';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';



@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor(private router: Router,private userservice:UserserviceService) { }

  user : User= new User();
  
  submitted = false;

 ngOnInit() {
    var username=window.localStorage.getItem("edit-username");
    if(username!=null && username !=""){
    this.userservice.findOneInAll6(username)  
        .subscribe(  
          data => {  
            this.user = data;  
            this.usersaveform.setValue(this.user);
          }) ;
        }
  this.submitted=false;
 }



 usersaveform=new FormGroup({
  username:new FormControl('', [Validators.required , Validators.minLength(5) ] ),
  password:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
  email:new FormControl('',[Validators.required,Validators.email]),
  phone:new FormControl('',[Validators.required]),
  confirm:new FormControl(),
  usertype:new FormControl()

 });



 saveUser(saveUser){
  this.user=new User();
  this.user.username=this.Username.value;
  this.user.password=this.Password.value;
  this.user.email=this.Email.value;
  this.user.phone=this.Phone.value;
  this.user.confirm=this.Confirm.value;
  this.user.usertype=this.Usertype.value;
  this.submitted = true;
  this.save();
 }

 save() {
  this.userservice.saveUser(this.user)
   .subscribe(data => console.log(data), error => console.log(error));
  this.user = new User();
  window.localStorage.removeItem("edit-username");
  this.router.navigate(['login']);
 }

 get Username(){
  return this.usersaveform.get('username');
 }

 get Email(){
  return this.usersaveform.get('email');
 }

 get Phone(){
  return this.usersaveform.get('phone');
 }

 get Password(){
  return this.usersaveform.get('password');
 }
 get Confirm(){
  return this.usersaveform.get('confirm');
 }
 get Usertype(){
  return this.usersaveform.get('usertype');
 }

 saveuserForm(){
  this.submitted=false;
  this.usersaveform.reset();
 }
 
}

