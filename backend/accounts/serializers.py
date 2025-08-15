from rest_framework import serializers
from .models import User, Profile, Skill, UserSkill, SkillRequest, Review, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])  # <-- hashes the password
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"
        fields = ['id', 'name', 'category']

class UserSkillSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    skill = SkillSerializer(read_only=True)

    class Meta:
        model = UserSkill
        fields = ['id', 'type', 'proficiency', 'user', 'skill']

class SkillRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    offered_skill = SkillSerializer(read_only=True)
    requested_skill = SkillSerializer(read_only=True)

    class Meta:
        model = SkillRequest
        fields = [
            'id',
            'requester',
            'recipient',
            'offered_skill',
            'requested_skill',
            'is_freelance',
            'payment_amount',
            'status',
            'created_at',
            'updated_at'
        ]
class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    reviewee = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'reviewee', 'skill_request', 'rating', 'comment', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'skill_request', 'content', 'timestamp']