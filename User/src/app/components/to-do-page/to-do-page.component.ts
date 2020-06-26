import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.css']
})
export class ToDoPageComponent implements OnInit {

  constructor(private apiService : ApiService,private authService :AuthService) { }
  data:any[] =  new Array();
  newTask:string = "";
  ngOnInit() {

    this.apiService.getTask(1).subscribe(tasks =>{
      let i = 0;
      // console.log(tasks);
      for(var j in tasks){
        // console.log(task);
        this.data[i] = (tasks[j]);
        i++;
      }
    })


  }

  complete(index){// On completing a task change boolean and update it on server
    this.data[index].complete = !this.data[index].complete;
    console.log(this.data[index].complete);
    this.apiService.editTask(1,{
      taskId:this.data[index]._id,
      task:this.data[index].task,
      complete:this.data[index].complete
    }).subscribe( data=>{
      console.log(data);
    })

  }

  remove(index){// On removing a Taks send the id of task to server and delete from view
    
    this.apiService.deleteTask(1,{
      taskId:this.data[index]._id
    }).subscribe( data=>{
      if (index > -1) {
        this.data.splice(index, 1);
      }
      console.log(data);
    })
    
    // array = [2, 9]
    console.log(this.data); 
  }

  update(index){
    // this.data[index].complete = !this.data[index].complete;
    console.log(this.data[index].complete);
    this.apiService.editTask(1,{
      taskId:this.data[index]._id,
      task:this.data[index].task,
      complete:this.data[index].complete
    }).subscribe( data=>{
      console.log(data);
    })

  }

  addTask(){//On addaing tasks
    this.apiService.addTask(1,{task : this.newTask}).subscribe(data=>{
      this.data.push(data);
      this.newTask ="";
    })
  }

  logout() {  /// On logout remove tokens
    console.log('logout');  
    this.authService.logout();  
    // this.router.navigate(['/login']);  
    location.reload();
  }

}
