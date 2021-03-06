# Generated by Django 3.0.5 on 2020-11-12 00:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie_review', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviews',
            name='Date',
            field=models.DateField(auto_now=True),
        ),
        migrations.AddField(
            model_name='reviews',
            name='Time',
            field=models.TimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='reviews',
            name='review_date',
            field=models.DateField(default=None),
        ),
        migrations.AlterField(
            model_name='reviews',
            name='review_time',
            field=models.TimeField(default=None),
        ),
    ]
