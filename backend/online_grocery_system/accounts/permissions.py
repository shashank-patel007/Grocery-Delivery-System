from rest_framework import permissions


class UpdateUsers(permissions.BasePermission):
        """Allow user to edit their own profile"""

        def has_object_permission(self,request, view, obj):
            """Check if the user is updating his own profile"""
            if request.method in permissions.SAFE_METHODS:
                return True

            return obj.id==request.user.id
