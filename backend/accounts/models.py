from django.contrib.auth.models import AbstractUser
from django.db import models



# Extend Django's built-in User model for flexibility
class User(AbstractUser):
    pass  # Email, username, password are already included


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)

    @property
    def username(self):
        return self.user.username

    def __str__(self):
        return f"{self.user.username}'s Profile"


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class UserSkill(models.Model):
    TEACH = 'teach'
    LEARN = 'learn'
    SKILL_TYPE_CHOICES = [
        (TEACH, 'Teach'),
        (LEARN, 'Learn'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="skills")
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    type = models.CharField(max_length=5, choices=SKILL_TYPE_CHOICES)
    proficiency = models.CharField(max_length=50, blank=True)  # Optional
    is_available_for_freelance = models.BooleanField(default=False)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    class Meta:
        unique_together = ('user', 'skill', 'type')

    def __str__(self):
        return f"{self.user.username} - {self.skill.name} ({self.type})"


class SkillRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('completed', 'Completed'),
        ('rejected', 'Rejected'),
    ]

    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_requests")
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_requests")
    offered_skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name="offered_in_requests")
    requested_skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="requested_in_requests")
    is_freelance = models.BooleanField(default=False)
    payment_amount = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Request from {self.requester} to {self.recipient} - {self.status}"


class Review(models.Model):
    request = models.ForeignKey(SkillRequest, on_delete=models.CASCADE, related_name="reviews")
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="given_reviews")
    reviewee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_reviews")
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.reviewee} by {self.reviewer} - {self.rating}★"


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver} at {self.timestamp}"