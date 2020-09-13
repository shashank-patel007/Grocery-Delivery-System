from rest_framework import serializers

from accounts import models


class UsersSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model=models.Users
        fields=('id','email','name','mobile_no','address','password')
        extra_kwargs={
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self,validated_data):
        """Create and return new user"""
        user= models.Users.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            mobile_no=validated_data['mobile_no'],
            password=validated_data['password'],
            address=validated_data['address']
        )

        return user
