import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  role: string; // normal user / shopkeeper / delivery agent
}

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent {
  users: User[] = [
    { id: 1, name: 'Ravi Kumar', email: 'ravi@example.com', city: 'Delhi', role: 'user' },
    { id: 2, name: 'Sneha Sharma', email: 'sneha@example.com', city: 'Mumbai', role: 'user' },
    { id: 3, name: 'Amit Verma', email: 'amit@example.com', city: 'Kolkata', role: 'user' },
  ];

  editingUser: User | null = null;

  editUser(user: User) {
    this.editingUser = { ...user };
  }

  saveUser() {
    if (this.editingUser) {
      const index = this.users.findIndex(u => u.id === this.editingUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.editingUser };
      }
      this.editingUser = null;
    }
  }

  cancelEdit() {
    this.editingUser = null;
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}
