from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from notifications.models import notifications
from profile.models import UserProfile
import datetime
from collections import defaultdict

@api_view(['POST', ])
def suggestMovie(request):
    new = notifications()
    new.toUsername = request.data['toUser']
    new.fromUsername = request.data['fromUser']
    new.movieId = request.data['movieId']
    new.type = 'SUGGESTION'
    new.movieTitle = request.data['movieTitle']
    new.Date = datetime.date.today()
    new.Time = datetime.datetime.now().time()
    new.save()

    response = {
            'success': 'true',
    }
    return Response(response, status=status.HTTP_200_OK)

@api_view(['POST', ])
def getNotifications(request):
    notices = notifications.objects.filter(toUsername=request.data['userID']).order_by('-Date', '-Time')
    #notices = notifications.objects.all().order_by('-Date', '-Time')
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
            date_time_obj = datetime.datetime.strptime(str(i.Date) + ' ' + str(i.Time), '%Y-%m-%d %H:%M:%S.%f')
            diff = str(datetime.datetime.today() - date_time_obj).split('.')[0].split(':')
            if int(diff[0]) > 0:
                data['time'] = diff[0] + ' hours ago'
            elif int(diff[1]) > 0:
                data['time'] = diff[1] + ' minutes ago'
            elif int(diff[2]) > 0:
                data['time'] = diff[2] + ' seconds ago'
            #data['time'] = diff[0] + ' hours ago,' + diff[1] + ' minutes ago,' + diff[2]+' seconds ago'
        else:
            data['time'] = str(abs((datetime.date.today() - i.Date).days)) + ' days ago'
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

