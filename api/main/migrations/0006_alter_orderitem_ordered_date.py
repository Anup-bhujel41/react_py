# Generated by Django 4.0.4 on 2022-07-14 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_review_delete_testimonial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='ordered_date',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]