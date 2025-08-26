import { Component, OnInit } from '@angular/core';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  profilePic?: string; // base64 or URL
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
    profilePic: ''
  };

  isEditing: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      this.profile = JSON.parse(stored);
    }
  }

  saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(this.profile));
    this.isEditing = false;
    alert('✅ Profile updated successfully!');
  }

  editProfile() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadProfile(); // revert unsaved changes
  }

  onProfilePicSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.profilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deactivateAccount() {
    if (confirm("⚠️ Are you sure you want to deactivate your account? This will remove all your saved data.")) {
      localStorage.removeItem('userProfile');
      this.profile = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        address: '',
        profilePic: ''
      };
      this.isEditing = false;
      alert("🚫 Your account has been deactivated.");
    }
  }
}
