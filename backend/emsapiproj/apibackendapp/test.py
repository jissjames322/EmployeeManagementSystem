from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase,APIClient
from .models import Employee,Department
from datetime import date
from .serializers import EmployeeSerializer

class EmployeeViewSetTest(APITestCase):
    def setUp(self):
        
        self.department = Department.objects.create(DepartmentName="HR")
        self.employee = Employee.objects.create(
            EmployeeName="Jone Doe",
            Designation ="Manager",
            DateOfJoining=date(2020,1,15),
            DepartmentId = self.department,
            Contact = "123456789",
            IsActive = True
            )
        self.client = APIClient()

    def test_employee_list(self):
        url = reverse('employee-list')
        response = self.client.get(url)

        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees,many = True)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data,serializer.data)

    def test_employee_detail(self):
        url = reverse('employee-detail',args=[self.employee.EmployeeId])
        response = self.client.get(url)


        serializer = EmployeeSerializer(self.employee)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data,serializer.data)