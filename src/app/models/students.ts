export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  year: number;
  status: 'active' | 'inactive';
}

export interface Coordinator {
  id: string;
  name: string;
  email: string;
  department: string;
  phone: string;
}
