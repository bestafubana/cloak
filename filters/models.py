from django.db import models

# Create your models here.
class User(models.Model):
	name = models.CharField(max_length=100)
	email = models.CharField(max_length=60)
	username = models.CharField(max_length=30)
	password = models.CharField(max_length=50)

	def __unicode__(self):
		return self.name +" # "+ self.username+" # "+ self.email

class Filter(models.Model):
	owner = models.ForeignKey(User)
	name = models.CharField(max_length=50)
	img_name = 	models.CharField(max_length=200)
	

	def __unicode__(self):
		return self.name

class Predefined_Filter(models.Model):
	name = models.CharField(max_length=50)
	default_value = models.FloatField()
	description = models.CharField(max_length=144)
	min = models.FloatField()
	max = models.FloatField()
	change_step = models.FloatField()

	def __unicode__(self):
		return str(self.id) + " - " + self.name + ": " + str(self.default_value)

class Step(models.Model):
	parent_filter = models.ForeignKey(Filter)
	filter_used = models.ForeignKey(Predefined_Filter)
	value = models.FloatField()

	def __unicode__(self):
		return self.value

