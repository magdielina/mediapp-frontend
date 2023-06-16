import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { userService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private userService: userService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  register() {
    this.userService.addUser(this.username, this.password).subscribe((data) => {
      if (!data) {
        this.snackBar.open('USER EXISTS!', 'INFO', { duration: 2000 });
      } else {
        this.snackBar.open('USER CREATED!', 'INFO', { duration: 2000 });
        setTimeout(() => {          
          this.router.navigate([("/login")]);
        }, 2000);
      }
    });
  }

}
