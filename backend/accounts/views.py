from rest_framework import viewsets,serializers
from .models import User, Profile, Skill, UserSkill, SkillRequest, Review, Message
from .serializers import UserSerializer, ProfileSerializer, SkillSerializer, UserSkillSerializer, SkillRequestSerializer, ReviewSerializer, MessageSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = UserSkill.objects.all()
    serializer_class = UserSkillSerializer

class SkillRequestViewSet(viewsets.ModelViewSet):
    queryset = SkillRequest.objects.all()
    serializer_class = SkillRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Optionally filter by 'sent' or 'received' query parameter.
        - sent=true  → requests where the logged-in user is the requester
        - received=true → requests where the logged-in user is the recipient
        """
        user = self.request.user
        queryset = SkillRequest.objects.all()

        # Query parameters
        sent = self.request.query_params.get('sent', None)
        received = self.request.query_params.get('received', None)

        if sent == 'true':
            queryset = queryset.filter(requester=user)
        elif received == 'true':
            queryset = queryset.filter(recipient=user)
        else:
            # Default: show all requests related to the user
            queryset = queryset.filter(requester=user) | queryset.filter(recipient=user)
            
        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically set the requester to the logged-in user
        serializer.save(requester=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Users can see reviews they wrote or received
        return Review.objects.filter(reviewer=user) | Review.objects.filter(reviewee=user)
    
    def perform_create(self, serializer):
       
        serializer.save(reviewer=self.request.user)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(sender=user) | Message.objects.filter(receiver=user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
    
class SkillMatchSearchView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Get query parameters
        skill_to_learn = request.query_params.get('learn', None)
        skill_to_teach = request.query_params.get('teach', None)
        freelance = request.query_params.get('freelance',None)

        if not skill_to_learn:
            return Response({"error": "Parameter 'learn' is required."}, status=400)

        # Start with users who can teach the requested skill
        users = User.objects.filter(
            skills__type='teach',
            skills__skill__name__iexact=skill_to_learn
        )

        # If teach field is provided, filter users who want to learn that skill
        if skill_to_teach:
            users = users.filter(
                skills__type='learn',
                skills__skill__name__iexact=skill_to_teach
            )
        if freelance == "true":
            users = users.filter(skills__is_available_for_freelance=True)
        serializer = UserSerializer(users.distinct(), many=True)
        return Response(serializer.data)