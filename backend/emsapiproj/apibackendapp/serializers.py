from rest_framework import serializers
from .models import Employee,Department,UserDetails
from django.contrib.auth.models import User,Group
from django.contrib.auth.hashers import make_password
from datetime import date
import re

def date_of_joining_restriction(DateOfJoining):
    today=date.today()
    if DateOfJoining!=today:
        raise serializers.ValidationError("The date of joining must be today")
    return DateOfJoining

def name_validation(EmployeeName):
    if len(EmployeeName)<3 or not re.match("^[A-Za-z]+$",EmployeeName):
        raise serializers.ValidationError("Name must be at least 3 letters and""contain only alphabetic characters")
    return EmployeeName


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:

        model=Department
        fields='__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    Department=DepartmentSerializer(source='DepartmentId',read_only=True)


    DateOfJoining=serializers.DateField(validators=[date_of_joining_restriction])
    EmployeeName=serializers.CharField(max_length=200,validators=[name_validation])
    #Nested Serializer to include Department details
    class Meta:

        model=Employee
        fields=('EmployeeId','EmployeeName','Designation','DateOfJoining','Contact','IsActive','DepartmentId','Department')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','username')

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetails
        fields='__all__'

class SignupSerializer(serializers.ModelSerializer):
    #add a group name field
    
    group_name = serializers.CharField(write_only=True,required = False)
    
    
    #overriding the create method for adding the group
    #and also hasing the password before saving it
    
    def create(self,validated_data):
        
        #remove the group name if the bundle of data contains group
        
        #to aboid issues with the user model as it knows only the username and pass
        
        group_name = validated_data.pop("group_name",None)
        
        #hash the password so that it is scured or encyrpted in the database
        validated_data["password"] = make_password(validated_data.get("password"))
        
    #create the user
        user = super(SignupSerializer, self).create(validated_data)
        
        #once the user is created we can create the group name and add user to that group
        
        if group_name:
            group, created = Group.objects.get_or_create(name=group_name)
            user.groups.add(group)
            
        return user    
    
    class Meta:
        model = User
        fields = ['username','password','group_name']

class LoginSerializer(serializers.ModelSerializer):
    username=serializers.CharField()

    class Meta:
        model=User
        fields=['username','password']