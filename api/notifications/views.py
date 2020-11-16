from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from notifications.models import notifications
from profile.models import UserProfile
import datetime
from collections import defaultdict

#To share a movie with another user
@api_view(['POST', ])
def suggestMovie(request):
    new = notifications()
    new.toUsername = request.data['toUser']
    new.fromUsername = request.data['fromUser']
    new.movieId = request.data['movieId']
    new.type = request.data['fromUser'] + ' suggested you to watch ' + request.data['movieTitle']
    new.movieTitle = request.data['movieTitle']
    new.Date = datetime.date.today()
    new.Time = datetime.datetime.now().time()
    new.save()

    response = {
            'success': 'true',
    }
    return Response(response, status=status.HTTP_200_OK)

#collects notifications for a user
@api_view(['POST', ])
def getNotifications(request):
    notices = notifications.objects.filter(toUsername=request.data['userID']).order_by('-Date', '-Time')
    newNotifications =0
    new_data = []

    for i in notices:
        #print(i.toUsername, i.fromUsername, i.type, i.addDate, i.addTime)
        i.sent=True
        i.save()

        data = defaultdict(lambda: None)
        data['fromUsername']= i.fromUsername
        data['type'] = i.type
        data['movieID'] = i.movieId
        data['movieTitle'] = i.movieTitle
        data['date'] = str(abs((datetime.date.today() - i.Date).days)) + ' days ago'
        data['profilePic'] = UserProfile.objects.get(username = i.fromUsername).profilePic
        data['status'] = i.status
        if abs((datetime.date.today() - i.Date).days) ==0:
            #date_time_obj = datetime.datetime.strptime(str(i.Date) + ' ' + str(i.Time), '%Y-%m-%d %H:%M:%S.%f')
            d=datetime.datetime.now()-datetime.datetime.combine(i.Date,i.Time)
            day=d.days
            #diff = str(datetime.datetime.today() - date_time_obj).split('.')[0].split(':')
            if day >0:
                data['time']=str(day)+' Days Ago'
            else:
                x=str(d)
                x=x.replace(':',' ')
                x=x.replace(',',' ')
                sec=x.split(' ')
                if int(sec[-3]) >0:
                    data['time']=str(int(sec[-3]))+' Hours Ago'
                elif int(sec[-2])>0:
                    data['time']=str(int(sec[-2]))+' Minutes Ago'
                else:
                    a=str(sec[-1])
                    if int(float(a)) == 0:
                        data['time']='Just now'
                    else:
                        data['time']=str(int(a[:2]))+' Seconds Ago'

        new_data.append(data)

        if i.status == False:
            newNotifications += 1

    response = {
            'success': 'true',
            'notifications': new_data,
            'totNotifications':len(notices),
            'newNotifications':newNotifications,
    }
    return Response(response, status=status.HTTP_200_OK)

#maintains the notifications read status
@api_view(['POST', ])
def NotificationRead(request):
    notices = notifications.objects.filter(toUsername=request.data['userID'])

    for i in notices:
        if i.sent == True:
            i.status = True
            i.save()

    response = {
            'success': 'true',
    }
    return Response(response, status=status.HTTP_200_OK)

