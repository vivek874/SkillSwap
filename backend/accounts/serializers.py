from rest_framework import serializers
from .models import User, Profile, Skill, UserSkill, SkillRequest, Review, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])  # <-- hashes the password
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
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
    skill_name = serializers.CharField(write_only=True)

    class Meta:
        model = UserSkill
        fields = ['id', 'type', 'proficiency','is_available_for_freelance', 'user', 'skill','skill_name']
        
    def create(self, validated_data):
        skill_name = validated_data.pop("skill_name").strip().title()  # Capitalizes like "Video Editing"
        skill, created = Skill.objects.get_or_create(name__iexact=skill_name, defaults={"name": skill_name})

        
        user = self.context["request"].user
        validated_data["user"] = user
        validated_data["skill"] = skill
        return super().create(validated_data)

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
    reviewee = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'reviewee', 'request','rating', 'comment', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'skill_request', 'content', 'timestamp']