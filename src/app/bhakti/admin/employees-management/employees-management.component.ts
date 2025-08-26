import { Component } from '@angular/core';

type EmployeeRole = 'shopkeeper' | 'agent';
type EmployeeStatus = 'active' | 'on-leave' | 'terminated';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  city: string;
  pincodeCoverage: string[];   // list of pincodes they serve
  baseSalary: number;          // per month
  lastSalaryPaidOn?: string;   // ISO date string
  status: EmployeeStatus;
}

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.scss']
})
export class EmployeesManagementComponent {
  // --------- Dummy data ----------
  employees: Employee[] = [
    {
      id: 101,
      name: 'Rohit Verma',
      email: 'rohit@shop.com',
      phone: '9876543210',
      role: 'shopkeeper',
      city: 'Bengaluru',
      pincodeCoverage: ['560001', '560002', '560003'],
      baseSalary: 25000,
      lastSalaryPaidOn: '2025-07-30',
      status: 'active'
    },
    {
      id: 102,
      name: 'Meena Das',
      email: 'meena@agent.com',
      phone: '9123456780',
      role: 'agent',
      city: 'Kolkata',
      pincodeCoverage: ['700016', '700017'],
      baseSalary: 18000,
      lastSalaryPaidOn: '2025-08-01',
      status: 'on-leave'
    },
    {
      id: 103,
      name: 'Arun Patel',
      email: 'arun@agent.com',
      phone: '9988776655',
      role: 'agent',
      city: 'Ahmedabad',
      pincodeCoverage: ['380015', '380016'],
      baseSalary: 17000,
      status: 'active'
    }
  ];

  // --------- UI State ----------
  editingEmployee: Employee | null = null;

  // Filters
  q = '';
  filterRole: '' | EmployeeRole = '';
  filterStatus: '' | EmployeeStatus = '';
  filterCity = '';

  // --------- Helpers ----------
  get filteredEmployees(): Employee[] {
    return this.employees.filter(e => {
      const matchesQ =
        !this.q ||
        e.name.toLowerCase().includes(this.q.toLowerCase()) ||
        e.email.toLowerCase().includes(this.q.toLowerCase()) ||
        e.phone.includes(this.q);
      const matchesRole = !this.filterRole || e.role === this.filterRole;
      const matchesStatus = !this.filterStatus || e.status === this.filterStatus;
      const matchesCity = !this.filterCity || e.city.toLowerCase().includes(this.filterCity.toLowerCase());
      return matchesQ && matchesRole && matchesStatus && matchesCity;
    });
  }

  startEdit(emp: Employee) {
    // deep copy to avoid mutating the table before save
    this.editingEmployee = {
      ...emp,
      pincodeCoverage: [...emp.pincodeCoverage]
    };
  }

  cancelEdit() {
    this.editingEmployee = null;
  }

  saveEmployee() {
    if (!this.editingEmployee) return;

    // basic validation
    const e = this.editingEmployee;
    if (!e.name.trim() || !e.email.trim() || !e.phone.trim() || !e.city.trim() || e.baseSalary <= 0) {
      alert('Please fill all mandatory fields and ensure salary is > 0.');
      return;
    }

    const idx = this.employees.findIndex(x => x.id === e.id);
    if (idx > -1) {
      this.employees[idx] = { ...e };
    }
    this.editingEmployee = null;
  }

  fireOrReinstate(emp: Employee) {
    if (emp.status !== 'terminated') {
      const ok = confirm(`Fire ${emp.name}? They will no longer be assigned deliveries.`);
      if (!ok) return;
      emp.status = 'terminated';
    } else {
      const ok = confirm(`Reinstate ${emp.name} to active?`);
      if (!ok) return;
      emp.status = 'active';
    }
  }

  paySalary(emp: Employee) {
    if (emp.status === 'terminated') {
      alert('Cannot pay salary to a terminated employee.');
      return;
    }
    const ok = confirm(`Release salary ₹${emp.baseSalary} to ${emp.name}?`);
    if (!ok) return;
    emp.lastSalaryPaidOn = this.todayISO();
    alert('Salary released.');
  }

  addPincodeDuringEdit(pin: string) {
    const p = pin.trim();
    if (!p || !this.editingEmployee) return;
    if (!this.editingEmployee.pincodeCoverage.includes(p)) {
      this.editingEmployee.pincodeCoverage.push(p);
    }
  }

  removePincodeDuringEdit(pin: string) {
    if (!this.editingEmployee) return;
    this.editingEmployee.pincodeCoverage = this.editingEmployee.pincodeCoverage.filter(p => p !== pin);
  }

  private todayISO(): string {
    const d = new Date();
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
}
